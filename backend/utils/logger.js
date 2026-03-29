const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Log levels
const LOG_LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  DEBUG: "DEBUG"
};

// Format log message
const formatLog = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta
  };
  return JSON.stringify(logEntry);
};

// Write to file
const writeLog = (level, message, meta = {}) => {
  const logFile = path.join(logsDir, `${level.toLowerCase()}.log`);
  const logMessage = formatLog(level, message, meta) + "\n";

  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
};

// Logger object
const logger = {
  info: (message, meta) => {
    console.log(`ℹ️  ${message}`);
    writeLog(LOG_LEVELS.INFO, message, meta);
  },

  warn: (message, meta) => {
    console.warn(`⚠️  ${message}`);
    writeLog(LOG_LEVELS.WARN, message, meta);
  },

  error: (message, meta) => {
    console.error(`❌ ${message}`);
    writeLog(LOG_LEVELS.ERROR, message, meta);
  },

  debug: (message, meta) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`🐛 ${message}`);
      writeLog(LOG_LEVELS.DEBUG, message, meta);
    }
  }
};

module.exports = logger;