# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import prompt as prompt_api
from app.api.v1 import auth as auth_api
from app.api.v1 import library as library_api

app = FastAPI(title=settings.APP_NAME)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prompt_api.router, prefix="/api/v1", tags=["Prompt Generation"])
app.include_router(auth_api.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(library_api.router, prefix="/api/v1", tags=["Library"])

@app.get("/")
def read_root():
    # Corrected line: APP_-NAME is now APP_NAME
    return {"message": f"Welcome to the {settings.APP_NAME} API"}