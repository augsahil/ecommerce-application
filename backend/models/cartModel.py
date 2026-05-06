from pydantic import BaseModel ,Field
from datetime import datetime

from enum import Enum

class AddNewProduct(BaseModel):
    product_id:str 

class AddProduct(BaseModel):
    product_id:str= Field(...)
    user_id:str = Field(...)
    qty:int = Field(default=1) 
    is_purchased:bool =  Field(default=False)
    created_at : datetime = Field(default_factory  = datetime.now)
    updated_at : datetime = Field(default_factory= datetime.now)

class CartOperations (str,Enum):
    increment = "increment"
    decrement = "decrement"
    delete = "delete"