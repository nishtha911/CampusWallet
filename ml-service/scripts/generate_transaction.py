import pandas as pd
import random
from datetime import datetime, timedelta

transactions = []

transaction_data = {
    "Food": [
        ("Mess Lunch", False),
        ("Groceries", False),
        ("Pizza", True),
        ("Burger", True),
        ("Coffee", True)
    ],
    "Transport": [
        ("Bus Pass", False),
        ("Metro Card", False),
        ("Auto Fare", False),
        ("Train Ticket", False),
        ("Uber Ride", True)
    ],
    "Books": [
        ("DSA Textbook", False),
        ("Python Book", False),
        ("Notebook", False),
        ("Lab Manual", False),
        ("Stationery", False)
    ],
    "Entertainment": [
        ("Movie Ticket", True),
        ("Netflix Subscription", True),
        ("Spotify Subscription", True),
        ("Gaming", True),
        ("Concert Ticket", True)
    ],
    "Shopping": [
        ("Clothes", True),
        ("Accessories", True),
        ("Electronics", True)
    ],
    "Fees": [
        ("Tuition Fee", False),
        ("Exam Fee", False)
    ]
}

amount_ranges = {
    "Food": (50, 500),
    "Transport": (20, 300),
    "Books": (100, 2000),
    "Entertainment": (100, 2000),
    "Shopping": (200, 10000),
    "Fees": (500, 50000)
}

transaction_id = 1

for user_id in range(1, 2001):

    number_of_transactions = random.randint(10, 25)

    for _ in range(number_of_transactions):

        category = random.choice(
            list(transaction_data.keys())
        )

        description, is_want = random.choice(
            transaction_data[category]
        )

        minimum, maximum = amount_ranges[category]

        amount = random.randint(
            minimum,
            maximum
        )

        days_ago = random.randint(0, 180)

        transaction_date = (
            datetime.now()
            - timedelta(days=days_ago)
        ).date()

        payment_mode = random.choices(
            ["UPI", "Cash", "Card"],
            weights=[70, 10, 20]
        )[0]

        created_at = datetime.now()

        transactions.append({
            "id": transaction_id,
            "user_id": user_id,
            "amount": amount,
            "description": description,
            "category": category,
            "is_want": is_want,
            "created_at": created_at,
            "date": transaction_date,
            "payment_mode": payment_mode
        })

        transaction_id += 1

df = pd.DataFrame(transactions)

df.to_csv(
    "data/transactions.csv",
    index=False
)

print("Transactions generated successfully.")