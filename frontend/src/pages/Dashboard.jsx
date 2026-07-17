import { useEffect, useState } from "react";
import api from "../services/api";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {

    const [transactions, setTransactions] = useState([]);
    useEffect(() => {

        fetchTransactions();

    }, []);

    async function fetchTransactions() {
        try {
            const response = await api.get("/transactions");
            setTransactions(response.data);
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            style={{
                padding: "30px"
            }}
        >
            <h1>Dashboard</h1>
            <SummaryCard
                title="Transactions"
                value={transactions.length}
            />
        </div>
    );
}

export default Dashboard;