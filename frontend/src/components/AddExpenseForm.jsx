import { useState } from "react"
import axios from "axios"

function AddExpenseForm({ token, reloadAnalytics, refreshTable }) {

  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState(null)

  const addExpense = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/add-expense",
      { description, amount },
      { headers: { Authorization: token } }
    )

    setResult(res.data)
    setDescription("")
    setAmount("")
    reloadAnalytics()
    refreshTable()

  }

  return (

    <div>

      <h2>Add Expense</h2>

      <input
        placeholder="Expense description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={addExpense}>
        Add Expense
      </button>

      {result && (

        <div style={{ marginTop: "20px" }}>

          <p>Category: {result.expense.category}</p>

          <p>
            {result.anomaly ? "⚠ Unusual Spending" : "Normal"}
          </p>

          {result.insight && (
            <p style={{ color: "red" }}>
              {result.insight}
            </p>
          )}

        </div>

      )}

    </div>

  )

}

export default AddExpenseForm