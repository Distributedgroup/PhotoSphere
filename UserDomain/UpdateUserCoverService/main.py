from fastapi import FastAPI
from routes.update_user_cover import router as update_cover_router
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Registrar rutas
app.include_router(update_cover_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Update User Cover Service is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5061)
