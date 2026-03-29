const express = require("express")
const router = express.Router()

const { categorySummary } = require("../controllers/analyticsController")
const { predictSpending } = require("../controllers/analyticsController")
const authMiddleware =require("../middleware/authMiddleware")

router.get("/category-summary",authMiddleware,categorySummary)
router.get("/prediction", predictSpending)

module.exports = router