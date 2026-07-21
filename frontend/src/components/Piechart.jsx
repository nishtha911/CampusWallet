import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({ transactions }) {

  const categoryTotals = {};

  transactions.forEach((transaction) => {

    const category = transaction.category;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += Number(
      transaction.amount
    );

  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Spending",
        data: Object.values(categoryTotals),
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
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Spending by Category</h2>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;