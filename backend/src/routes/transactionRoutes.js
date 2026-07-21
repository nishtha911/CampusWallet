import express from "express";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getInsights,
  getBenchmarks,
  predictTransactionCategory
} from "../controllers/transactionController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/transactions/insights", authenticateToken, getInsights);
router.get("/transactions/benchmarks", authenticateToken, getBenchmarks);
router.get("/transactions", authenticateToken, getTransactions);
router.post("/transactions", authenticateToken, createTransaction);
router.put("/transactions/:id", authenticateToken, updateTransaction);
router.delete("/transactions/:id", authenticateToken, deleteTransaction);
router.post("/predict-category", authenticateToken, predictTransactionCategory)

export default router;
