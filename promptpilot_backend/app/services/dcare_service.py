# app/services/dcare_service.py

import json
import google.generativeai as genai
from app.schemas.prompt import PromptRequest
from app.core.config import settings # Import our app's settings

class DCARE_Engine:
    """
    The core engine that uses an internal LLM call to dynamically analyze
    user input and engineer a prompt.
    """
    def _get_dynamic_analysis(self, user_prompt: str) -> dict:
        """
        Makes an internal LLM call to get a dynamic intent and persona.
        """
        print("--- D-CARE: Starting dynamic analysis call ---")
        meta_prompt = (
            "You are a request analysis expert. Your task is to analyze the following user prompt "
            "and return a single JSON object with two keys: 'intent' and 'persona'.\n"
            "- 'intent': A short, two-or-three-word description of the user's primary goal.\n"
            "- 'persona': A concise, expert role description that would be best suited to answer this request. "
            "The persona should be phrased as 'a [role] specializing in [expertise]'.\n\n"
            f"User Prompt: \"{user_prompt}\"\n\n"
            "Respond only with the JSON object. Do not include any other text or markdown formatting."
        )

        try:
            # Configure a genai client with OUR internal API key
            genai.configure(api_key=settings.PROMPTPILOT_API_KEY)
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(meta_prompt)

            # Clean the response and parse the JSON
            cleaned_response = response.text.strip().replace("`", "")
            if cleaned_response.startswith("json"):
                cleaned_response = cleaned_response[4:]
            
            analysis = json.loads(cleaned_response)
            print(f"--- D-CARE: Dynamic analysis successful: {analysis} ---")
            return analysis

        except Exception as e:
            print(f"--- D-CARE: Dynamic analysis failed: {e} ---")
            # Fallback to a default persona if the analysis fails
            return {
                "intent": "general request",
                "persona": "a helpful and intelligent assistant"
            }

    def _format_for_llm(self, request: PromptRequest, persona: str) -> str:
        """
        This method remains the same, but now it uses a dynamic persona.
        """
        if request.mode == "sniper":
            return f"""
Your one and only task is to act as an expert prompt engineer. Based on the user's simple request, you must generate a single, comprehensive, and detailed master prompt that will be used in another LLM, that will significantly increase that LLM performance closer to 100%, and that will trigger and force that LLM to give best out of the best and accurate results for the users . The master prompt you generate must adopt the persona of '{persona}'. The generated prompt should be a dense, single paragraph designed to get the best possible response. Do not answer the user's request. Only generate the master prompt itself, with no extra text or explanation before or after it. The user's original request is: '{request.user_prompt}'
"""
        elif request.mode == "titan":
            return f"""
Your one and only task is to act as an expert prompt engineer. Based on the user's simple request, you must generate a structured and detailed master prompt that will be used in another LLM that will significantly increase that LLM performance closer to 100%, and that will trigger and force that LLM to give best out of the best and accurate results for the users . The generated master prompt must be clearly structured with headings (using '### HEADING ###' format). The core of the master prompt you generate must instruct the AI to adopt the persona of '{persona}' and fulfill the user's request: '{request.user_prompt}'. Do not answer the user's request. Only generate the complete, structured master prompt itself, with no extra text or explanation before or after it. The user's original request is: '{request.user_prompt}'
"""
        elif request.mode == "json":
            # In json mode we ask the prompt engineer to produce a JSON object
            # with a single key `master_prompt` containing the master prompt string.
            # The model must output ONLY valid JSON.
            return f"""
Your one and only task is to act as an expert prompt engineer. Based on the user's simple request, you must generate a single, high-quality master prompt that will significantly increase that LLM performance closer to 100%, and also will trigger and force that LLM to give best out of the best and accurate results for the users and return it wrapped in a JSON object with the key 'master_prompt'. The value of 'master_prompt' must be a string containing the master prompt itself. Output ONLY valid JSON and no other text or formatting. The master prompt should adopt the persona of '{persona}' and fulfill the user's request: '{request.user_prompt}'.
"""
        
        
    def _generate_offline_prompt(self, request: PromptRequest, persona: str) -> str:
        """
        NEW: Generates a high-quality, rule-based prompt when LLM calls fail.
        """
        print("--- D-CARE: Generating offline fallback prompt ---")
        if request.mode == "sniper":
            return (
                f"As an expert {persona}, your primary goal is to provide a comprehensive and detailed response to the following user request. "
                f"Analyze the request carefully and provide a direct, complete, and high-quality answer without any introductory fluff. "
                f"User Request: '{request.user_prompt}'"
            )
        if request.mode == "titan":
            return (
                f"### ROLE ###\nAs an expert {persona}\n\n"
                f"### OBJECTIVE ###\nYour objective is to generate a well-structured, comprehensive, and accurate response based on the user's request below.\n\n"
                f"### USER REQUEST ###\n{request.user_prompt}\n\n"
                f"### REQUIREMENTS ###\n- Analyze the user request and provide a detailed response.\n- Structure your answer logically and ensure it is easy to understand.\n- Fulfill the request completely, adhering to the assigned role."
            )
        if request.mode == "json":
            # Provide a deterministic JSON-encoded master_prompt as a fallback
            fallback_obj = {
                "master_prompt": f"As an expert {persona}, provide a concise and high-quality master prompt for the user's request: {request.user_prompt}"
            }
            return json.dumps(fallback_obj)
        # default fallback (if an unknown mode is provided)
        return (
            f"As an expert {persona}, your primary goal is to provide a comprehensive and detailed response to the following user request. "
            f"Analyze the request carefully and provide a direct, complete, and high-quality answer without any introductory fluff. "
            f"User Request: '{request.user_prompt}'"
        )

    def process(self, request: PromptRequest) -> dict:
        """
        The main processing pipeline for the D-CARE engine, now fully dynamic.
        """
        # Step 1: Get dynamic analysis (intent and persona)
        analysis = self._get_dynamic_analysis(request.user_prompt)
        persona = analysis.get("persona", "a helpful and intelligent assistant")
        engineered_prompt = self._format_for_llm(request, persona)

        # Step 2: Format the final, engineered prompt for the user's LLM
        engineered_prompt = self._format_for_llm(request, persona)
        
        return {"engineered_prompt": engineered_prompt, "persona": persona}