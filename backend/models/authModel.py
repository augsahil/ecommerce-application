from pydantic import BaseModel, Field, EmailStr, field_validator
from datetime import datetime, timezone
from typing import Union, Optional
from enum import Enum

class RolesEnum(str, Enum):
    seller = "seller" 
    buyer = "buyer"

class User(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    email: EmailStr = Field(..., min_length=6, max_length=100)
    password: str = Field(..., min_length=6, max_length=100)
    role: Optional[RolesEnum] = Field(default=RolesEnum.buyer)
    create_at: datetime = Field(default_factory=lambda : datetime.now(timezone.utc))
    update_at: datetime = Field(default_factory=lambda : datetime.now(timezone.utc), set_column_kwargs={"onupdate": datetime.now(timezone.utc)})
    
    # @field_validator('name')
    # def validate_name(cls, v):