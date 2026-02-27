from services.authService import registerService
from models.authModel import RegisterUser

async def registerController(data: RegisterUser):
    return await registerService(data)