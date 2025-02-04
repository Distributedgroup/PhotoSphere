from fastapi import HTTPException
from fastapi.responses import FileResponse
import os

UPLOAD_FOLDER = "uploads/portadas"

async def get_cover_img(img: str):
    file_path = os.path.join(UPLOAD_FOLDER, img)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(file_path)
