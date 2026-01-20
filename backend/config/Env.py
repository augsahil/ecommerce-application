from dotenv import load_dotenv
import os

load_dotenv()

class ENVConfig:
    MONGO_URI = os.getenv("MONGO_URI", "")
    MONGO_DB = os.getenv("MONGO_DB", "")
    