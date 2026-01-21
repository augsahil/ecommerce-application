from fastapi import APIRouter
from typing import Any as any
from models.authModel import RegisterUser as UserModel
from config.db import users_collection

from controllers.authController import registerController

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

#register route
@router.post("/register")
async def registerView(data: UserModel):
    # doc = await users_collection.insert_one(data.dict())
    # print("Inserted document id:", doc)
    return registerController(data)