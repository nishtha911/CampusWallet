import pandas as pd
import joblib

from sklearn.ensemble import IsolationForest

df = pd.read_csv("data/transactions.csv")

X = df[["amount"]]

model = IsolationForest(
    contamination=0.02,
    random_state=42
)

model.fit(X)

joblib.dump(
    model,
    "models/anomaly_model.pkl"
)

print("Anomaly Detection Model Saved Successfully!")