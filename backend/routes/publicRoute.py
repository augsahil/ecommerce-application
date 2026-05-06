from fastapi import APIRouter
from controllers import publicController
router = APIRouter(prefix="/api/v1",tags=['Public'])


@router.get("/products")
async def getAllProductsView():
    return await publicController.getAllProductsController()



@router.get("/product/{slug}")
async def getAllProductsView(slug:str):
    return await publicController.getProductBySlugController(slug)