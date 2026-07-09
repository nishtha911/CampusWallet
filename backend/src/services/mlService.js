import axios from "axios";

const ML_URL = "http://127.0.0.1:8000";

export const classifyTransaction = async (description) => {

    const response = await axios.post(
        `${ML_URL}/classify`,
        {
            description
        }
    );

    return response.data;
};

export const detectAnomaly = async (amount) => {

    const response = await axios.post(
        `${ML_URL}/detect-anomaly`,
        {
            amount
        }
    );

    return response.data;
};