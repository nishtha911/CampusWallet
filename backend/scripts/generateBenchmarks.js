import pool from "../src/config/db.js";

const generateBenchmarks = async () => {
  try {

    const result = await pool.query(`
      SELECT
        user_id,
        DATE_TRUNC('month', date)::date AS month_year,
        category,
        SUM(amount) AS total
      FROM transactions
      GROUP BY
        user_id,
        month_year,
        category
      ORDER BY
        month_year,
        category;
    `);

    console.log("Rows found:", result.rows.length);

    const grouped = {};

    result.rows.forEach((row) => {

      const key = `${row.month_year}_${row.category}`;

      if (!grouped[key]) {
        grouped[key] = {
          month_year: row.month_year,
          category: row.category,
          values: [],
        };
      }

      grouped[key].values.push(Number(row.total));

    });

    await pool.query("DELETE FROM cohort_data");

    for (const key in grouped) {

      const group = grouped[key];

      const values = group.values.sort((a, b) => a - b);

      const average =
        values.reduce((sum, value) => sum + value, 0) /
        values.length;

      const median =
        values[Math.floor(values.length / 2)];

      const percentile25 =
        values[Math.floor(values.length * 0.25)];

      const percentile75 =
        values[Math.floor(values.length * 0.75)];

      await pool.query(
        `
        INSERT INTO cohort_data
        (
          month_year,
          category,
          avg_spending,
          median_spending,
          percentile_25,
          percentile_75
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        `,
        [
          group.month_year,
          group.category,
          average.toFixed(2),
          median,
          percentile25,
          percentile75,
        ]
      );

    }

    const count = await pool.query(
      "SELECT COUNT(*) FROM cohort_data"
    );

    console.log(
      "✅ Benchmarks generated successfully."
    );

    console.log(
      "Rows inserted:",
      count.rows[0].count
    );

  } catch (error) {

    console.error(error);

  } finally {

    process.exit();

  }
};

generateBenchmarks();