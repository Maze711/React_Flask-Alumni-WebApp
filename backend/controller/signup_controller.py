from flask import Blueprint, request, jsonify
from config.config import Config
import mysql.connector

signup_bp = Blueprint("signup", __name__)

@signup_bp.route("/api/signup", methods=["POST"])
def signup():
    data = request.json

    # Remove "alumni_id" from required fields because it is auto-generated 
    required_fields = [
        "last_name", "first_name", "middle_name",
        "gender", "birthdate", "email", "address", "number", "password"
    ]

    # Check for missing fields
    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    email = data.get("email")

    connection = Config.get_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = connection.cursor(dictionary=True)

        # Check if email already exists
        cursor.execute("SELECT email FROM user_primary_information WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"error": "Email already exists"}), 409

        # Generate new alumni_id: get the highest current alumni_id and increment it
        cursor.execute("SELECT alumni_id FROM user_primary_information ORDER BY alumni_id DESC LIMIT 1")
        result = cursor.fetchone()
        if result and result.get("alumni_id"):
            last_id = result["alumni_id"]
            if last_id.startswith("A") and last_id[1:].isdigit():
                num = int(last_id[1:])
                new_alumni_id = f"A{num + 1}"
            else:
                new_alumni_id = "A1000"
        else:
            new_alumni_id = "A1000"  # default starting id if none exists

        # Insert new user
        insert_query = """
            INSERT INTO user_primary_information
            (alumni_id, last_name, first_name, middle_name, suffix, gender, birthdate, email, address, number, password)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (
            new_alumni_id,
            data.get("last_name"),
            data.get("first_name"),
            data.get("middle_name"),
            data.get("suffix") or "",  # Provide default empty string if suffix is missing
            data.get("gender"),
            data.get("birthdate"),
            email,
            data.get("address"),
            data.get("number"),
            data.get("password")
        ))

        # Insert into secondary table (add default or empty values as needed)
        insert_secondary = """
            INSERT INTO user_secondary_information
            (alumni_id, college_department, year_graduated, civil_status, work_status, job_title, role)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_secondary, (
            new_alumni_id,
            data.get("college_department") or "",
            data.get("year_graduated") or "2014",  # Default to 2014 if not provided
            data.get("civil_status") or "",
            data.get("work_status") or "",
            data.get("job_title") or "",
            data.get("role") or "ALUMNI"
        ))

        connection.commit()

        return jsonify({"message": "Signup successful"}), 201

    except mysql.connector.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        cursor.close()
