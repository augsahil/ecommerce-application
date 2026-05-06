from fastapi import HTTPException,status
from services import productService
async def addProductController(images,data,userId):
    try:
        res_obj =  await productService.addProductService(images,data,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")
    

async def allProductsController(userId):
    try:
        res_obj =  await productService.allProductsService(userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")
    

    

async def deleteProductController(id,userId):
    try:
        res_obj =  await productService.deleteProductService(id,userId)
        return res_obj
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail= f"{e}")
    






