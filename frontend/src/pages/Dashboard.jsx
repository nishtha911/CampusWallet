import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import api from "../services/api";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import LineChart from "../components/Linechart";
import Insights from "../components/Insights";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [insights, setInsights] = useState(null);
  const [benchmarks, setBenchmarks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchInsights();
    fetchBenchmarks();
    fetchTransactions();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get("/users/me/summary");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await api.get("/transactions/insights");
      setInsights(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBenchmarks = async () => {
    try {
      const response = await api.get("/transactions/benchmarks");
      setBenchmarks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/users/me/transactions");

      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("summary", summary);
  console.log("insights", insights);
  console.log("benchmarks", benchmarks);
  if (!summary || !insights) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="cards">
        <SummaryCard title="Transactions" value={summary.totalTransactions} />

        <SummaryCard title="Total Spending" value={`₹${summary.totalSpent}`} />

        <SummaryCard
          title="Largest Transaction"
          value={`₹${insights.largest_transaction}`}
        />

        <SummaryCard
          title="Forecast"
          value={`₹${Math.round(insights.forecast_next_month)}`}
        />
      </div>

      <Insights insights={insights} />

      <h2>Category Benchmarks</h2>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Average</th>
            <th>Median</th>
          </tr>
        </thead>

        <tbody>
          {benchmarks.map((item) => (
            <tr key={item.category}>
              <td>{item.category}</td>
              <td>₹{item.avg_spending}</td>
              <td>₹{item.median_spending}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PieChart transactions={transactions} />
      <BarChart transactions={transactions} />
      <LineChart transactions={transactions} />
    </>
  );
}

export default Dashboard;
