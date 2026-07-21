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

const COLORS = [
  "#54a0ff",
  "#ff6b6b",
  "#feca57",
  "#1dd1a1",
  "#5f27cd",
  "#ff9ff3",
  "#48dbfb",
];

function BarChart({ transactions }) {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const monthlyTotals = {};

  sortedTransactions.forEach((transaction) => {
    const month = new Date(transaction.date)
      .toLocaleString("default", { month: "short", year: "numeric" });

    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
    }

    monthlyTotals[month] += Number(transaction.amount);
  });

  const labels = Object.keys(monthlyTotals);
  const values = Object.values(monthlyTotals);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Spending (₹)",
        data: values,
        backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
        borderWidth: 0,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f0ede8" },
        ticks: { color: "#555", font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#555", font: { size: 12 } },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ fontSize: "16px", fontWeight: 900, marginBottom: "16px" }}>Monthly Spending</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;