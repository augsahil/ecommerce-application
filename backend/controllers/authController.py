from fastapi import HTTPException

from services.authService import loginService, registerService
from models.authModel import RegisterUser

async def registerController(data: RegisterUser):
    try:
        res_obj = await registerService(data)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

async def loginController(data):
    try:
        res_obj = await loginService(data)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))