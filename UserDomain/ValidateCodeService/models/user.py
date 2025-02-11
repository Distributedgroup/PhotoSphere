from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://172.31.86.88:27017")
db = client["userservice"]
print(db.list_collection_names())

class User(BaseModel):
    names: str
    surnames: str
    email: str
    country: str = None
    profession: str = None
    birth: str = None
    gender: str = None
    phone: str = None
    avatar: str = "defecto.png"
    frontPage: str = None
    state: bool = False
    description: str = None
    username: str = None
    password: str
    code_reset: str = None
    createdAt: str = None
