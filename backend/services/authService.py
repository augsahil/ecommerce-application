from config.db import users_collection
from models.authModel import LoginUser, RegisterUser
from fastapi import HTTPException
import bcrypt
import jwt
from datetime import datetime, timedelta
from config.Env import ENVConfig

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

async def loginService(data: LoginUser):
    user = await users_collection.find_one({"email": data.email.lower()})
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not bcrypt.checkpw(data.password.encode(), user['password'].encode()):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Generate token here (e.g., JWT)
    token = jwt.encode({
        "user_id": str(user["_id"]),
        "exp": datetime.utcnow() + timedelta(days=10)
        }, 
        ENVConfig.JWT_AUTH_SECRET,
        algorithm="HS256")

    return {
        "message": "Login successful",
        "token": token
    }