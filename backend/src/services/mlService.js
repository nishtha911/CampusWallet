import axios from "axios";

const ML_URL = process.env.ML_URL || "http://127.0.0.1:8000";

export const classifyTransaction = async (description) => {
    try {
        const response = await axios.post(`${ML_URL}/classify`, { description });
        return response.data;
    } catch (error) {
        console.error("ML classify error:", error.message);
        return { is_want: false };
    }
};

export const detectAnomaly = async (amount) => {
    try {
        const response = await axios.post(`${ML_URL}/detect-anomaly`, { amount });
        return response.data;
    } catch (error) {
        console.error("ML detectAnomaly error:", error.message);
        return { is_anomaly: false };
    }
};

export const forecastSpending = async (month) => {
    try {
        const response = await axios.post(`${ML_URL}/forecast`, { month });
        return response.data;
    } catch (error) {
        console.error("ML forecast error:", error.message);
        return { predicted_spending: 0 };
    }
};

export const predictCategory = async (description) => {
    try {
        const response = await axios.post(`${ML_URL}/predict-category`, { description });
        return response.data;
    } catch (error) {
        console.error("ML predictCategory error:", error.message);
        return { category: "Other" };
    }
};