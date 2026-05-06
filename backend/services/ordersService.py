from fastapi import HTTPException
from config.db import  orders_collection,cart_collection,product_collection
import bson
from random import choice
async def getAllOrdersService(userId):

    all_orders = []

    async for order in orders_collection.find({"userId":userId}):
        order_detail = {
            "id":order['order_id'],
            "success": True if order['razorpay_payment_id'] else False,
            "amount":order['amount'],
            "created_at":order['created_at'],
            "status":order['status'],
            "product":[]
        }

        for cart_product in order['products'] :
            cart_product_details =  await cart_collection.find_one({"_id": bson.ObjectId(cart_product) })
            product = await product_collection.find_one({"_id":bson.ObjectId(cart_product_details['product_id'])})

            item_doc={
                "title":product['title'],
                "image":choice(product['images'])['image_url'],
                "qty":cart_product_details['qty']
                
            }
            order_detail['product'].append(item_doc)
        
        all_orders.append(order_detail)
        


    return all_orders