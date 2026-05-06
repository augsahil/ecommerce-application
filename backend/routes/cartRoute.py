from fastapi import APIRouter,Depends,Form
from controllers import cartController
from middlewares.VerifyUser import  ValidateUser
from models import authModel,cartModel
router = APIRouter(prefix="/api/v1/cart",tags=['cart'])



@router.get("/get")
async def addProductView(userId:str=Depends(ValidateUser(authModel.RolesEnum.buyer))):
    return await cartController.getProductsController(userId)



@router.get("/get/{product_id}")
async def addProductView(product_id:str,userId:str=Depends(ValidateUser(authModel.RolesEnum.buyer))):
    return await cartController.getProductController(product_id,userId)




@router.put("/product/{product_id}/{operation}")
async def cartOpertionView(product_id:str, operation:cartModel.CartOperations ,userId:str=Depends(ValidateUser(authModel.RolesEnum.buyer))):
    return await cartController.cartOperationController(product_id,operation,userId)



@router.post("/add")
async def addProductView(data:cartModel.AddNewProduct,userId:str=Depends(ValidateUser(authModel.RolesEnum.buyer))):
    return await cartController.addProductController(data.product_id,userId)