import express from "express";
import {
  getUserById,
  getUserTransactions,
  getUserSummary
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/:id/transactions", getUserTransactions);
router.get("/:id/summary", getUserSummary);

export default router;