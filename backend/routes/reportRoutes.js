const express = require("express")
const router = express.Router()

const authMiddleware =
require("../middleware/authMiddleware")

const {
  monthlyReport,
  downloadReport
} = require("../controllers/reportController")

router.get(
  "/monthly",
  authMiddleware,
  monthlyReport
)

router.get(
  "/download",
  authMiddleware,
  downloadReport
)

module.exports = router