const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { AppError } = require("../middleware/errorHandler");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
};

// @desc    Register new user
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("Email already registered", 400));
    }

    // Create user (password will be hashed automatically by User model pre-save hook)
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user and explicitly select password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError("Account is deactivated", 401));
    }

    // Verify password using the method from User model
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        monthlyBudget: user.monthlyBudget,
        preferences: user.preferences
      }
    });

  } catch (error) {
    next(error);
  }
};