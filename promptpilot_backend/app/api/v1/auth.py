# app/api/v1/auth.py

from fastapi import APIRouter, HTTPException, Depends
from app.core.supabase_client import supabase
from app.schemas.user import UserCreate, UserResponse, UserLogin, TokenResponse, UserProfileResponse 
from app.api.v1.dependencies import get_current_user 

router = APIRouter()

@router.post("/signup", response_model=UserResponse, status_code=201)
def sign_up(user_credentials: UserCreate):
    """
    Handles user sign-up. Creates a new user in Supabase with a username.
    """
    try:
        res = supabase.auth.sign_up({
            "email": user_credentials.email,
            "password": user_credentials.password,
            "options": {
                "data": {
                    'username': user_credentials.username
                }
            }
        })

        if res.user:
            return res.user
        else:
            raise HTTPException(status_code=400, detail="Could not create user.")

    except Exception as e:
        # --- ADD THIS LINE FOR DEBUGGING ---
        print(f"--- SUPABASE SIGNUP ERROR: {e} ---")

        raise HTTPException(status_code=400, detail=str(e))


# New Login endpoint
@router.post("/login", response_model=TokenResponse)
def sign_in(user_credentials: UserLogin):
    """
    Handles user login with either email or username.
    """
    email_to_use = user_credentials.email

    # Check if the input looks like an email. If not, assume it's a username.
    if '@' not in email_to_use:
        try:
            # Look up the user's email from their username in the profiles table
            profile_res = supabase.table('profiles').select('email').eq('username', email_to_use).single().execute()
            if not profile_res.data:
                raise HTTPException(status_code=400, detail="Invalid login credentials")
            email_to_use = profile_res.data['email']
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid login credentials")

    # Proceed with the login using the determined email
    try:
        res = supabase.auth.sign_in_with_password({
            "email": email_to_use,
            "password": user_credentials.password
        })
        
        if res.session:
            return {"access_token": res.session.access_token}
        else:
            raise HTTPException(status_code=400, detail="Login failed.")

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid login credentials")
    

@router.get("/users/me", response_model=UserProfileResponse) # Use the new response model
def read_users_me(current_user_profile: list = Depends(get_current_user)):
    """
    Fetch the profile of the currently authenticated user.
    """
    user_data = current_user_profile[0]
    # Return using the new, correct model
    return UserProfileResponse(**user_data)