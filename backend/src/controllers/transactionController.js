import pool from "../config/db.js";

export const getTransactions = async (req , res ) => {
    try {
        const  result = await pool.query(
            "SELECT * FROM transactions"
        );

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
    const {
      user_id,
      amount,
      description,
      category,
      is_want,
      date,
      payment_mode,
    } = req.body;

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
        is_want,
        date,
        payment_mode,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      amount,
      description,
      category,
      is_want,
      date,
      payment_mode,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE transactions
      SET
        amount = $1,
        description = $2,
        category = $3,
        is_want = $4,
        date = $5,
        payment_mode = $6
      WHERE id = $7
      RETURNING *;
      `,
      [
        amount,
        description,
        category,
        is_want,
        date,
        payment_mode,
        id,
      ]
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
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM transactions
      WHERE id = $1
      RETURNING *;
      `,
      [id]
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