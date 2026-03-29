const Expense = require("../models/Expense")

exports.monthlyReport = async (req, res) => {

  try {

    const userId = req.userId

    const expenses = await Expense.find({ userId })

    const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    const categoryTotals = {}

    expenses.forEach(e => {
      categoryTotals[e.category] =
        (categoryTotals[e.category] || 0) + e.amount
    })

    let topCategory = ""

    let max = 0

    for (const c in categoryTotals) {

      if (categoryTotals[c] > max) {
        max = categoryTotals[c]
        topCategory = c
      }

    }

    const today = new Date()
    const dayOfMonth = today.getDate()

    const averageDaily = Math.round(total / dayOfMonth)

    res.json({
      total,
      topCategory,
      averageDaily
    })

  } catch (error) {

    res.status(500).json({
      error: "Report generation failed"
    })

  }

}

const PDFDocument = require("pdfkit")

exports.downloadReport = async (req, res) => {

  try {

    const userId = req.userId

    const expenses = await Expense.find({ userId })

    const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    const categoryTotals = {}

    expenses.forEach(e => {
      categoryTotals[e.category] =
        (categoryTotals[e.category] || 0) + e.amount
    })

    let topCategory = ""
    let max = 0

    for (const c in categoryTotals) {

      if (categoryTotals[c] > max) {
        max = categoryTotals[c]
        topCategory = c
      }

    }

    const averageDaily = Math.round(total / 30)

    const doc = new PDFDocument()

    res.setHeader(
      "Content-Type",
      "application/pdf"
    )

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report.pdf"
    )

    doc.pipe(res)

    doc.fontSize(20).text(
      "Smart Expense Analyzer Report"
    )

    doc.moveDown()

    doc.fontSize(14).text(
      `Total Spending: ₹${total}`
    )

    doc.text(
      `Top Category: ${topCategory}`
    )

    doc.text(
      `Average Daily Spend: ₹${averageDaily}`
    )

    doc.moveDown()

    doc.text("AI Insight:")

    doc.text(
      `Your highest spending category is ${topCategory}.`
    )

    doc.end()

  } catch (error) {

    res.status(500).json({
      error: "PDF generation failed"
    })

  }

}