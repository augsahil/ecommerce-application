from fastapi import HTTPException,status
from services import ordersService


async def getAllOrdersController(userId):
    try:
        res_obj =  await ordersService.getAllOrdersService(userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")
    
