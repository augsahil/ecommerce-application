from models import checkoutModel
import bson
from config.db import user_collection,profile_collection,cart_collection,product_collection,orders_collection
from config.Env import ENVConfig
from config.razorpayConfig import RazorPayClient 
from fastapi.responses import RedirectResponse
from random import randint
from datetime import datetime
async def makeCheckout(data:checkoutModel.MakeCheckout,userId:str):
    # user information
    data= data.dict()
    data['products'] = []
    data['total_payable_amount'] = 0
    data['user_id'] = userId
    user = await user_collection.find_one({"_id":bson.ObjectId(userId)})
    if user:
        data['email'] = user['email']
    profile = await profile_collection.find_one({"user_id":userId})
    if profile:
        data['name'] = profile['name']
        address =  next((item for item in profile['address'] if item['_id'] == data['address']), None)
        if address:
            del address['_id']
            data['address']=address
            

    async for cart_product in cart_collection.find({
     "is_purchased":False,"user_id":userId
    }):
        product = await product_collection.find_one({"_id": bson.ObjectId(cart_product['product_id'])})
        data['total_payable_amount']+=  cart_product['qty']*product['price']
        data['products'].append(str(cart_product['_id']))

        order_details = {
        "amount": data['total_payable_amount']*100,  # amount in paise
        "currency": "INR",
        "receipt": f"ECOMFARM{randint(1111,9999)}",
        "payment_capture": 1,
    }
    order=RazorPayClient.order.create(order_details)


    order_data = checkoutModel.AddOrder(

        amount=data['total_payable_amount'],
        order_id=order_details['receipt'],
        products=data['products'],
        userId=userId,
        razorpay_order_id=order['id']
    )
    

    await orders_collection.insert_one(data['address'] | order_data.dict())

    return order



async def checkoutCallbackService(data:checkoutModel.CallBackData):

    result = RazorPayClient.utility.verify_payment_signature({
'razorpay_order_id': data.razorpay_order_id,
'razorpay_payment_id': data.razorpay_payment_id,
'razorpay_signature': data.razorpay_signature
})
    if not  result:
        RedirectResponse(url=f"{ENVConfig.FRONTEND_URI}/checkout/failed",status_code=302)
        return 
    order_data = await orders_collection.find_one_and_update({"razorpay_order_id":data.razorpay_order_id},{
        "$set":{
            'razorpay_payment_id': data.razorpay_payment_id,
            'razorpay_signature': data.razorpay_signature,
            "updated_at":datetime.now()
        }
    })

    for product in order_data['products']:
        await cart_collection.find_one_and_update({"_id": bson.ObjectId(product) },{
            "$set":{
                "is_purchased":True
            }
        })
        
    return RedirectResponse(url=f"{ENVConfig.FRONTEND_URI}/checkout/success",status_code=302)