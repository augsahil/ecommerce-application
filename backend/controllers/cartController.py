from services import cartService
from fastapi import HTTPException,status


async def addProductController(product_id,userId):
    try:
        res_obj = await cartService.addProductService(product_id,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")

async def getProductsController(userId):
    try:
        res_obj = await cartService.getProductsService(userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")
       

async def getProductController(product_id,userId):
    try:
        res_obj = await cartService.getProductService(product_id,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")
    

    
async def cartOperationController(product_id,operation,userId):
    try:
        res_obj = await cartService.cartOperationService(product_id,operation,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")
    

    


