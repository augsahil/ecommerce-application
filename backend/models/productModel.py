from pydantic import BaseModel,Field

from enum import Enum
from typing import Optional
from datetime import datetime
class ProdudctCategory(str,Enum):
    JWELLERY   =   'JWELLERY'
    TSHIRT   =   'TSHIRT'
    PICTURES   =   'PICTURES'
    PAJAMA   =   'PAJAMA'
    SAREE   =   'SAREE'

class Product(BaseModel):
    title:str =Field(...)
    description:str = Field(...)
    price:int = Field(...)
    category:Optional[ProdudctCategory] = Field(...) 
    created_at:datetime =  Field(default_factory=datetime.now)
    updated_at:datetime =  Field(default_factory=datetime.now)