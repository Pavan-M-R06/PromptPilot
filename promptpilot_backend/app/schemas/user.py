# app/schemas/user.py

from pydantic import BaseModel, EmailStr
from datetime import datetime
import uuid


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str # New field for username

# Schema for the data we expect from a user during login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for the data we will send back after a user is created
class UserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True # Helps Pydantic work with object-like data

# This schema matches our 'profiles' table in the database
class UserProfileResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    credits_remaining: int

    class Config:
        from_attributes = True

# Schema for the response we send back after a successful login
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"