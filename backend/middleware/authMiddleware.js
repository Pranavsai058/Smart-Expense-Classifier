const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Extract token (handle both formats: "token" and "Bearer token")
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1]  // Has "Bearer ", take second part
    : authHeader;                // No "Bearer ", use as-is

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    // ✅ FIXED: Use environment variable instead of hardcoded secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decoded.userId;
    
    next();

  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }

};

module.exports = authMiddleware;