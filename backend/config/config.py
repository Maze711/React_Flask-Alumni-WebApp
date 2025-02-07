import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv("../../.env")

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
    def fetch_alumni_ids():
        """Fetch all alumni IDs from the database."""
        alumni_ids = []
        connection = Config.get_db_connection()
        
        if connection:
            try:
                cursor = connection.cursor()
                cursor.execute("SELECT alumni_id FROM user_secondary_information")
                alumni_ids = [row[0] for row in cursor.fetchall()]  # Extracting alumni_id values
                
                if alumni_ids:
                    print("\n".join(f"Alumni ID: {alumni_id}" for alumni_id in alumni_ids))
                else:
                    print("No alumni_id found.")
                cursor.close()
            except mysql.connector.Error as e:
                print(f"Error fetching alumni IDs: {e}")
            finally:
                connection.close()

        return alumni_ids

    @staticmethod
    def fetch_alumni_details(alumni_id):
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

if __name__ == "__main__":
    print(Config.fetch_alumni_ids())  # Test alumni ID fetching
