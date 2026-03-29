const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true  // Index for faster queries
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"]
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"]
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Healthcare",
        "Education",
        "Other"
      ],
      default: "Other"
    },

    // NEW FIELDS - More data for better insights
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Net Banking", "Other"],
      default: "Other"
    },

    isRecurring: {
      type: Boolean,
      default: false
    },

    tags: [{
      type: String,
      trim: true
    }],

    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"]
    },

    // Anomaly detection result
    isAnomaly: {
      type: Boolean,
      default: false
    },

    // Confidence score from ML classifier
    categoryConfidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 1
    },

    date: {
      type: Date,
      default: Date.now,
      index: true  // Index for date-based queries
    }
  },
  {
    timestamps: true  // Automatically add createdAt and updatedAt
  }
);

// Index for efficient queries
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, category: 1 });

// Virtual for formatted amount
ExpenseSchema.virtual('formattedAmount').get(function() {
  return `₹${this.amount.toLocaleString('en-IN')}`;
});

// Method to check if expense is from today
ExpenseSchema.methods.isToday = function() {
  const today = new Date();
  return this.date.toDateString() === today.toDateString();
};

module.exports = mongoose.model("Expense", ExpenseSchema);