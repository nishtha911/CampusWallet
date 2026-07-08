from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

vectorizer = joblib.load("models/vectorizer.pkl")
model = joblib.load("models/classifier.pkl")
anomaly_model = joblib.load("models/anomaly_model.pkl")
forecast_model = joblib.load("models/forecast_model.pkl")


class Transaction(BaseModel):
    description: str

class Amount(BaseModel):
    amount: float

class ForecastRequest(BaseModel):
    month: int

@app.get("/")
def home():
    return {
        "message": "CampusWallet ML Service Running"
    }


@app.post("/classify")
def classify(transaction: Transaction):

    description_vector = vectorizer.transform(
        [transaction.description]
    )

    prediction = model.predict(description_vector)[0]

    return {
        "description": transaction.description,
        "is_want": bool(prediction)
    }

@app.post("/detect-anomaly")
def detect_anomaly(transaction: Amount):

    prediction = anomaly_model.predict(
        [[transaction.amount]]
    )[0]

    return {
        "amount": transaction.amount,
        "is_anomaly": bool(prediction == -1)
    }

@app.post("/forecast")
def forecast(request: ForecastRequest):

    prediction = forecast_model.predict(
        [[request.month]]
    )[0]

    return {
        "month": request.month,
        "predicted_spending": round(float(prediction), 2)
    }