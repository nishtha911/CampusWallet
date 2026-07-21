# CampusWallet
**Student Finance Intelligence Platform**

CampusWallet is a student finance intelligence platform built using a microservices architecture. It leverages the PERN stack (PostgreSQL, Express, React, Node.js) for the core web application and a Python-based FastAPI microservice for machine learning functionalities like transaction classification, anomaly detection, and forecasting.

## Architecture

*   **Frontend**: React.js dashboard for transaction input and insights visualization.
*   **Backend API**: Node.js/Express server handling authentication, validation, database interactions, and routing requests to the ML service.
*   **ML Microservice**: Python/FastAPI service responsible for ML predictions (classification, anomaly detection, forecasting).
*   **Database**: PostgreSQL storing users, transactions, and cohort benchmark data.

## Features

1.  **Transaction Classification**: Automatically categorizes transactions as "wants" or "needs" using a Logistic Regression model trained on descriptions.
2.  **Anomaly Detection**: Flags unusual spending patterns using an Isolation Forest model to detect outliers based on historical category spending.
3.  **Forecasting**: Predicts next month's spending trends using time-series forecasting.
4.  **Peer Benchmarks**: Compares individual spending against cohort data to provide actionable insights.

## Prerequisites

*   Node.js (v18+)
*   Python (3.8+)
*   PostgreSQL
*   npm or yarn

## Installation & Local Setup

### 1. Database Setup
Ensure PostgreSQL is running. Create a database for the project (e.g., `campuswallet`) and run the initial migrations/schema setup.

### 2. Backend (Node.js/Express)
```bash
cd backend
npm install
# Set up your .env file with DATABASE_URL and PORT (e.g., 5000)
npm start
```

### 3. ML Service (Python/FastAPI)
```bash
cd ml-service
python -m venv venv
# Activate virtual environment
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 4. Frontend (React)
```bash
cd frontend
npm install
# Set up your .env file with backend API URLs
npm run dev
```

## Running the Application
Once all three services (Backend on port 5000, ML Service on port 8000, and Frontend on port 3000/5173) are running, navigate to the frontend URL in your browser to access the CampusWallet dashboard.
