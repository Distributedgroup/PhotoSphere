from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://52.1.158.25:27017/userservice")
client = AsyncIOMotorClient(MONGO_URI)
db = client.userservice
users_collection = db["users"]  # Asegúrate de que esta línea existe

class User(BaseModel):
    names: str
    surnames: str
    email: str
    profession: str = None
    avatar: str = "defecto.png"
    state: bool = False
    description: str = None
    password: str
    code_reset: str = None
    portada: str = None
    createdAt: str = None
