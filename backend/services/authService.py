from config.db import users_collection

def registerService(data):
    doc = users_collection.insert_one(data.dict())
    print("Inserted document id:", doc)
    
    return data