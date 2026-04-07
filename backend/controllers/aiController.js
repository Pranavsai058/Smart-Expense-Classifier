const axios = require("axios")
const Expense = require("../models/Expense")
const mongoose = require("mongoose")
exports.askAI = async (req, res) => {

    try {
        const ML_API = "http://127.0.0.1:8000";
        const { question } = req.body

        const userId = req.userId

        const summary = await Expense.aggregate([

            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.userId)
                }
            },


            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            }
        ])

        const documents = summary.map(item =>
            `${item._id} spending ${item.total} from ${item.count} transactions`
        )

        await axios.post(
            `${ML_API}/rag/load-expenses`,
            { userId: req.userId, documents }
        )

        const response = await axios.post(
            `${ML_API}/rag/ask`,
            { userId: req.userId, question }
        )

        res.json(response.data)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            error: "AI request failed"
        })

    }

}

