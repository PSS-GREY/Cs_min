from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from io import BytesIO
import requests
import os

main = Blueprint('main', __name__)

# -----------------------------
# ✅ Gemini API Setup
# -----------------------------
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-1.5-flash"

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
                    "parts": [{"text": query}],
                }
            ],
        }

        r = requests.post(url, json=payload)
        r.raise_for_status()
        response = r.json()

        # Extract Gemini response safely
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


# -----------------------------
# ✅ Skin Disease Model Setup
# -----------------------------
MODEL_PATH = "models/skin_cancer_model.h5"
model = load_model(MODEL_PATH, compile=False)

class_names = [
    'Actinic keratoses',
    'Atopic Dermatitis',
    'Benign keratosis-like lesions',
    'Dermatofibroma',
    'Melanoma',
    'Melanocytic nevi',
'Squamous cell carcinoma',
'Tinea Ringworm Candidiasis',
    'Vascular lesions'
]

# Auto-detect expected input size (e.g. 224x224)
input_shape = model.input_shape[1:3]

@main.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        img_bytes = BytesIO(file.read())

        # Preprocess image
        img = image.load_img(img_bytes, target_size=input_shape)
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        prediction = model.predict(img_array)
        predicted_class = class_names[np.argmax(prediction)]
        confidence = float(np.max(prediction))

        print("Prediction array:", prediction)
        print("Predicted class:", predicted_class, "Confidence:", confidence)

        return jsonify({
            "res": predicted_class,
            "confidence": confidence
        }), 200

    except Exception as e:
        print("Prediction Error:", str(e))
        return jsonify({"error": str(e)}), 500