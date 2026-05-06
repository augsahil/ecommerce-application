from config.Env import ENVConfig

from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(ENVConfig.MONGO_URI)
db = client[ENVConfig.MONGO_DB]


#  User Collection
user_collection = db['users']
profile_collection = db['profile']
product_collection = db['products']
wishlist_collection = db['wishlist']
cart_collection = db['cart']
orders_collection = db['orders']