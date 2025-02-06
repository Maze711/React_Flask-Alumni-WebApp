import subprocess
import os
from flask import Flask
from flask_cors import CORS

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
    return {"message": "Flask is running!"}

if __name__ == "__main__":
    run_react()  # Start React when Flask starts
    app.run(debug=True)

# try lang boss