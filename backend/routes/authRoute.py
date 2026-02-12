from fastapi import APIRouter
from typing import Any as any
from models.authModel import RegisterUser as UserModel
from config.db import users_collection

from controllers.authController import registerController

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

#register route
@router.post("/register")
async def registerView(data: UserModel):
    return await registerController(data)