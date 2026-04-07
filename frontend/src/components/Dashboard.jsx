import { useState, useEffect } from "react"
import axios from "axios"

import AddExpenseForm from "./AddExpenseForm"
import PredictionCard from "./PredictionCard"
import SpendingChart from "./SpendingChart"
import ExpenseTable from "./ExpenseTable"
import AIChat from "./AIChat"
import "../dashboard.css"
function Dashboard({ token, setToken }) {
    const [refreshTable,setRefreshTable] = useState(false)
    const [chartData, setChartData] = useState(null)
    const [prediction, setPrediction] = useState(null)

    const loadPrediction = async () => {
        try {

            const res = await axios.get(
                "https://smart-expense-classifier-backend.onrender.com/analytics/prediction"
            )

            setPrediction(res.data.predicted_spending)

        } catch (error) {
            console.error("Prediction error:", error)
        }
    }

    const loadAnalytics = async () => {

        try {

            const res = await axios.get(
                "https://smart-expense-classifier-backend.onrender.com/analytics/category-summary",
                {
                    headers: {
                        Authorization: token
                    }
                }
            )

            

            const labels = res.data.map(item => item._id)
            const totals = res.data.map(item => item.total)

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Spending by Category",
                        data: totals,
                        backgroundColor: [
                            "#ff6384",
                            "#36a2eb",
                            "#ffcd56",
                            "#4bc0c0",
                            "#9966ff",
                            "#ff9f40"
                        ]
                    }
                ]
            })

        } catch (error) {
            console.log(error)
        }

    }

    const downloadReport = async () => {
        try {

            const res = await axios.get(
                "https://smart-expense-classifier-backend.onrender.com/reports/download",
                {
                    headers: {
                        Authorization: token
                    },
                    responseType: "blob"
                }
            )

            const url = window.URL.createObjectURL(
                new Blob([res.data])
            )

            const link = document.createElement("a")

            link.href = url
            link.setAttribute("download", "financial_report.pdf")

            document.body.appendChild(link)
            link.click()

        } catch (error) {
            console.error("Report download error:", error)
        }
    }

    useEffect(() => {

        if (token) {
            loadAnalytics()
            loadPrediction()
        }

    }, [token])

    return (
             
        <div className="container">

            <h1>Smart Expense Analyzer</h1>

            <div className="card">
                <AddExpenseForm
                    token={token}
                    reloadAnalytics={loadAnalytics}
                    refreshTable={() => setRefreshTable(prev => !prev)}
                />
            </div>

            <div className="card">
                <PredictionCard prediction={prediction} />
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>Spending Overview</h2>
                <SpendingChart chartData={chartData} />
            </div>


            <div className="card">
                <h2>Expense History</h2>
                <ExpenseTable token={token}
                refresh={refreshTable} />
            </div>
            <div style={{ marginTop: "20px", paddingBottom:"20px" }}>
                <button onClick={downloadReport}>
                    Download Report
                </button>
            </div>

            <div className="card" >
                <AIChat token={token} />
            </div>

            <div style={{ padding: "30px" }}>
                <button
                    onClick={() => {
                        localStorage.removeItem("token")
                        setToken(null)
                    }}
                >
                    Logout
                </button>
            </div>

        </div>

    )
}

export default Dashboard