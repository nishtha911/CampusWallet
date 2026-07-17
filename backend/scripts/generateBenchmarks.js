import pool from "../src/config/db.js";

const generateBenchmarks = async () => {

    try {

        const result = await pool.query(`
            SELECT
                user_id,
                category,
                SUM(amount) AS total
            FROM transactions
            GROUP BY user_id, category
        `);

        const grouped = {};

        result.rows.forEach(row => {

            const category = row.category;
            const amount = Number(row.total);

            if (!grouped[category]) {
                grouped[category] = [];
            }

            grouped[category].push(amount);

        });

        await pool.query("DELETE FROM cohort_data");

        for (const category in grouped) {

            const values = grouped[category].sort((a, b) => a - b);

            const avg =
                values.reduce((a, b) => a + b, 0) /
                values.length;

            const median =
                values[Math.floor(values.length / 2)];

            const p25 =
                values[Math.floor(values.length * 0.25)];

            const p75 =
                values[Math.floor(values.length * 0.75)];

            await pool.query(
                `
                INSERT INTO cohort_data
                (
                    category,
                    avg_spending,
                    median_spending,
                    percentile_25,
                    percentile_75
                )
                VALUES
                ($1,$2,$3,$4,$5)
                `,
                [
                    category,
                    avg.toFixed(2),
                    median,
                    p25,
                    p75
                ]
            );

        }

        console.log("Benchmark data generated successfully.");

    }

    catch (err) {

        console.error(err);

    }

    finally {

        process.exit();

    }

};

generateBenchmarks();