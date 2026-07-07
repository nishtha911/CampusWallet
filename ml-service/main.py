from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

vectorizer = joblib.load("models/vectorizer.pkl")
model = joblib.load("models/classifier.pkl")


class Transaction(BaseModel):
    description: str


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