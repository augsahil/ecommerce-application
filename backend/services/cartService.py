from fastapi import HTTPException,status
from config.db import cart_collection,product_collection,user_collection
from models import cartModel
import bson
from random import choice
from functools import reduce

async def addProductService(product_id,userId):
    check_exist = await cart_collection.find_one({"product_id":product_id,"user_id":userId,"is_purchased":False})
    if check_exist:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"Product Already Exist in Cart")

    product = cartModel.AddProduct(
        product_id=product_id,
        user_id=userId
    )
    await cart_collection.insert_one(product.dict())
    return {
        "msg":"Product Added Into Cart Successfully"
    }

async def getProductService(product_id,userId):
    check_exist = await cart_collection.find_one({"product_id":product_id,"user_id":userId,"is_purchased":False})
    if not check_exist:
        return {
            "qty":0
        }
    if 'qty' not in check_exist: 
        return {
            "qty":0
        }

    return {
        "qty":check_exist['qty']
    }

async def cartOperationService(product_id:str,operation:cartModel.CartOperations,userId:str):
    
    check_exist = await cart_collection.find_one({"product_id":product_id,"user_id":userId,"is_purchased":False})
    if not check_exist:
       raise HTTPException(status.HTTP_400_BAD_REQUEST,"Product Not Found")

    match operation:
        case cartModel.CartOperations.increment:

            await cart_collection.find_one_and_update({"product_id":product_id,"user_id":userId,"is_purchased":False},{
                "$set":{
                    'qty': check_exist['qty']+1
                }
            })



            return {
                "msg":"Product Quantity Increased"
            }
        case cartModel.CartOperations.decrement:
            if(check_exist['qty']==1):
                await cart_collection.find_one_and_delete({"product_id":product_id,"user_id":userId,"is_purchased":False})
                return {
                    "msg":"Product Removed From Cart"
                }
            await cart_collection.find_one_and_update({"product_id":product_id,"user_id":userId,"is_purchased":False},{
                "$set":{
                    'qty': check_exist['qty']-1
                }
            })

            return {
                "msg":"Product Quantity Decreased"
            }
        case cartModel.CartOperations.delete:
            await cart_collection.find_one_and_delete({"product_id":product_id,"user_id":userId,"is_purchased":False})
                
            return {
                "msg":"Product Removed From Cart"
            }
        case _:
            raise HTTPException(status.HTTP_400_BAD_REQUEST,"Operation Not Permit")



async def getProductsService(userId:str):
    all_products = []

    async for  cart_product in cart_collection.find({"is_purchased":False,"user_id":userId}):
        # products
        product = await product_collection.find_one({"_id":bson.ObjectId(cart_product['product_id'])})

        data = {
            "_id":cart_product['product_id'],
            "title":product['title'],
            "price":product['price'],
            "total_price":product['price']*cart_product['qty'],
            "category":product['category'],
            "qty":cart_product['qty'],
            "image": choice(product['images'])['image_url']
        }
        all_products.append(data)
        
    # total_price = 0
    # if len(all_products)>1:
    #     total_price = reduce(lambda ac,pre: ac+ pre['price'] ,all_products,0)
    # else:
    #     total_price = all_products[0]['price']
    
    total_price = sum(product['total_price'] for product in all_products )


    return {
        "products":all_products,
        "total":total_price
    }