import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="center-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          Login
          <span>Welcome back to CampusWallet</span>
        </div>

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="button-confirm" type="submit">
          Login
        </button>

        <p className="form-footer">
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;