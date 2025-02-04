from fastapi import FastAPI
from routes.get_cover_img import router as get_cover_img_router
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Registrar rutas
app.include_router(get_cover_img_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Get Cover Image Service is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5062)
