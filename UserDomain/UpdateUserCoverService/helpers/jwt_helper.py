import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "6M5X#D6%7Nh*!pkR3HL7F@Fdx")

def create_token(user):
    payload = {
        "sub": str(user["_id"]),
        "names": user["names"],
        "surnames": user["surnames"],
        "email": user["email"],
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
