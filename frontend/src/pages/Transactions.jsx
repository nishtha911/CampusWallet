import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    fetchTransactions();
  }, [search, sortBy, order]);

  const fetchTransactions = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("sortBy", sortBy);
      params.append("order", order);

      const response = await api.get(`/transactions?${params.toString()}`);
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load transactions");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);

      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      );

      alert("Transaction deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const editTransaction = async (transaction) => {
    const amount = prompt("Amount", transaction.amount);

    if (!amount) return;

    try {
      await api.put(`/transactions/${transaction.id}`, {
        ...transaction,
        amount,
      });

      fetchTransactions();

      alert("Updated");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>My Transactions</h1>

        <div className="transactions-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search descriptions or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
          <select 
            className="sort-select" 
            value={order} 
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>

                <td>{transaction.description}</td>

                <td>{transaction.category}</td>

                <td>{transaction.payment_mode}</td>

                <td>₹{transaction.amount}</td>

                <td>
                  <button onClick={() => editTransaction(transaction)}>
                    Edit
                  </button>

                  <button onClick={() => deleteTransaction(transaction.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transactions;
