import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import api from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get("/users/me/summary");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!summary) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="cards">
        <SummaryCard title="Transactions" value={summary.totalTransactions} />

        <SummaryCard title="Total Spending" value={`₹${summary.totalSpent}`} />

        <SummaryCard
          title="Average Transaction"
          value={`₹${summary.averageTransaction}`}
        />

        <SummaryCard title="Top Category" value={summary.topCategory} />
      </div>
    </>
  );
}

export default Dashboard;
