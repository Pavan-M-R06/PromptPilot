# app/services/llm_service.py

import google.generativeai as genai

def _call_gemini(dcare_output: str, api_key: str) -> str | None:
    """
    Calls the Gemini API to generate the master prompt.

    Returns:
        The generated text as a string, or None if an error occurs.
    """
    print("--- Attempting to call Gemini API ---")
    try:
        # Configure the Gemini client with the user's API key
        genai.configure(api_key=api_key)

        # Set up the model
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Send the D-CARE engineered prompt to the model
        response = model.generate_content(dcare_output)

        print("--- Gemini API call successful ---")
        return response.text
    except Exception as e:
        # Handle potential API errors gracefully
        print(f"--- Gemini API Error: {e} ---")
        return None

def generate_with_fallback(dcare_output: str, api_key: str) -> str | None:
    """
    The main orchestrator function that attempts to generate a prompt,
    with a fallback mechanism.
    """
    # Step 1: Try the primary provider (Gemini)
    gemini_result = _call_gemini(dcare_output, api_key)
    if gemini_result is not None:
        return gemini_result

    # --- Placeholder for future fallback providers ---
    # print("Gemini failed. Trying Claude...")
    # claude_result = _call_claude(dcare_output, api_key)
    # if claude_result is not None:
    #     return claude_result

    # If all providers fail, return None
    print("--- All LLM providers failed ---")
    return None