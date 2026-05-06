from fastapi import status, HTTPException
from services import publicService
async def getAllProductsController():
    try:
        return await publicService.getAllProductsService()
    except Exception as e:
        raise  HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    

async def getProductBySlugController(slug):
    try:
        return await publicService.getProductBySlugService(slug)
    except Exception as e:
        raise  HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    




    