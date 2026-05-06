from fastapi import APIRouter,Depends
from middlewares.VerifyUser import ValidateUser
from controllers import ordersController
from models.authModel import RolesEnum

router = APIRouter(prefix="/api/v1/orders",tags=['orders'])

@router.get("/")
async def getAllOrdersView(userId= Depends(ValidateUser(RolesEnum.buyer))):
    return  await ordersController.getAllOrdersController(userId)