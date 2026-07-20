import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LineChart({ transactions }) {

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

        label: "Spending Trend",

        data: Object.values(monthlyTotals),

        tension: 0.4,

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

      <h2>Spending Trend</h2>

      <Line data={data} />

    </div>

  );

}

export default LineChart;
