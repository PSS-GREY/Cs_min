from flask import Blueprint,jsonify,request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.utils import load_img,img_to_array
import numpy as np
from io import BytesIO

main = Blueprint('main',__name__)

"""Melanocytic nevi (nv)
Melanoma (mel)
Benign keratosis-like lesions (bkl)
Basal cell carcinoma (bcc)
Actinic keratoses (akiec)
Vascular lesions (vas)
Dermatofibroma (df)"""

@main.route('/predict',methods = ['POST'])
def perdict():

    try:
        data = request.files['file']
        class_names = ['Actinic keratoses','Basal cell carcinoma','Benign keratosis-like lesions','Dermatofibroma','Melanoma','Melanocytic nevi','Vascular lesions']
        
        model = load_model("models/skin_cancer_model.h5",compile=False)
        img_path = BytesIO(data.read())
        img = image.load_img(img_path,target_size=(32,32))
        img_array = image.img_to_array(img)/255.0
        img_array = np.expand_dims(img_array,axis=0)
        
        predict = model.predict(img_array)
        res = class_names[np.argmax(predict)]

        print(res)
        return jsonify({'res':res}),200
    except Exception as e:
        print(e)
        return jsonify({'error':e}),404
