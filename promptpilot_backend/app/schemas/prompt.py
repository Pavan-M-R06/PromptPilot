# app/schemas/prompt.py

from pydantic import BaseModel
from typing import Literal, Optional

# This defines the structure of the data we expect from the user
class PromptRequest(BaseModel):
    """
    The request model for the /generate endpoint.
    """
    user_prompt: str
    mode: Literal["sniper", "titan", "json"] # Restricts the 'mode' to only these two values
    api_key: Optional[str] = None

# This defines the structure of the data we will send back to the user
class PromptResponse(BaseModel):
    """
    The response model for the /generate endpoint.
    """
    master_prompt: str