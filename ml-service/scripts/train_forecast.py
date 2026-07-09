import pandas as pd
import joblib

from sklearn.linear_model import LinearRegression

df = pd.read_csv("data/transactions.csv")

df["date"] = pd.to_datetime(df["date"])

df["month"] = df["date"].dt.month

current_month = pd.Timestamp.today().month

df = df[df["month"] != current_month]

monthly = (
    df.groupby("month")["amount"]
      .sum()
      .reset_index()
)

print(monthly)

X = monthly[["month"]]
y = monthly["amount"]

model = LinearRegression()

model.fit(X, y)

joblib.dump(
    model,
    "models/forecast_model.pkl"
)

print("Forecast model saved successfully!")