const Expense = require("../models/Expense")
const mongoose = require("mongoose")
const axios = require("axios")

exports.categorySummary = async (req, res) => {

  try {

    const userId = new mongoose.Types.ObjectId(req.userId)

    const summary = await Expense.aggregate([
      {
        $match: {
          userId: userId
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ])

    res.json(summary)

  } catch (error) {

    res.status(500).json({
      error: "Analytics error"
    })

  }

}

exports.predictSpending = async (req,res)=>{

    try{

        const response = await axios.get(
            "https://smart-expense-classifier-ml.onrender.com/predict-spending?month=13"
        )

        res.json(response.data)

    }catch(error){

        console.log(error.message)

        res.status(500).json({
            error:"Prediction failed"
        })

    }

}