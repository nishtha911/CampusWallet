import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AddTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    payment_mode: "",
    date: "",
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
      await api.post("/transactions", formData);

      alert("Transaction Added Successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add transaction."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
        }}
      >
        <h1>Add Transaction</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <select
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

          <br />
          <br />

          <select
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

          <br />
          <br />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <button type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTransaction;