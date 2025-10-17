from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from app.api.v1.dependencies import get_current_user
from app.core.supabase_client import supabase

router = APIRouter()


class PromptCreate(BaseModel):
    name: str
    original_prompt: Optional[str] = None
    generated_prompt: Optional[str] = None
    mode: Optional[str] = None
    category: Optional[str] = None


class PromptUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None


@router.get("/library")
def get_library(current_user_profile: list = Depends(get_current_user)):
    user_profile = current_user_profile[0]
    user_id = user_profile['id']
    try:
        resp = supabase.table('prompts').select('*').eq('user_id', user_id).order('created_at', desc=False).execute()
        return { 'prompts': resp.data }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/library")
def create_prompt(payload: PromptCreate, current_user_profile: list = Depends(get_current_user)):
    user_profile = current_user_profile[0]
    user_id = user_profile['id']
    user_email = user_profile.get('email')
    data = {
        'user_id': user_id,
        'user_email': user_email,
        'name': payload.name,
        'original_prompt': payload.original_prompt,
        'generated_prompt': payload.generated_prompt,
        'mode': payload.mode,
        'category': payload.category
    }
    try:
        resp = supabase.table('prompts').insert(data).execute()
        return resp.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/library/{prompt_id}")
def update_prompt(prompt_id: str, payload: PromptUpdate, current_user_profile: list = Depends(get_current_user)):
    user_profile = current_user_profile[0]
    user_id = user_profile['id']
    try:
        # RLS ensures only user can update
        update_data = {k: v for k, v in payload.dict().items() if v is not None}
        resp = supabase.table('prompts').update(update_data).eq('id', prompt_id).eq('user_id', user_id).execute()
        return resp.data[0] if resp.data else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/library/{prompt_id}")
def delete_prompt(prompt_id: str, current_user_profile: list = Depends(get_current_user)):
    user_profile = current_user_profile[0]
    user_id = user_profile['id']
    try:
        resp = supabase.table('prompts').delete().eq('id', prompt_id).eq('user_id', user_id).execute()
        return { 'deleted': True }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/library/bulk")
def bulk_insert(prompts: List[PromptCreate], current_user_profile: list = Depends(get_current_user)):
    user_profile = current_user_profile[0]
    user_id = user_profile['id']
    user_email = user_profile.get('email')
    rows = []
    for p in prompts:
        rows.append({
            'user_id': user_id,
            'user_email': user_email,
            'name': p.name,
            'original_prompt': p.original_prompt,
            'generated_prompt': p.generated_prompt,
            'mode': p.mode,
            'category': p.category
        })
    try:
        resp = supabase.table('prompts').insert(rows).execute()
        return { 'inserted': len(resp.data) }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
