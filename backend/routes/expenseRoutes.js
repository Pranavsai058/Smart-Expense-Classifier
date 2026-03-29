const express = require("express")
const router = express.Router()

const { addExpense } = require("../controllers/expenseController")
const { getExpenses } = require("../controllers/expenseController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/add-expense", authMiddleware, addExpense)


router.get("/expenses", authMiddleware, getExpenses)

module.exports = router