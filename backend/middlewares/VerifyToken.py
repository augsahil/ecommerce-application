
from fastapi import Request,HTTPException
import jwt 
from config.Env import ENVConfig
def verifyToken(req:Request):
    authorization =  req.headers.get("Authorization","")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401,"Please Login First")

    token = authorization.split(" ")[1]
    if not token :
        raise HTTPException(401,"Please Provide Valid Token")

    try:
        payload = jwt.decode(token,ENVConfig.JWT_AUTH_SCREATE,algorithms=[ENVConfig.ALOGITHMS])
        return payload['user_id']
    except Exception as e:
        raise HTTPException(401,f"{e}")
 


    
