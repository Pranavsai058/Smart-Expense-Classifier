require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { errorHandler } = require("./middleware/errorHandler");
const logger = require("./utils/logger");

// Import Routes
const expenseRoutes = require("./routes/expenseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get("user-agent")
  });
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use("/auth", authRoutes);
app.use("/api", expenseRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/ai", aiRoutes);
app.use("/reports", reportRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Expense Analyzer API",
    version: "2.0.0",
    endpoints: {
      auth: "/auth",
      expenses: "/api",
      analytics: "/analytics",
      ai: "/ai",
      reports: "/reports"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
  logger.info(`📡 CORS enabled for: ${process.env.CORS_ORIGIN}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection", { error: err.message });
  process.exit(1);
});