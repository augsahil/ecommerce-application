from fastapi import APIRouter,UploadFile,File,Depends,HTTPException,status,Form
from controllers import productController
from models import productModel,authModel
from typing import List,Annotated
from middlewares.VerifyUser import ValidateUser

router = APIRouter(prefix="/api/v1/product",tags=['Seller Product'])



@router.get("/all-products")
async def allProductsView(userId:str =Depends( ValidateUser(authModel.RolesEnum.seller))):
    return await productController.allProductsController(userId)


@router.delete("/delete/{id}")
async def deleteProductView(id:str,userId:str=Depends( ValidateUser(authModel.RolesEnum.seller))):
    return await productController.deleteProductController(id,userId)


@router.post("/add-product")
async def addProductView(images:Annotated[List[UploadFile],File()],
                   title: str = Form(...),
                   description: str = Form(...),
                   category: str = Form(...),
                   price: int = Form(...), 
                   userId:str =Depends( ValidateUser(authModel.RolesEnum.seller))):
    if not images:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one image is required."
        )
    try:
        data = productModel.Product(title=title,description=description,category=category,price=price)
        productModel.Product.model_validate(data)
        print("model to validate ho gya")
        return await productController.addProductController(images,data,userId)
    except Exception as e:
        # print(f"Product data validation failed: {e}")
        raise HTTPException(status.HTTP_400_BAD_REQUEST,f"{e}")
    