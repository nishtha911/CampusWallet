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