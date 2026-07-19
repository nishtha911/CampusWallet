import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="navbar">
      <div>
        <h2>CampusWallet</h2>

        <p>
          Welcome,
          {user?.name}
        </p>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
