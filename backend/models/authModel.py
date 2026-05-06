from pydantic import BaseModel,Field,EmailStr,field_validator
from enum import Enum
# from typing import E
from datetime import datetime, timezone
from typing import Union,Optional,List


class RolesEnum(str,Enum):
    seller = "seller"
    buyer = "buyer"

class ProfileImage(BaseModel):
    image_uri:str
    public_id:str


class User(BaseModel):
    name:str  = Field(...)
    email:EmailStr  = Field(...)
    password:str = Field(...,min_length=6)
    role:Optional[RolesEnum] = Field(default = RolesEnum.buyer)
    created_at :datetime =  Field(default_factory=datetime.now)
    update_at :datetime =  Field(default_factory=datetime.now)

class AddressModel(BaseModel):
    city:str
    country:str 
    state:str 
    pin_code:str  
    landmark:str 



class UserProfile(BaseModel):
    user_id:str = Field(...)
    name:str  = Field(...)
    avatar:Optional[ProfileImage] = None 
    address:List[AddressModel] = []
    created_at :datetime =  Field(default_factory=datetime.now)
    update_at :datetime =  Field(default_factory=datetime.now)


    @field_validator('name')
    def validate_name(cls,value):
        if len(value)<3:
            raise ValueError("Name must be grater than 3 characters")
        return value
    

class RegisterUser(User):
    pass



class UpdateBasicDetails(BaseModel):
    name : str =Field(...)
    

class LoginUser(BaseModel):
    email:EmailStr  = Field(...)
    password:str = Field(...,min_length=6)