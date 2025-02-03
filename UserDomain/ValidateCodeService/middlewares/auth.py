import jwt
import datetime
from fastapi import HTTPException, Request
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "6M5X#D6%7Nh*!pkR3HL7F@Fdx")

async def auth(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=403, detail="NoHeadersError")

    token = auth_header.replace('"', '')

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        if payload["exp"] < datetime.datetime.utcnow().timestamp():
            raise HTTPException(status_code=403, detail="TokenExpired")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="TokenExpired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=403, detail="InvalidToken")

    return payload
