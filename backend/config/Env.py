from dotenv import load_dotenv
import os
load_dotenv()
class ENVConfig:
    
    MONGO_URI = os.getenv("MONGO_URI","")
    MONGO_DB = os.getenv("MONGO_DB","")
    JWT_AUTH_SCREATE = os.getenv("JWT_AUTH_SCREATE","#$%^&*()")
    ALOGITHMS="HS256"
    API_KEY_CLOUDINARY= os.getenv("API_KEY_CLOUDINARY","")
    API_SCREATE_CLOUDINARY= os.getenv("API_SCREATE_CLOUDINARY","")
    CLOUD_NAME_CLOUDINARY= os.getenv("CLOUD_NAME_CLOUDINARY","")
    RAZORPAY_KEY_ID= os.getenv("RAZORPAY_KEY_ID","")
    RAZORPAY_KEY_SCREATE= os.getenv("RAZORPAY_KEY_SCREATE","")
    FRONTEND_URI= os.getenv("FRONTEND_URI","")
    
    