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
        label: "Spending Trend",
        data: Object.values(monthlyTotals),
        borderColor: "#5f27cd",
        backgroundColor: "rgba(95, 39, 205, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>Spending Trend</h2>
      <Line data={data} />
    </div>
  );
}

export default LineChart;
