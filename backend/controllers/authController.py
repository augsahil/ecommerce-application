from services.authService import registerService

async def registerController(data):
    return await registerService(data)