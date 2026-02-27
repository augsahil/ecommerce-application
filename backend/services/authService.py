from config.db import users_collection
from models.authModel import RegisterUser
from fastapi import HTTPException
import bcrypt

async def registerService(data: RegisterUser):
    check_exist = await users_collection.find_one({"email": data.email.lower()})

    if check_exist:
        raise HTTPException(status_code=400, detail="User already exists on this email")

    salt = bcrypt.gensalt()
    hash_string = bcrypt.hashpw(data.password.encode(), salt).decode()
    user_data = data.dict()
    user_data['password'] = hash_string

    #token

    await users_collection.insert_one(user_data)
    
    return {
        "message": "User registered successfully",
        "token": ""   
    }