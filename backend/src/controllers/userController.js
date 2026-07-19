import pool from "../config/db.js";

export const getUserById = async (req, res) => {
  try {
    const id = req.user.id;

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const id = req.user.id;

    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC",
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const getUserSummary = async (req, res) => {
  try {
    const id = req.user.id;

    const summary = await pool.query(
      `
      SELECT
        COUNT(*) AS total_transactions,
        COALESCE(SUM(amount), 0) AS total_spent,
        COALESCE(ROUND(AVG(amount), 2), 0) AS average_transaction
      FROM transactions
      WHERE user_id = $1
      `,
      [id]
    );

    const topCategory = await pool.query(
      `
      SELECT
        category,
        COUNT(*) AS frequency
      FROM transactions
      WHERE user_id = $1
      GROUP BY category
      ORDER BY frequency DESC
      LIMIT 1
      `,
      [id]
    );

    res.status(200).json({
      totalTransactions:
        Number(
          summary.rows[0].total_transactions
        ),
      totalSpent:
        Number(
          summary.rows[0].total_spent
        ),
      averageTransaction:
        Number(
          summary.rows[0].average_transaction
        ),
      topCategory:
        topCategory.rows[0]?.category || null
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};