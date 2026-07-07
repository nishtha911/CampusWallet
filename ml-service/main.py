from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

vectorizer = joblib.load("models/vectorizer.pkl")
model = joblib.load("models/classifier.pkl")
anomaly_model = joblib.load("models/anomaly_model.pkl")


class Transaction(BaseModel):
    description: str

class Amount(BaseModel):
    amount: float


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