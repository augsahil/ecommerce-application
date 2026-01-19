from fastapi import FastAPI

from routes.authRoute import router as AuthRouter

app = FastAPI()

# Routes
app.include_router(AuthRouter)

@app.get("/")
async def read_root():
    return {"Hello": "World"}