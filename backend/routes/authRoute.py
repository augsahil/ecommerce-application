from fastapi import APIRouter,Request,Depends,UploadFile,File
from controllers import authController
from typing import Any , Annotated
from models import authModel 
from middlewares.VerifyToken import verifyToken

# from 

router = APIRouter(prefix="/api/v1/auth",tags=['auth'])

'''
GET -> collection the data {JSON,HTML/text}
POST
PUT/PATCH
Delete
'''

# register
@router.post("/register")
async def registerView(data:authModel.RegisterUser):
    return await authController.registerController(data)

@router.post("/login")
async def loginView(data:authModel.LoginUser):
    return await authController.loginController(data)


@router.get("/profile")
async def profileView(userId = Depends(verifyToken)):
    return await authController.profileController(userId)


@router.put("/update-avatar")
async def updateAvatar(avatar:Annotated[UploadFile,File()],userId = Depends(verifyToken)):
    return await authController.updateAvatarController(avatar,userId)


@router.put("/update-basic-details")
async def UpdateBasicDetails(data:authModel.UpdateBasicDetails,userId = Depends(verifyToken)):
    return  await authController.UpdateBasicDetailsController(data,userId)



@router.post("/add-address")
async def AddNewAddress(data:authModel.AddressModel,userId = Depends(verifyToken)):
    return  await authController.AddNewAddressController(data,userId)




@router.delete("/delete-address/{id}")
async def deleteAddress(id:str,userId = Depends(verifyToken)):
    return  await authController.deleteAddressController(id,userId)