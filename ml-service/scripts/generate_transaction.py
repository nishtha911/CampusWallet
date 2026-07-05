# algorithm to generate realistc synthetic student transactions
import pandas as pd
import random
from datetime import datetime, timedelta

# stores all transactions
transactions = []

# descs and whether they are wants or needs
transaction_data = {
    "Food": [
        ("Mess Lunch", False),
        ("Pizza", True),
        ("Starbucks Coffee", True),
        ("Burger", True),
        ("Groceries", False)
    ],
    "Transport": [
        ("Bus Pass", False),
        ("Metro Card", False),
        ("Auto Fare", False),
        ("Uber Ride", True),
        ("Train Ticket", False)
    ],
    "Books": [
        ("DSA Textbook", False),
        ("Notebook", False),
        ("Lab Manual", False),
        ("Python Book", False),
        ("Stationery", False)
    ],
    "Entertainment": [
        ("Movie Ticket", True),
        ("Spotify Subscription", True),
        ("Netflix Subscription", True),
        ("Gaming", True),
        ("Concert Ticket", True)
    ]
}

# realistic amount ranges per category
amount_ranges = {
    "Food": (50, 500),
    "Transport": (20, 300),
    "Books": (100, 2000),
    "Entertainment": (100, 1000)
}

# create 5 users
for user_id in range(1, 6):

    number_of_transactions = random.randint(10, 20)

    for _ in range(number_of_transactions):
        category = random.choice(list(transaction_data.keys()))
        description, is_want = random.choice(
            transaction_data[category]
        )
        minimum, maximum = amount_ranges[category]
        amount = round(random.uniform(minimum, maximum), 2)
        days_ago = random.randint(0, 180)
        transaction_date = (
            datetime.now() - timedelta(days=days_ago)
        ).strftime("%Y-%m-%d")
        transaction = {
            "user_id": user_id,
            "amount": amount,
            "description": description,
            "category": category,
            "is_want": is_want,
            "date": transaction_date
        }
        transactions.append(transaction)

# Convert list to table
df = pd.DataFrame(transactions)

# Save as CSV
df.to_csv(
    "data/transactions.csv",
    index=False
)

print("Synthetic transactions generated successfully.")