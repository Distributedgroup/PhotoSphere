from fastapi import FastAPI
from routes.validate_code import router as validate_code_router
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Register rutas
app.include_router(validate_code_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Validate Code Service is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5060)
