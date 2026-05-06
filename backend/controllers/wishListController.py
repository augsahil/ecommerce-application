from fastapi import status, HTTPException
from services import wishListService
async def toggleProductController(product_id,user_id):
    try:
        return await wishListService.toggleProductService(product_id,user_id)
    except Exception as e:
        raise  HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    

async def getProductController(product_id,user_id):
    try:
        return await wishListService.getProductService(product_id,user_id)
    except Exception as e:
        raise  HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    

async def getProductsController(user_id):
    try:
        return await wishListService.getProductsService(user_id)
    except Exception as e:
        raise  HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    

 

async def deleteProductController(product_id,user_id):
    try:
        return await wishListService.deleteProductService(product_id,user_id)
    except Exception as e:
        raise  HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    



