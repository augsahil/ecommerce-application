from models import productModel
from config.db import product_collection
from random import choice
from fastapi import status, HTTPException
async def getAllProductsService():
    products = []

    async for product in  product_collection.find({},{
        "_id":0,
        "description":0,
        "user":0,
        "updated_at":0,
        "created_at":0
    }):
        product['image'] = choice(product['images'])['image_url']
        del product['images']

        products.append(product)

    return products

async def getProductBySlugService(slug):

    product =  await product_collection.find_one({
        "slug":{
            "$regex":slug,
            '$options': 'i'
        }
    },{
      
        "updated_at":0,

    })
    if not product:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"Product Not Found")
    if '_id' in product:
        product ['_id'] = str(product['_id'])
    if '_id' in product['user']:
        del product['user']['_id']  
    if 'user_id' in product['user']:
        del product['user']['user_id']  
    # if product ['_id']:
    #     product ['_id'] = str(product['_id'])
    # if product['user']['_id']:
    #     del product['user']['_id'] 
    # elif product['user']['user_id']:
    #     del product['user']['user_id']
    
    product['image'] = choice(product['images'])['image_url']
    del product['images'] 

    return product



