import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { predictCategory } from "../services/api";

function AddTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    payment_mode: "",
    date: "",
  });
  const [confidence, setConfidence] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredictCategory = async () => {
    if (!formData.description) {
      alert("Please enter a description first.");
      return;
    }

    try {
      const response = await predictCategory(formData.description);
      setFormData({
        ...formData,
        category: response.category,
      });
      setConfidence(response.confidence);
    } catch (error) {
      console.error("Category prediction error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/transactions", formData);

      alert("Transaction Added Successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to add transaction.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="center-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            Add Transaction
            <span>Log a new expense</span>
          </div>

          <input
            className="input"
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button className="button-confirm" style={{margin: "10px auto"}} type="button" onClick={handlePredictCategory}>
            Predict Category
          </button>
          
          {confidence && (
            <span style={{ marginLeft: "10px", color: confidence > 80 ? "green" : "orange", fontWeight: "bold" }}>
            AI Prediction Confidence: {confidence}%
            </span>
          )}

          <select
            className="input"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Books">Books</option>
            <option value="Fees">Fees</option>
          </select>

          <select
            className="input"
            name="payment_mode"
            value={formData.payment_mode}
            onChange={handleChange}
            required
          >
            <option value="">Payment Mode</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>

          <input
            className="input"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <button className="button-confirm" type="submit">Add Transaction</button>
        </form>
      </div>
    </>
  );
}

export default AddTransaction;
