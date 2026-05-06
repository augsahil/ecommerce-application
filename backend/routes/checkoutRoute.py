from fastapi import APIRouter,Depends,Form
from controllers import checkoutController
from models import checkoutModel,authModel
from middlewares.VerifyUser import ValidateUser
router = APIRouter(prefix="/api/v1",tags=['checkout'])


@router.post("/checkout")
async def makeCheckout(data:checkoutModel.MakeCheckout,userId:str =Depends(ValidateUser(authModel.RolesEnum.buyer)) ):
    return await checkoutController.makeCheckout(data,userId) 


@router.post("/checkout/callback")
async def checkoutCallbackView(

    razorpay_order_id:str=Form(...),
    razorpay_payment_id:str=Form(...),
    razorpay_signature:str=Form(...),
):
    checkout = checkoutModel.CallBackData(razorpay_order_id=razorpay_order_id,razorpay_signature=razorpay_signature,razorpay_payment_id=razorpay_payment_id)
    return await checkoutController.checkoutCallbackController(checkout) 

