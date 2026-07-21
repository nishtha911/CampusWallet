import pandas as pd
import random
from datetime import datetime, timedelta

transactions = []

transaction_data = {
    "Food": [
        ("Mess Lunch", False), ("Groceries", False), ("Pizza", True), ("Burger", True), ("Coffee", True),
        ("Starbucks", True), ("McDonalds", True), ("Subway", True), ("Dominos", True), ("KFC", True),
        ("Supermarket", False), ("Milk", False), ("Vegetables", False), ("Zomato", True), ("Swiggy", True),
        ("Taco Bell", True), ("Dunkin Donuts", True), ("Canteen Snacks", True), ("Water Bottle", False),
        ("Ice Cream", True), ("Bakery", True), ("Dining Out", True), ("Blinkit", False), ("Zepto", False)
    ],
    "Transport": [
        ("Bus Pass", False), ("Metro Card", False), ("Auto Fare", False), ("Train Ticket", False), ("Uber Ride", True),
        ("Taxi", True), ("Lyft", True), ("Ola Cab", True), ("Rapido", True), ("Flight Ticket", True),
        ("Gas", False), ("Petrol", False), ("Toll Tax", False), ("Parking", False), ("Bicycle Repair", False),
        ("Subway Token", False), ("Local Train", False), ("Rickshaw", False), ("Car Rental", True), ("Uber Auto", False)
    ],
    "Books": [
        ("DSA Textbook", False), ("Python Book", False), ("Notebook", False), ("Lab Manual", False), ("Stationery", False),
        ("Pens", False), ("Pencils", False), ("Calculator", False), ("Engineering Drawing Kit", False), ("Library Fine", False),
        ("Novel", True), ("Fiction Book", True), ("Kindle Ebook", True), ("Magazine", True), ("Comic Book", True),
        ("Printouts", False), ("Xerox", False), ("Highlighters", False), ("Sticky Notes", False), ("Course Material", False)
    ],
    "Entertainment": [
        ("Movie Ticket", True), ("Netflix Subscription", True), ("Spotify Subscription", True), ("Gaming", True), ("Concert Ticket", True),
        ("Amazon Prime", True), ("Disney Plus", True), ("Steam Games", True), ("Playstation Plus", True), ("Xbox Game Pass", True),
        ("Bowling", True), ("Amusement Park", True), ("Clubbing", True), ("Party", True), ("Board Games", True),
        ("YouTube Premium", True), ("Apple Music", True), ("Arcade", True), ("Standup Comedy", True), ("Cricket Match", True)
    ],
    "Shopping": [
        ("Clothes", True), ("Accessories", True), ("Electronics", True),
        ("Zara", True), ("H&M", True), ("Myntra", True), ("Amazon Shopping", True), ("Flipkart", True),
        ("Shoes", True), ("Sneakers", True), ("Watch", True), ("Perfume", True), ("Makeup", True),
        ("Skincare", True), ("Laptop Case", True), ("Phone Cover", True), ("Headphones", True), ("Gift", True),
        ("Jacket", True), ("Backpack", False), ("Winter Wear", False), ("Sunglasses", True), ("Jewelry", True)
    ],
    "Fees": [
        ("Tuition Fee", False), ("Exam Fee", False),
        ("Hostel Fee", False), ("Mess Fee", False), ("College Fest Pass", True), ("Registration Fee", False),
        ("Late Fine", False), ("Library Fee", False), ("Alumni Association", False), ("Club Membership", True),
        ("Gym Membership", True), ("Course Certification", False), ("Workshop Fee", False), ("Hackathon Entry", False),
        ("ID Card Replacement", False), ("Transcript Fee", False), ("Placement Training", False), ("Medical Insurance", False)
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