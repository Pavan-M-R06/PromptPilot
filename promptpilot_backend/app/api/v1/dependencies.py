# app/api/v1/dependencies.py

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.supabase_client import supabase

bearer_scheme = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """
    Dependency that validates the token and fetches the user's profile
    from the 'profiles' table.
    """
    token = credentials.credentials
    try:
        # Step 1: Validate token and get the user object
        user_response = supabase.auth.get_user(token)
        user = user_response.user
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user token")

        # Step 2: Use the user's ID to fetch their profile from our 'profiles' table
        profile_response = supabase.table('profiles').select('*').eq('id', user.id).execute()

        # Step 3: Check if the profile exists and return it
        if not profile_response.data:
             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile not found")
        
        # This now correctly returns the profile data (which is a list)
        return profile_response.data
    
    except Exception as e:
        # This will catch Supabase errors (like invalid token) and other issues
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {e}",
        )