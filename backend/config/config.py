import os
import mysql.connector
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify

# Load environment variables from .env file
load_dotenv("../../.env")
config_bp = Blueprint("config", __name__)
class Config:
    @staticmethod
    def get_db_connection():
        try:
            connection = mysql.connector.connect(
                host=os.getenv('DB_HOST', 'localhost'),
                database=os.getenv('DATABASE_NAME', 'ALUMNI_SYSTEM'),
                user=os.getenv('DB_USER', 'root'),
                password=os.getenv('DB_PASSWORD', ''),
                port=int(os.getenv('DB_PORT', 3306))
            )
            return connection
        except mysql.connector.Error as e:
            print(f"Database Connection Error: {e}")
            return None

    @staticmethod
    def fetch_all_users():
        """Fetch all user information from both tables and join them."""
        users = []
        connection = Config.get_db_connection()
        
        if connection:
            try:
                cursor = connection.cursor(dictionary=True)
                query = """
                    SELECT upi.*, usi.*
                    FROM user_primary_information upi
                    JOIN user_secondary_information usi ON upi.alumni_id = usi.alumni_id
                """
                cursor.execute(query)
                users = cursor.fetchall()  # Fetch all records

                cursor.close()
            except mysql.connector.Error as e:
                print(f"Error fetching user information: {e}")
            finally:
                connection.close()

        return users  # Returns a list of dictionaries or an empty list if no users found

    @staticmethod
    def auth_alumni_id(alumni_id):
        """Authenticate user by fetching user details from the database."""
        connection = Config.get_db_connection()
        if connection:
            try:
                cursor = connection.cursor(dictionary=True)
                query = """
                    SELECT upi.alumni_id, upi.password, upi.last_name, upi.first_name, 
                        upi.middle_name, upi.suffix, usi.role
                    FROM user_primary_information upi
                    JOIN user_secondary_information usi ON upi.alumni_id = usi.alumni_id
                    WHERE upi.alumni_id = %s
                """
                cursor.execute(query, (alumni_id,))
                user_data = cursor.fetchone()  # Fetch only one record

                cursor.close()
                return user_data  # Returns a dictionary or None if not found
            except mysql.connector.Error as e:
                print(f"Error fetching alumni details: {e}")
            finally:
                connection.close()

        return None  # Return None if connection fails or user is not found

@config_bp.route('/fetch_all_users', methods=['GET'])
def fetch_all_users_route():
    users = Config.fetch_all_users()
    return jsonify(users)


if __name__ == "__main__":
    print(Config.fetch_alumni_ids())  # Test alumni ID fetching
