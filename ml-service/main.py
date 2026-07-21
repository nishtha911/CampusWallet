from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import os
import uvicorn

app = FastAPI()

vectorizer = joblib.load("models/vectorizer.pkl")
model = joblib.load("models/classifier.pkl")
anomaly_model = joblib.load("models/anomaly_model.pkl")
forecast_model = joblib.load("models/forecast_model.pkl")
category_classifier = joblib.load("models/category_classifier.pkl")
category_vectorizer = joblib.load("models/category_vectorizer.pkl")


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
    probability = model.predict_proba(description_vector)[0]
    confidence = float(max(probability))
    return {
        "description": transaction.description,
        "is_want": bool(prediction),
        "confidence": round(confidence * 100, 2)
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
        "predicted_spending": round(float(prediction) / 2000, 2) 
    }

@app.post("/predict-category")
def predict_category(transaction: Transaction):
    description_vector = category_vectorizer.transform([transaction.description])
    prediction = category_classifier.predict(description_vector)[0]
    probability = category_classifier.predict_proba(description_vector)[0]
    confidence = float(max(probability))

    return {
        "description": transaction.description,
        "category": prediction,
        "confidence": round(confidence * 100, 2)
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)