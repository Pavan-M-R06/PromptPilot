# app/api/v1/prompt.py
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.prompt import PromptRequest, PromptResponse
from app.services.dcare_service import DCARE_Engine
from app.services.llm_service import generate_with_fallback
from app.api.v1.dependencies import get_current_user
from app.core.supabase_client import supabase
from app.core.config import settings

router = APIRouter()
dcare_engine = DCARE_Engine()

@router.post("/generate", response_model=PromptResponse)
def generate_master_prompt(request: PromptRequest, current_user_profile: list = Depends(get_current_user)):
    user_profile = current_user_profile[0]
    user_id = user_profile['id']
    credits_remaining = user_profile['credits_remaining']

    if credits_remaining <= 0:
        raise HTTPException(status_code=402, detail="You have no credits remaining.")

    # --- D-CARE PROCESSING ---
    dcare_result = dcare_engine.process(request)
    engineered_prompt = dcare_result["engineered_prompt"]
    persona = dcare_result["persona"]
    
    # --- API KEY LOGIC ---
    api_key_to_use = request.api_key if request.api_key else settings.PROMPTPILOT_API_KEY
    
    # --- LLM CALL ---
    final_prompt = generate_with_fallback(dcare_output=engineered_prompt, api_key=api_key_to_use)

    # If the user requested JSON output, try to parse the returned text as JSON
    # and extract the `master_prompt` key if present. This accommodates LLMs
    # that return a JSON object like {"master_prompt": "..."}.
    if request.mode == "json" and final_prompt is not None:
        try:
            import json as _json
            parsed = _json.loads(final_prompt)
            if isinstance(parsed, dict) and 'master_prompt' in parsed:
                final_prompt = parsed['master_prompt']
        except Exception:
            # If parsing fails, leave final_prompt as-is (could already be the master prompt)
            pass

    # --- OFFLINE FALLBACK LOGIC ---
    if final_prompt is None:
        final_prompt = dcare_engine._generate_offline_prompt(request, persona)

    # --- DECREMENT CREDITS ---
    try:
        new_balance = credits_remaining - 1
        update_response = supabase.table('profiles').update({'credits_remaining': new_balance}).eq('id', user_id).execute()
        if not update_response.data:
            print(f"--- CRITICAL: Failed to decrement credits for user {user_id}. RLS may be blocking the update. ---")
        else:
            print(f"--- Successfully decremented credits for user {user_id}. New balance: {new_balance} ---")
    except Exception as e:
        print(f"--- CRITICAL: An exception occurred while decrementing credits. Error: {e} ---")
    
    return PromptResponse(master_prompt=final_prompt)