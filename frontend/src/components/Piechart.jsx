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
      },
    ],
  };

  return (
    <div
      style={{
        width: "450px",
        margin: "30px auto",
      }}
    >
      <h2>Spending by Category</h2>

      <Pie data={data} />
    </div>
  );
}

export default PieChart;