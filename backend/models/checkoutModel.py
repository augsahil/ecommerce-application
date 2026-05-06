from pydantic import BaseModel,Field
from typing import List,Optional
from datetime import datetime
from enum import Enum
class MakeCheckout(BaseModel):
    phone_no:str 
    address:str

class OrdersEnum(str,Enum):
    pending="pending"
    shipped="shipped"
    delivered="delivered"
    cancel="cancel" 

class AddOrder(BaseModel): 
    userId:str= Field(...)
    products:List[str]= Field(...)
    order_id:str = Field(...)
    amount:int= Field(...)
    razorpay_order_id:str = Field(default='')
    razorpay_payment_id:str = Field(default='')
    razorpay_signature:str = Field(default='')
    status :Optional[OrdersEnum]= Field(default=OrdersEnum.pending)
    created_at:datetime = Field(default_factory=datetime.now)
    updated_at:datetime = Field(default_factory=datetime.now)


class CallBackData(BaseModel):
    razorpay_order_id:str = Field(default='')
    razorpay_payment_id:str = Field(default='')
    razorpay_signature:str = Field(default='')