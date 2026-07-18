import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="cards">
        <SummaryCard title="Transactions" value="35,348" />
        <SummaryCard title="Users" value="2,000" />
        <SummaryCard title="Categories" value="8" />
        <SummaryCard title="UPI Payments" value="70%" />
      </div>
    </>
  );
}

export default Dashboard;
