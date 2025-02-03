from fastapi import APIRouter
from controller.validate_code_controller import validate_code

router = APIRouter()

@router.get("/validate_code/{code}/{email}")
async def validate_code_route(code: str, email: str):
    return await validate_code(email, code)
