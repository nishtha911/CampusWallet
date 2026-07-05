# generate 5-10 users

# realistic mock student data
import pandas as pd
import random

users = []

for user_id in range(1, 1001):
    user = {
        "user_id": user_id,
        "age": random.randint(18, 25),
        "gender": random.choice(["Male", "Female", "Other"]),
        "student_type": random.choice(["UG", "PG"]),
        "balance": round(random.uniform(500, 5000), 2),
        "risk_score": round(random.uniform(0, 100), 2)
    }
    users.append(user)

df = pd.DataFrame(users)
df.to_csv("data/users.csv", index=False)

print("Synthetic users generated successfully.")
