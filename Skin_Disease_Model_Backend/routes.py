from flask import Blueprint, jsonify, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from io import BytesIO

main = Blueprint('main', __name__)

# Load the model only once at startup
MODEL_PATH = "models/skin_cancer_model.h5"
model = load_model(MODEL_PATH, compile=False)

# Define your class names
class_names = [
    'Actinic keratoses',
    'Basal cell carcinoma',
    'Benign keratosis-like lesions',
    'Dermatofibroma',
    'Melanoma',
    'Melanocytic nevi',
    'Vascular lesions'
]

# Auto-detect expected input size from model
input_shape = model.input_shape[1:3]  # e.g. (224, 224)

@main.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        img_path = BytesIO(file.read())

        # Preprocess image
        img = image.load_img(img_path, target_size=input_shape)
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        prediction = model.predict(img_array)
        predicted_class = class_names[np.argmax(prediction)]
        confidence = float(np.max(prediction))

        print("Prediction array:", prediction)
        print("Predicted class:", predicted_class, "Confidence:", confidence)

        return jsonify({
            'res': predicted_class,
            'confidence': confidence
        }), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500
