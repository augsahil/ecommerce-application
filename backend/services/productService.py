import config.cloudinaryConfig
import cloudinary.uploader
from fastapi import status, HTTPException
from slugify import slugify
from config.db import  profile_collection,product_collection
import bson
import uuid 


async def allProductsService(userId:str):

    all_products = []
    async for product in product_collection.find({"user.user_id":userId}):
        all_products.append({
            "title": product['title'],
            "category": product['category'],
            "slug": product['slug'],
            "_id": str(product['_id']),
            "created_at":product['created_at'],
            "image":product['images'][0]['image_url'],
        })
    return all_products
    pass


async def deleteProductService(id,userId):
    product = await product_collection.find_one_and_delete({"_id":bson.ObjectId(id),"user.user_id":userId})
    if not product:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"Product Not Found")
    
    # delete all images first
    # images = product['images'] 
    for image in product['images']:
        cloudinary.uploader.destroy(image['public_id'])
    

    return {
        "msg":"Product Delete Success"
    }
    pass

async def addProductService(images,data,userId):

    upload_images = []

    for image in images:
        content = await image.read()
        result = cloudinary.uploader.upload(content)
        upload_images.append({
            "image_url":result['secure_url'],
            "public_id":result['public_id']
        })
    data = data.dict()
    # slug field
    data['slug'] =slugify(data['title']+"----"+ str(uuid.uuid4()))

    user =await profile_collection.find_one({"user_id": userId },{
        "name":1,
        "user_id":1,
        "_id":0
    })
    await product_collection.insert_one(data | {"images":upload_images} | {"user":user})

    return {
        "msg":"Product Added Succesfully"
    }
    pass