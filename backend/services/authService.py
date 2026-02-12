from config.db import users_collection

async def registerService(data):
    await users_collection.insert_one(data.dict())
    
    return {"message": "User registered successfully"}