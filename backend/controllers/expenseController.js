const Expense = require("../models/Expense")
const axios = require("axios")

exports.addExpense = async (req, res) => {

    try {

        const { description, amount } = req.body

        const categoryResponse = await axios.post("http://127.0.0.1:8000/predict-category", {
            text: description
        })

        const category = categoryResponse.data.category

        const anomalyResponse = await axios.post("http://127.0.0.1:8000/detect-anomaly", {
            amount: amount
        })

        const anomaly = anomalyResponse.data.anomaly

        const expense = new Expense({
            userId: req.userId,
            description,
            amount,
            category
        })

        await expense.save()

        let insight = null

        if (anomaly) {

            insight = "This transaction is significantly higher than your usual spending."

        }

        res.json({
            expense,
            anomaly,
            insight
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({ error: "Something went wrong" })

    }

}

exports.getExpenses = async (req,res)=>{

    try{

        const expenses = await Expense.find({
            userId:req.userId
        })

        res.json(expenses)

    }catch(error){

        res.status(500).json({error:"Failed to fetch expenses"})

    }

}