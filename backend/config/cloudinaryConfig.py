import cloudinary 
from config.Env import ENVConfig

cloudinary.config(
  cloud_name = ENVConfig.CLOUD_NAME_CLOUDINARY, 
  api_key = ENVConfig.API_KEY_CLOUDINARY, 
  api_secret =ENVConfig.API_SCREATE_CLOUDINARY
)