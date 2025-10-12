# app/core/supabase_client.py

from supabase import create_client, Client
from app.core.config import settings

# Create a single, reusable Supabase client instance
supabase: Client = create_client(
    settings.SUPABASE_URL, 
    settings.SUPABASE_KEY
)