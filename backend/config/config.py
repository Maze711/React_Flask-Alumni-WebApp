import os
import mysql.connector
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv("../../.env")

class Config:
    @staticmethod
    def fetch_alumni_ids():
        alumni_ids = []
        try:
            # Fetch DB details from .env
            connection = mysql.connector.connect(
                host=os.getenv('DB_HOST', 'localhost'),
                database=os.getenv('DATABASE_NAME', 'ALUMNI_SYSTEM'),
                user=os.getenv('DB_USER', 'root'),
                password=os.getenv('DB_PASSWORD', ''),
                port=int(os.getenv('DB_PORT', 3306))
            )

            if connection.is_connected():
                cursor = connection.cursor()
                cursor.execute("SELECT alumni_id FROM user_secondary_information")
                alumni_ids = cursor.fetchall()

                if alumni_ids:
                    print("\n".join(f"Alumni ID: {alumni_id[0]}" for alumni_id in alumni_ids))
                else:
                    print("No alumni_id found.")
                cursor.close()
            else:
                print("Failed to connect to the database.")
        except mysql.connector.Error as e:
            print(f"Error: {e}")
        finally:
            if connection.is_connected():
                connection.close()

        return alumni_ids 

if __name__ == "__main__":
    Config.fetch_alumni_ids()
