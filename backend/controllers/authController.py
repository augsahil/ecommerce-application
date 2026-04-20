from fastapi import HTTPException

from services import authService
from models import authModel

async def registerController(data: authModel.RegisterUser):
    try:
        res_obj = await authService.registerService(data)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

async def loginController(data: authModel.LoginUser):
    try:
        res_obj = await authService.loginService(data)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

async def profileController(userId: str):
    try:
        res_obj = await authService.profileService(userId)
        return res_obj
    except Exception as e:       
        raise HTTPException(status_code=400, detail=str(e))