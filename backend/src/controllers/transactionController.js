import pool from "../config/db.js";
import {
  classifyTransaction,
  detectAnomaly,
  forecastSpending,
  predictCategory
} from "../services/mlService.js";

export const getTransactions = async (req, res) => {
  try {
    const { search, sortBy = 'date', order = 'desc' } = req.query;
    
    let query = "SELECT * FROM transactions WHERE user_id = $1";
    const values = [req.user.id];
    let paramIndex = 2;

    if (search) {
      query += ` AND (description ILIKE $${paramIndex} OR category ILIKE $${paramIndex})`;
      values.push(`%${search}%`);
      paramIndex++;
    }

    const allowedSortColumns = ['date', 'amount', 'category', 'created_at'];
    const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'date';
    const safeOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${safeSortBy} ${safeOrder}`;

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { amount, description, category, date, payment_mode } = req.body;

    const user_id = req.user.id;

    const classification = await classifyTransaction(description);
    const anomaly = await detectAnomaly(amount);

    const result = await pool.query(
      `
      INSERT INTO transactions
      (user_id, amount, description, category, is_want, date, payment_mode)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [
        user_id,
        amount,
        description,
        category,
        classification.is_want,
        date,
        payment_mode,
      ],
    );

    res.status(201).json({
      transaction: result.rows[0],
      anomaly,
      classification
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const updateTransaction = async (req, res) => {

  const userId = req.user.id;

  try {
    const { id } = req.params;

    const { amount, description, category, is_want, date, payment_mode } =
      req.body;

    const result = await pool.query(
      `
      UPDATE transactions
        SET
        amount=$1,
        description=$2,
        category=$3,
        is_want=$4,
        date=$5,
        payment_mode=$6
        WHERE id=$7
        AND user_id=$8
        RETURNING *;
      `,
      [amount, description, category, is_want, date, payment_mode, id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTransaction = async (req, res) => {

  const userId = req.user.id;
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM transactions
      WHERE id=$1
      AND user_id=$2
      RETURNING *;
      `,
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await pool.query(
      `
      SELECT *
      FROM transactions
      WHERE user_id = $1
      `,
      [userId],
    );

    const rows = transactions.rows;

    const totalTransactions = rows.length;

    const totalSpending = rows.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0,
    );

    const wantTransactions = rows.filter(
      (transaction) => transaction.is_want,
    ).length;

    const needTransactions = rows.filter(
      (transaction) => !transaction.is_want,
    ).length;

    const largestTransaction =
      rows.length > 0
        ? Math.max(...rows.map((transaction) => Number(transaction.amount)))
        : 0;

    const month = new Date().getMonth() + 1;

    const forecast = await forecastSpending(month);

    res.status(200).json({
      total_transactions: totalTransactions,
      total_spending: totalSpending,
      want_transactions: wantTransactions,
      need_transactions: needTransactions,
      largest_transaction: largestTransaction,
      forecast_next_month: forecast.predicted_spending,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getBenchmarks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        category,
        ROUND(AVG(avg_spending), 2) AS avg_spending,
        ROUND(AVG(median_spending), 2) AS median_spending,
        ROUND(AVG(percentile_25), 2) AS percentile_25,
        ROUND(AVG(percentile_75), 2) AS percentile_75
      FROM cohort_data
      GROUP BY category
      ORDER BY category
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const predictTransactionCategory = async (req,res)=>{
  const {description} = req.body;
  
  if (!description) {
    return res.status(400).json({
      message: "Description is required",
    });
  }

  try{
    const prediction = await predictCategory(description);
    res.status(200).json(prediction);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }

};