const { AppError } = require("./errorHandler");

// Validate expense input
const validateExpense = (req, res, next) => {
  const { description, amount } = req.body;

  // Check if fields exist
  if (!description || !amount) {
    return next(new AppError("Description and amount are required", 400));
  }

  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    return next(new AppError("Amount must be a positive number", 400));
  }

  if (amount > 10000000) {  // 1 crore limit
    return next(new AppError("Amount cannot exceed ₹1,00,00,000", 400));
  }

  // Validate description length
  if (description.trim().length < 3) {
    return next(new AppError("Description must be at least 3 characters", 400));
  }

  if (description.length > 200) {
    return next(new AppError("Description cannot exceed 200 characters", 400));
  }

  next();
};

// Validate user registration
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  // Email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  // Password validation
  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  next();
};

// Validate login
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  next();
};

module.exports = {
  validateExpense,
  validateRegister,
  validateLogin
};