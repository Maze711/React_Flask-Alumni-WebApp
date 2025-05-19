from flask import Blueprint, request, jsonify
from config.config import Config
import mysql.connector

alumni_bp = Blueprint('alumni', __name__)

@alumni_bp.route('/add_alumni', methods=['POST'])
def add_alumni():
    data = request.get_json()

    # Map frontend fields to DB fields
    last_name = data.get('last_name') or data.get('lastName')
    first_name = data.get('first_name') or data.get('firstName')
    middle_name = data.get('middle_name') or data.get('middleName')
    suffix = data.get('suffix', '')
    gender = data.get('sex') or data.get('gender')
    password = data.get('password')
    college_department = data.get('college_department') or data.get('college')
    year_graduated = data.get('year_graduated') or data.get('yearGraduated')
    role = data.get('role', 'ALUMNI')

    # You can add more fields as needed (address, number, etc.)

    connection = Config.get_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = connection.cursor(dictionary=True)

        # Generate new alumni_id
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
            new_alumni_id = "A1000"

        # Insert into user_primary_information
        insert_primary = """
            INSERT INTO user_primary_information
            (alumni_id, last_name, first_name, middle_name, suffix, gender, password)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_primary, (
            new_alumni_id,
            last_name,
            first_name,
            middle_name,
            suffix,
            gender,
            password
        ))

        # Insert into user_secondary_information
        insert_secondary = """
            INSERT INTO user_secondary_information
            (alumni_id, college_department, year_graduated, role)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_secondary, (
            new_alumni_id,
            college_department or "",
            year_graduated or "",
            role
        ))

        connection.commit()
        return jsonify({"message": "Alumni added successfully"}), 201

    except mysql.connector.Error as e:
        connection.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        cursor.close()
        connection.close()

@alumni_bp.route('/get_next_alumni_id', methods=['GET'])
def get_next_alumni_id():
    connection = Config.get_db_connection()
    if not connection:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT alumni_id FROM user_primary_information ORDER BY alumni_id DESC LIMIT 1")
        result = cursor.fetchone()
        if result and result.get("alumni_id"):
            last_id = result["alumni_id"]
            if last_id.startswith("A") and last_id[1:].isdigit():
                num = int(last_id[1:])
                next_id = f"A{num + 1}"
            else:
                next_id = "A1000"
        else:
            next_id = "A1000"
        return jsonify({"next_alumni_id": next_id})
    finally:
        cursor.close()
        connection.close()