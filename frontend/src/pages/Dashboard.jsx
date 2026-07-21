import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import api from "../services/api";
import PieChart from "../components/Piechart";
import BarChart from "../components/Barchart";
import LineChart from "../components/Linechart";
import Insights from "../components/Insights";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [insights, setInsights] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    fetchSummary();
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

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/users/me/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    try {
      const response = await api.get("/transactions/insights");
      setInsights(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate insights. Please try again.");
    } finally {
      setLoadingInsights(false);
    }
  };

  if (!summary) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="section-title" style={{ marginTop: 0 }}>Overview</h1>
        <div className="dashboard-grid">
          <SummaryCard title="Total Transactions" value={summary.totalTransactions} />
          <SummaryCard title="Total Spending" value={`₹${summary.totalSpent}`} />
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

        <h2 className="section-title">AI Insights</h2>
        <button
          className="btn-generate"
          onClick={handleGenerateInsights}
          disabled={loadingInsights}
        >
          {loadingInsights ? "Generating..." : "Generate Insights"}
        </button>

        {insights && <Insights insights={insights} />}
      </div>
    </>
  );
}

export default Dashboard;
