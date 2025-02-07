import subprocess
import os
from flask import Flask, jsonify
from flask_cors import CORS
from config.config import Config  # Import Config class
from controller.login_controller import auth_bp  # Import auth_bp Blueprint

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(auth_bp)

@app.route("/api/ids", methods=["GET"])
def home():
    try:
        alumni_ids = Config.fetch_alumni_ids()
        return jsonify({"alumni_ids": alumni_ids})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    try:
        app.run(debug=True, port=5000)
    except Exception as e:
        print(f"Error starting the server: {e}")
