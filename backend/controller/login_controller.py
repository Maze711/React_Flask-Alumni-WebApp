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

    error_conditions = {
        (not alumni_id or not password): ("Missing alumni_id or password", 400),
        (Config.auth_alumni_id(alumni_id) is None): ("Invalid alumni_id", 401),
    }

    for condition, (message, status) in error_conditions.items():
        if condition:
            return jsonify({"error": message}), status

    user = Config.auth_alumni_id(alumni_id)
    #if not check_password_hash(user["password"], password):
    if user["password"] != password:
        return jsonify({
            "error": "Invalid password"
            }), 401

    full_name = f"{user['last_name']}, {user['first_name']}"
    full_name += f" {user['middle_name'][0]}." if user["middle_name"] else ""
    full_name += f" {user['suffix']}" if user["suffix"] else ""

    return jsonify({
        "alumni_id" : alumni_id,
        "message": "Login Successful",
        "full_name": full_name,
        "role": user["role"]
    })