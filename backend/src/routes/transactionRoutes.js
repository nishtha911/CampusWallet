import express from "express";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getInsights,
  getBenchmarks,
} from "../controllers/transactionController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/transactions", authenticateToken, getTransactions);
router.post("/transactions", authenticateToken, createTransaction);
router.put("/transactions/:id", authenticateToken, updateTransaction);
router.delete("/transactions/:id", authenticateToken, deleteTransaction);
router.get("/transactions/insights", authenticateToken, getInsights);
router.get("/transactions/benchmarks", authenticateToken, getBenchmarks);

export default router;
