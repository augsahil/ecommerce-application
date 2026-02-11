from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.authRoute import router as AuthRouter

app = FastAPI()

# CORS Middleware

app.add_middleware(
    CORSMiddleware,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Routes
app.include_router(AuthRouter)

@app.get("/")
async def read_root():
    return {"Hello": "World"}
