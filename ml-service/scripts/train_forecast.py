import pandas as pd
import joblib

from sklearn.linear_model import LinearRegression

df = pd.read_csv("data/transactions.csv")

# Convert date column
df["date"] = pd.to_datetime(df["date"])

# Extract month number
df["month"] = df["date"].dt.month

# Total spending per month
monthly = (
    df.groupby("month")["amount"]
      .sum()
      .reset_index()
)

X = monthly[["month"]]

y = monthly["amount"]

model = LinearRegression()

model.fit(X, y)

joblib.dump(
    model,
    "models/forecast_model.pkl"
)

print("Forecast model saved successfully!")