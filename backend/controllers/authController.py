
from services import authService
from models import authModel 

from fastapi import HTTPException
async def registerController(data:authModel.RegisterUser):
    try:
        res_obj = await authService.registerService(data)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400,detail= f"{e}")

async def loginController(data:authModel.LoginUser):
    try:
        res_obj = await authService.loginService(data)
        return res_obj
    except Exception  as  e:
        raise HTTPException(status_code=400,detail= f"{e}")
    

async def  profileController(userId:str):
    try:
        res_obj = await authService.profileService(userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400,detail= f"{e}")


async def  updateAvatarController(avatar,userId):
    try:
        res_obj = await authService.updateAvatarService(avatar,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400,detail= f"{e}")

async def  UpdateBasicDetailsController(data,userId):
    try:
        res_obj = await authService.UpdateBasicDetailsService(data,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400,detail= f"{e}")


async def  AddNewAddressController(data,userId):
    try:
        res_obj = await authService.AddNewAddressService(data,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400,detail= f"{e}")




async def  deleteAddressController(id,userId):
    try:
        res_obj = await authService.deleteAddressService(id,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=400,detail= f"{e}")







