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
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const monthlyTotals = {};

  sortedTransactions.forEach((transaction) => {
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
        backgroundColor: [
          "#ff6b6b",
          "#feca57",
          "#1dd1a1",
          "#5f27cd",
          "#54a0ff",
          "#ff9ff3",
          "#c8d6e5"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>Monthly Spending</h2>
      <Bar data={data} />
    </div>
  );
}

export default BarChart;