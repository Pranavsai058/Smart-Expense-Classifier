import { useEffect, useState } from "react"
import axios from "axios"

function ExpenseTable({ token,refresh }) {

  const [expenses,setExpenses] = useState([])

  const loadExpenses = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/expenses",
      {
        headers:{
          Authorization: token
        }
      }
    )

    setExpenses(res.data)

  }

  useEffect(()=>{
    loadExpenses()
  },[refresh])
   
  return (

    <div style={{marginTop:"40px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",maxHeight:"500px",overflowY:"scroll"}}>

      

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>

          {expenses.map(exp=>(
            <tr key={exp._id}>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>{exp.description}</td>
              <td>₹{exp.amount}</td>
              <td>{exp.category}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
    
  )

}

export default ExpenseTable