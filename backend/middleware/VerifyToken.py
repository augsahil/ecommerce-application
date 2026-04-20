from fastapi import Request, HTTPException
import jwt
from config.Env import ENVConfig

def verifyToken(req: Request):
    authourization = req.headers.get("Authorization", "")
    if not authourization or not authourization.startswith("Bearer "):
        raise HTTPException(401, "Please login first")
    
    token = authourization.split(" ")[1]
    if not token:
        raise HTTPException(401, "Please provide valid token")

    try:
        payload = jwt.decode(token, ENVConfig.JWT_AUTH_SECRET, algorithms=ENVConfig.ALGORITHM)
        return payload["user_id"]
    except Exception as e:
        raise HTTPException(401, f"Invalid token: {str(e)}")