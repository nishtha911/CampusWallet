import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChart({ transactions }) {

  const monthlyTotals = {};

  transactions.forEach((transaction) => {

    const month = new Date(transaction.date)
      .toLocaleString("default", {
        month: "short",
      });

    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }

    monthlyTotals[month] += Number(transaction.amount);

  });

  const data = {

    labels: Object.keys(monthlyTotals),

    datasets: [

      {
        label: "Monthly Spending",

        data: Object.values(monthlyTotals),

      },

    ],

  };

  return (

    <div
      style={{
        width: "700px",
        margin: "40px auto",
      }}
    >

      <h2>Monthly Spending</h2>

      <Bar data={data} />

    </div>

  );

}

export default BarChart;