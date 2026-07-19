import express from "express";
import {
  getUserById,
  getUserTransactions,
  getUserSummary,
} from "../controllers/userController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticateToken, getUserById);
router.get("/me/transactions", authenticateToken, getUserTransactions);
router.get("/me/summary", authenticateToken, getUserSummary);

export default router;
