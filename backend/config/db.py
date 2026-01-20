from config.Env import ENVConfig
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(ENVConfig.MONGO_URI)
db = client[ENVConfig.MONGO_DB]

# users collection
users_collection = db.get_collection("users")