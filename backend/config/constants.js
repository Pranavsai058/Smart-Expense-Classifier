// Application constants

module.exports = {
  // Expense Categories
  EXPENSE_CATEGORIES: [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Healthcare",
    "Education",
    "Other"
  ],

  // Payment Methods
  PAYMENT_METHODS: [
    "Cash",
    "Card",
    "UPI",
    "Net Banking",
    "Other"
  ],

  // User Roles (for future use)
  USER_ROLES: {
    USER: "user",
    ADMIN: "admin"
  },

  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // Anomaly Detection Threshold
  ANOMALY_THRESHOLD: 2.5,  // Standard deviations

  // ML Model Confidence Threshold
  ML_CONFIDENCE_THRESHOLD: 0.7
};