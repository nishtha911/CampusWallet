import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await api.post(
        "/auth/register",

        formData,
      );

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="center-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          Create Account
          <span>Join CampusWallet today</span>
        </div>

        <input
          className="input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

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
          Register
        </button>

        <p className="form-footer">
          Already have an account?
          <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
