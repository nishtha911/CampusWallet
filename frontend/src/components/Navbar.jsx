import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="nav-bar">
      <h2 style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0}}>
        <img src="/image.png" alt="CampusWallet Icon" style={{ width: "32px", height: "32px" }} />
        CampusWallet
      </h2>
      
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-transaction">Add Transaction</Link>
        <Link to="/transactions">Transactions</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
