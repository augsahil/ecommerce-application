from fastapi import APIRouter
from typing import Any as any

from controllers.authController import registerController

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

#register route
@router.post("/register")
async def registerView(data: any):

    return registerController(data)