from fastapi import APIRouter,Depends
from controllers import wishListController
from middlewares.VerifyUser import ValidateUser
from models import wishlistModel,authModel
router  = APIRouter(prefix="/api/v1/wishlist",tags=["WishList"])

@router.post("/toggle")
async def toggleProductView(data:wishlistModel.ToggleProduct,user_id:str =Depends(ValidateUser(authModel.RolesEnum.buyer)) ):
    return await wishListController.toggleProductController(data.product_id,user_id)

@router.get("/get")
async def getProductsView(user_id:str =Depends(ValidateUser(authModel.RolesEnum.buyer)) ):
    return await wishListController.getProductsController(user_id)



@router.get("/get/{product_id}")
async def toggleProductView(product_id:str,user_id:str =Depends(ValidateUser(authModel.RolesEnum.buyer)) ):
    return await wishListController.getProductController(product_id,user_id)



@router.delete("/delete/{product_id}")
async def deleteProductView(product_id:str,user_id:str =Depends(ValidateUser(authModel.RolesEnum.buyer)) ):
    return await wishListController.deleteProductController(product_id,user_id)