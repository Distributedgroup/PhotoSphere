from fastapi import APIRouter, Depends, File, UploadFile
from controller.update_user_cover_controller import update_user_cover
from middlewares.auth import auth

router = APIRouter()

@router.post("/update_user_cover")
async def update_cover(file: UploadFile = File(...), user_data=Depends(auth)):
    return await update_user_cover(user_data, file)
