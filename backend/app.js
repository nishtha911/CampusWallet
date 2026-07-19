import express from "express";
import cors from "cors";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);

export default app;