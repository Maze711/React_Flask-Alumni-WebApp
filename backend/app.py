import subprocess
import os
from flask import Flask
from flask_cors import CORS
from config.config import Config  # Import Config class

app = Flask(__name__)
CORS(app)

# Function to start React
def run_react():
    frontend_path = os.path.abspath("../frontend")  # Adjust if needed
    try:
        subprocess.Popen(["npm", "run", "dev"], cwd=frontend_path, shell=True)
        print("✅ React frontend started!")
    except Exception as e:
        print("❌ Error starting React:", e)

@app.route("/")
def home():
    alumni_ids = Config.fetch_alumni_ids()
    return {"message": "Flask is running!", "alumni_ids": alumni_ids}

if __name__ == "__main__":
    run_react()
    app.run(debug=True)
