import subprocess
import os
from flask import Flask, jsonify
from flask_cors import CORS
from config.config import Config  # Import Config class
from controller.login_controller import auth_bp  # Import auth_bp Blueprint
from controller.signup_controller import signup_bp  # Import signup blueprint
from config.config import config_bp  # Import config_bp Blueprint
from controller.addalumni_controller import alumni_bp  # <-- Add this import

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(auth_bp)
app.register_blueprint(signup_bp)
app.register_blueprint(config_bp)
app.register_blueprint(alumni_bp)  # <-- Register the alumni blueprint

if __name__ == "__main__":
    try:
        app.run(debug=True, port=5000)
    except Exception as e:
        print(f"Error starting the server: {e}")
