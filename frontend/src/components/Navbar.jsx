import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>CampusWallet</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/add-transaction">Add Transaction</Link>

        <Link to="/transactions">Transactions</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
