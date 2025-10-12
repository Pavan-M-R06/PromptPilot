# PromptPilot

PromptPilot is an end-to-end prompt engineering toolkit that converts short, human-friendly requests into high-quality "master prompts" suitable for use with large language models. The project includes a React + Vite frontend and a FastAPI backend that integrates with Supabase for authentication and profile/credit management and with an LLM provider for generation.

## Key ideas
- D-CARE: a small engineering pipeline that analyzes user intent and produces a persona-aware engineered prompt.
- LLM service: submits the engineered prompt to an LLM to generate a final master prompt.
- Credits & profiles: users have a `credits_remaining` balance stored in Supabase profiles; generating a master prompt consumes credits.
- Resilience: offline deterministic fallback prompt generation if external LLM calls fail.

## Repository layout

- `promptpilot-frontend/` — React + TypeScript + Vite frontend (Mantine UI)
  - `src/pages` — Home, Signup, Login, Dashboard
  - `src/components` — AuthForm, Layout, Navbar, ProtectedRoute
- `promptpilot_backend/` — FastAPI backend
  - `app/api/v1` — `auth.py`, `prompt.py`, `dependencies.py`
  - `app/core` — `config.py`, `supabase_client.py`
  - `app/services` — `dcare_service.py`, `llm_service.py`
  - `app/schemas` — `user.py`, `prompt.py`

## Features

- Signup / Login (email + username support) via Supabase auth
- Protected API endpoints that require a bearer token
- D-CARE engine for persona + engineered prompt generation
- Configurable LLM integration (Google generative AI / Gemini)
- Offline fallback prompt generation

## Prerequisites

- Python 3.11+
- Node 18+ and npm or yarn
- Supabase account (project URL and service role key)
- Optional: Google Generative AI credentials (Gemini API key)

## Environment & configuration

Create a `.env` file in `promptpilot_backend/` with the following variables:

```
APP_NAME=PromptPilot
DEBUG=true
PROMPTPILOT_API_KEY="<YOUR_GEMINI_OR_INTERNAL_KEY>"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="<YOUR_SUPABASE_SERVICE_OR_ANON_KEY>"
```

Notes:
- Use a Supabase _service_ key on the backend (server-side) when you need to manage profiles/credits. Never expose service keys in the frontend.

## Local development

Backend (FastAPI)

1. From the repo root, go to the backend folder and create a virtualenv:

```powershell
cd "D:\PromptPilot-Team NOVA\promptpilot_backend"
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
```

2. Run the server:

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Frontend (React + Vite)

1. Install dependencies and start dev server:

```powershell
cd "D:\PromptPilot-Team NOVA\promptpilot-frontend"
npm install
npm run dev
```

2. Open the frontend at `http://localhost:5173`.

## Supabase setup notes

1. Create a Supabase project.
2. Enable Email auth.
3. Create a `profiles` table with at least these fields:
   - `id` (uuid) — primary key
   - `email` (text)
   - `username` (text)
   - `credits_remaining` (integer)
4. Configure RLS policies so the backend can create/update profiles (or use the service key server-side for updates).

## API Overview

- POST `/api/v1/auth/signup` — create account (email, password, username)
- POST `/api/v1/auth/login` — login (email or username + password)
- GET `/api/v1/auth/users/me` — get authenticated user's profile
- POST `/api/v1/generate` — protected; generate a master prompt (consumes credits)

## Troubleshooting

- If you see import errors when running Uvicorn, make sure you're running the command from the repository folder that contains the `app/` package and that the virtualenv is activated.
- If Supabase operations fail, verify `SUPABASE_URL` and `SUPABASE_KEY` in the backend `.env` file.

## Contributing

- Use feature branches, open PRs, and include tests for new behavior.
