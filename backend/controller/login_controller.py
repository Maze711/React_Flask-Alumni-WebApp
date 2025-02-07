from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_login import login_user
from config.config import Config  # Import Config

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/auth", methods=["POST"])
def login():
    data = request.json
    alumni_id = data.get("alumni_id")
    password = data.get("password")    

    if not alumni_id or not password:
        return jsonify({"error": "Missing alumni_id or password"}), 400

    user = Config.fetch_alumni_details(alumni_id)
    
    if user is None:
        return jsonify({"error": "Invalid alumni_id"}), 401

    # if user and check_password_hash(user["password"], password): use this when doing a hashing
    if user and user["password"] == password:
        full_name = f"{user['last_name']}, {user['first_name']}"
        if user["middle_name"]:
            full_name += f" {user['middle_name'][0]}."  # Add middle initial
        if user["suffix"]:
            full_name += f" {user['suffix']}"  # Add suffix if available

        return jsonify({
            "message": "Login successful",
            "full_name": full_name,
            "role" : user["role"]
        })
    elif password != user['password']:
        return jsonify({"error": "Wrong Password"}), 401
    else:
        return jsonify({"error": "Invalid credentials"}), 401