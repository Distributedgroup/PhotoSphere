from fastapi import APIRouter
from controller.get_cover_img_controller import get_cover_img

router = APIRouter()

@router.get("/get_cover_img/{img}")
async def get_image(img: str):
    return await get_cover_img(img)
