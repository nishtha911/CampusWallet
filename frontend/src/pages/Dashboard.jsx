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

      <div className="dashboard-container">
        <h1 className="section-title" style={{marginTop: 0}}>Overview</h1>
        <div className="dashboard-grid">
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

        <div className="dashboard-grid two-cols">
          <div>
            <h2 className="section-title" style={{marginTop: 0}}>Insights</h2>
            <Insights insights={insights} />
          </div>
          <div>
            <h2 className="section-title" style={{marginTop: 0}}>Category Benchmarks</h2>
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
          </div>
        </div>

        <h2 className="section-title">Visualizations</h2>
        <div className="dashboard-grid two-cols">
          <div className="minimal-card">
            <PieChart transactions={transactions} />
          </div>
          <div className="minimal-card">
            <BarChart transactions={transactions} />
          </div>
        </div>
        <div className="dashboard-grid">
          <div className="minimal-card">
             <LineChart transactions={transactions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
