from config.db import user_collection,profile_collection,cart_collection,product_collection,orders_collection,wishlist_collection
from models import authModel 
from fastapi.exceptions import HTTPException
from fastapi import UploadFile,File
import bcrypt
import jwt
from config.Env import ENVConfig
from datetime import datetime,timedelta
from typing  import Annotated
import bson
# from config.cloudinaryConfig import 
import config.cloudinaryConfig
import cloudinary.uploader

async def registerService(data:authModel.RegisterUser):
    check_exist = await user_collection.find_one({"email":data.email.lower()})
    print(check_exist)
    if check_exist:
        raise HTTPException(status_code=400,detail="User Alrady Exist")
    
    salt = bcrypt.gensalt()
    # print(salt)
    hash_string = bcrypt.hashpw(data.password.encode(),salt).decode()
    user_data = data.dict()
    user_data['password']=hash_string
    del user_data['name']
    doc= await user_collection.insert_one(user_data)
    # profile 

    user_p = authModel.UserProfile(user_id=str(doc.inserted_id), name=data.name )

    await profile_collection.insert_one(user_p.dict())
    # token 
    token = jwt.encode({
        "user_id":str(doc.inserted_id),
        "exp":datetime.utcnow()+timedelta(days=10),
        "iat":datetime.utcnow()
    },ENVConfig.JWT_AUTH_SCREATE,algorithm="HS256")


    return {
        "msg":"Register Success",
        "token":token
    }

async def loginService(data:authModel.LoginUser):
    check_exist = await user_collection.find_one({"email":data.email.lower()})
    print(check_exist)
    if not check_exist:
        raise HTTPException(status_code=400,detail="User Not Exist")
    
    is_match = bcrypt.checkpw(data.password.encode(),check_exist['password'].encode())
    if not is_match:
        raise HTTPException(status_code=400,detail="Invalid Credentials")
    
    token = jwt.encode({
        "user_id":str(check_exist['_id']),
        "exp":datetime.utcnow()+timedelta(days=10),
        "iat":datetime.utcnow()
    },ENVConfig.JWT_AUTH_SCREATE,algorithm="HS256")
    return {
        "msg":"Login Success",
        "token":token

    }


async def profileService(userId:str):
    check_exist = await user_collection.find_one({"_id":bson.ObjectId(userId)},{
        "password":0
    })
    if not check_exist:
        raise HTTPException(status_code=404,detail="User Details Not Found")
    # del check_exist['password']
    check_exist['_id'] = str(check_exist['_id'])
    profile = await profile_collection.find_one({"user_id":check_exist['_id']})

    del profile['_id']
    del profile['user_id']
    if(profile['avatar']):
        profile['avatar'] = profile['avatar']['image_uri']


    profile['cart_length'] = await cart_collection.count_documents({"user_id":userId,"is_purchased":False})
    profile['orders_length'] = await orders_collection.count_documents({"userId":userId})
    profile['products_length'] = await product_collection.count_documents({"user.user_id":userId})
    profile['wishlist_length'] = await wishlist_collection.count_documents({"user_id":userId})

    return check_exist | profile  
    

async def updateAvatarService(avatar:Annotated[UploadFile,File()],userId:str):
    exist= await profile_collection.find_one({"user_id":userId})
    if exist['avatar'] and exist['avatar']['image_uri']:
        cloudinary.uploader.destroy(exist['avatar']['public_id'])

    contents = await avatar.read()
    upload_result = cloudinary.uploader.upload(contents, folder="ecom_user_profile")

    await profile_collection.find_one_and_update({"user_id":userId},{
        "$set":{
            "avatar":{
                "image_uri":upload_result['secure_url'],
                "public_id":upload_result['public_id']
            },
            "update_at":datetime.now()
        }
    })
    return {
       "msg":"Avatar Updated Success"
    }
    

async def UpdateBasicDetailsService(data:authModel.UpdateBasicDetails,userId:str):
    check_exist = await profile_collection.find_one_and_update({"user_id":userId},{
        "$set":{
            "name":data.name,
         "update_at":datetime.now()
        }
    })
    if not check_exist:
        raise HTTPException(status_code=404,detail="User Details Not Found")

    return {
       "msg":"Details Updated Success"
    }
    
async def AddNewAddressService(data:authModel.AddressModel,userId:str):
    check_exist = await profile_collection.find_one({"user_id":userId})
    if not check_exist:
        raise HTTPException(status_code=404,detail="User Details Not Found")
    
    id = bson.ObjectId()
    data = data.dict()
    data['_id'] = str(id)

    await profile_collection.find_one_and_update({"user_id":userId},{
    
      
                "$push":{
                "address":data
            },
                 "$set":{
             "update_at":datetime.now()
           }
        
    })

    return {
        "msg":"New Address Added Successfully"
    }


async def deleteAddressService(id:str,userId:str):
    check_exist = await profile_collection.find_one({"user_id":userId})
    if not check_exist:
        raise HTTPException(status_code=404,detail="User Details Not Found")
    
    await profile_collection.find_one_and_update({"user_id":userId},{
    
      
                "$pull":{
                "address":{
                    "_id":id
                }
            },
                 "$set":{
             "update_at":datetime.now()
           }
        
    })

    return {
        "msg":"New Address Added Successfully"
    }