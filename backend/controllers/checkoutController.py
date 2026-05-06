from fastapi import HTTPException,status
from services import checkoutService
async def makeCheckout(data,userId):
    try:
        res_obj =await checkoutService.makeCheckout(data,userId)
        return res_obj
    
    except Exception as e:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    

async def checkoutCallbackController(data):
    try:
        res_obj =await checkoutService.checkoutCallbackService(data)
        return res_obj
    
    except Exception as e:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    


    