from flask import Flask,jsonify,request
from flask_cors import CORS
from routes import main

app = Flask(__name__)
CORS(app)

app.register_blueprint(main)

@app.route('/')
def home():
    return 'Hello World'

if __name__ == '__main__':
    app.run()