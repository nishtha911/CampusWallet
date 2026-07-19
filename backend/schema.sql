CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    age INTEGER,
    gender VARCHAR(20),
    year_in_school VARCHAR(20),
    major VARCHAR(100),
    monthly_income DECIMAL(10,2),
    financial_aid DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,
    amount DECIMAL(10,2)
    NOT NULL
    CHECK(amount > 0),
    description VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    is_want BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW(),
    date DATE NOT NULL,
    payment_mode VARCHAR(20)
);


CREATE TABLE IF NOT EXISTS cohort_data (
    id SERIAL PRIMARY KEY,
    month_year DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    avg_spending DECIMAL(10,2) NOT NULL,
    median_spending DECIMAL(10,2) NOT NULL,
    percentile_25 DECIMAL(10,2) NOT NULL,
    percentile_75 DECIMAL(10,2) NOT NULL,
    UNIQUE(month_year, category)
);