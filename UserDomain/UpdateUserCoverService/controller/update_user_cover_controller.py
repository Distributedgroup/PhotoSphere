from fastapi import HTTPException, UploadFile
from models.user import users_collection
import os
from bson import ObjectId
from datetime import datetime

UPLOAD_FOLDER = "uploads/portadas"

async def update_user_cover(user_data: dict, file: UploadFile):
    user_id = user_data.get("sub")

    # Validate file
    if not file.filename:
        raise HTTPException(status_code=400, detail="No images have been uploaded")

    # Create directory if it does not exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Save file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Update in MongoDB
    updated_user = await users_collection.find_one_and_update(
        {"_id": ObjectId(user_id)},  # <-- Convert ID to ObjectId
        {"$set": {"portada": file.filename}},
        return_document=True
    )

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Updated cover", "portada": file.filename}
