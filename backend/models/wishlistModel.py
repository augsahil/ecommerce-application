from pydantic import BaseModel,Field
from datetime import datetime
class ToggleProduct(BaseModel):
    product_id: str= Field(...)


class AddProduct(BaseModel):
    product_id:str = Field(...)
    user_id:str = Field(...)
    created_at:datetime = Field(default_factory=datetime.now)
    updated_at:datetime = Field(default_factory=datetime.now)