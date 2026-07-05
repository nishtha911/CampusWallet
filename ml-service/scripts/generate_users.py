import pandas as pd
import random
from datetime import datetime

users = []

first_names = [
    "Aadhya", "Aarav", "Abhay", "Aditi", "Aditya",
    "Advik", "Ananya", "Anika", "Arjun", "Arnav",
    "Avni", "Ayaan", "Bhavya", "Deepak", "Devika",
    "Dhruv", "Diya", "Inaya", "Ira", "Ishan",
    "Jaanvi", "Kabir", "Kiaan", "Kiran", "Mayank",
    "Meera", "Meghna", "Nisha", "Priya", "Rahul",
    "Reyansh", "Saanvi", "Sameer", "Sitara", "Siya",
    "Surya", "Varun", "Varsha", "Vihaan", "Vikram"
]

last_names = [
    "Agarwal", "Banerjee", "Chatterjee", "Choudhury", "Das",
    "Gupta", "Iyer", "Joshi", "Kapoor", "Kumar",
    "Malhotra", "Mehta", "Mishra", "Nair", "Patel",
    "Pillai", "Rao", "Reddy", "Sen", "Shah",
    "Sharma", "Singh", "Verma", "Yadav"
]

majors = [
    "Computer Science",
    "Engineering",
    "Economics",
    "Biology",
    "Psychology",
    "Architecture",
    "Business",
    "Commerce",
    "Physics",
    "Design",
    "Fashion",
    "Artificial Intelligence",
    "Data Science"
]

for user_id in range(1, 2001):

    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    name = f"{first_name} {last_name}"

    age = random.randint(18, 25)

    if age <= 19:
        year_in_school = random.choice(["Freshman", "Sophomore"])
    elif age <= 21:
        year_in_school = random.choice(
            ["Sophomore", "Junior", "Senior"]
        )
    else:
        year_in_school = random.choice(
            ["Junior", "Senior"]
        )

    email = f"user{user_id}@campuswallet.com"

    password = "password123"

    gender = random.choice(
        ["Male", "Female", "Other"]
    )

    major = random.choice(majors)

    monthly_income = random.randint(500, 5000)

    financial_aid = random.randint(0, 2000)

    created_at = datetime.now()

    users.append({
        "id": user_id,
        "name": name,
        "email": email,
        "password": password,
        "created_at": created_at,
        "age": age,
        "gender": gender,
        "year_in_school": year_in_school,
        "major": major,
        "monthly_income": monthly_income,
        "financial_aid": financial_aid
    })

df = pd.DataFrame(users)

df.to_csv(
    "data/users.csv",
    index=False
)

print("Users generated successfully.")