from fastapi import APIRouter
from typing import Any as any
from models.authModel import LoginUser, RegisterUser
from config.db import users_collection

from controllers.authController import loginController, registerController

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

#register route
@router.post("/register")
async def registerView(data: RegisterUser):
    return await registerController(data)

@router.post("/login")
async def loginView(data: LoginUser):
    return await loginController(data)