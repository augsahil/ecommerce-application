from fastapi import APIRouter, Depends, Request
from typing import Any as any
from middleware.VerifyToken import verifyToken
from models import authModel
from config.db import users_collection

from controllers import authController

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

#register route
@router.post("/register")
async def registerView(data: authModel.RegisterUser):
    return await authController.registerController(data)

@router.post("/login")
async def loginView(data: authModel.LoginUser):
    return await authController.loginController(data)

@router.get("/profile")
async def profileView(userId= Depends(verifyToken)):
    # # return await loginController(userId)
    # return {
    #     "message": "User profile fetched successfully",
    #     "userId": userId
    # }
    return await authController.profileController(userId)