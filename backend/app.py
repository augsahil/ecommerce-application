from fastapi import Request, Request, Request, FastAPI,status
from routes.authRoute import router as AuthRouter
from routes.productRoute import router as ProductRouter
from routes.publicRoute import router as PublicRouter
from routes.wishListRoute import router as WishListRouter
from routes.cartRoute import router as CartRouter
from routes.checkoutRoute import router as CheckOutRouter
from routes.ordersRoute import router as OrderRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
# fastapi instance

app = FastAPI()



@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    error_messages = []
    for error in exc.errors():
        field = ".".join(map(str, error["loc"]))
        message = error["msg"]
        error_messages.append(f"Error in '{field}': {message}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": error_messages[0]},
    )

# CORS ERROR

app.add_middleware(CORSMiddleware, allow_headers=["*"],
    allow_methods=['GET','POST','PUT','PATCH','DELETE'],
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
        "*"
    ],
    allow_credentials=True)

# Routes
app.include_router(AuthRouter)
app.include_router(ProductRouter)
app.include_router(PublicRouter)
app.include_router(WishListRouter)
app.include_router(CartRouter)
app.include_router(CheckOutRouter)
app.include_router(OrderRouter)

@app.get("/",tags=['health'])
def healthRoute():
    return {
        "msg":"Server is Working Correctly"
    }