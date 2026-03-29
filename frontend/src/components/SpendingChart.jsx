import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

function SpendingChart({ chartData }) {

  if (!chartData) {
    return null
  }

  return (

    <div style={{ marginTop: "40px", width: "400px" }}>

      <h2>Spending Overview</h2>

      <Pie data={chartData} />

    </div>

  )

}

export default SpendingChart