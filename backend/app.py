import subprocess
import os
from flask import Flask, jsonify
from flask_cors import CORS
from config.config import Config  # Import Config class

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/api/ids", methods=["GET"])
def home():
    alumni_ids = Config.fetch_alumni_ids()
    return jsonify({"alumni_ids": alumni_ids})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
