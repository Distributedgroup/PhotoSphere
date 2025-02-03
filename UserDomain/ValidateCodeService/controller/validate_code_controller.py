from fastapi import HTTPException
from models.user import users_collection

async def validate_code(email: str, code: str):
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"data": code == user["code_reset"]}
