# app/core/config.py

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str
    PROMPTPILOT_API_KEY: str

    SUPABASE_URL: str   # <-- Add this line
    SUPABASE_KEY: str   # <-- Add this line

    # This is the modern Pydantic V2 way of configuring settings
    # We explicitly tell it to ignore any extra variables it might find
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()