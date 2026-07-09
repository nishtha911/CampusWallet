import express from "express";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getInsights,
  getBenchmarks
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/insights/:userId", getInsights);
router.get("/benchmarks", getBenchmarks);

export default router;