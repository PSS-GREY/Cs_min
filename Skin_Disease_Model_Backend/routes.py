# routes.py (add this to the same file)
from flask import Blueprint, request, jsonify
import requests
import os

main = Blueprint('main', __name__)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")  # store securely in Render env
GEMINI_MODEL = "models/gemini-1.5-flash"

@main.route('/gemini', methods=['POST'])
def gemini():
    try:
        data = request.get_json()
        query = data.get("query", "")
        if not query:
            return jsonify({"error": "No query provided"}), 400

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": f"Answer the following question in a clear, detailed paragraph (4–6 sentences):\n\n{query}"
                        }
                    ],
                }
            ],
        }

        r = requests.post(url, json=payload)
        r.raise_for_status()
        response = r.json()

        # Extract text safely
        text = (
            response.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )

        return jsonify({"text": text})

    except Exception as e:
        print("Gemini Error:", e)
        return jsonify({"error": str(e)}), 500
