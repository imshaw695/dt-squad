 
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
import secrets
 
this_directory = os.path.abspath(os.path.dirname(__file__))
 
load_dotenv(os.path.join(this_directory,"..", '.env'),override=True)
 
from utilities import get_sql, get_db_connection
 
try:
    from website.pii_data_handlers import  get_encrypted_data,  get_encryption_keys_from_dot_env, get_latest_encryption_key_and_id
except:
    from pii_data_handlers import  get_encrypted_data,  get_encryption_keys_from_dot_env, get_latest_encryption_key_and_id
 
# This script is always running locally
# we should always use the latest encryption key to stop attempts to create duplicate users
ENCRYPTION_KEYS = get_encryption_keys_from_dot_env()
latest_encryption_key, pii_key_id  = get_latest_encryption_key_and_id(ENCRYPTION_KEYS)
 
def create_system_users():
 
    # brands = get_records("brands")
    # brand_name = brands[0]["name"]
 
    load_dotenv(os.path.join(this_directory, "..", ".env"), override=True)
 
    super_user_name = os.environ.get("super_user_name")
    super_user_email = os.environ.get("super_user_email")
    super_user_password = os.environ.get("super_user_password")
    create_user(
        super_user_name,
        super_user_email,
        super_user_password,
        "super user",
        # brand_name,
    )
 
    support_user_name = os.environ.get("support_user_name")
    support_user_email = os.environ.get("support_user_email")
    support_user_password = os.environ.get("support_user_password")
    create_user(
        support_user_name,
        support_user_email,
        support_user_password,
        "support",
        # brand_name,
    )
 
    return
 
 
def create_user(
    name,
    email,
    password,
    role_name,
    # brand_name,
):
 
    # We are now storing pii data after encryption
    name = get_encrypted_data(name, latest_encryption_key)
    email = get_encrypted_data(email, latest_encryption_key)
 
    hashed_password = generate_password_hash(password)
 
    # brands = get_records_by_name("brands", brand_name)
    # brand_id = brands[0]["id"]
    # roles = get_records_by_name("roles", role_name)
    # role_id = roles[0]["id"]
 
    users = get_records_by_name("users", name)
    users = get_records_by_field_value("users", "email", email)
    for user in users:
        if user["email"] == email:
            sql = f"""DELETE FROM users WHERE email = '{email}';"""
            sql = sql.replace("\n", "")
            with get_db_connection() as db_connection:
                cursor = db_connection.cursor()
                test = cursor.execute(sql)
                test2 = db_connection.commit()
 
    sql = f"""
        INSERT INTO users (name, email, hashed_password, pii_key_id)
        VALUES ('{name}', '{email}', '{hashed_password}', '{pii_key_id}' );    
    """
 
    sql = sql.replace("\n", "")
 
    with get_db_connection() as db_connection:
        cursor = db_connection.cursor()
        test = cursor.execute(sql)
        db_connection.commit()
 
    return
 
 
def get_records(table):
 
    with get_db_connection() as db_connection:
        cursor = db_connection.cursor()
        cursor.execute(f"SELECT * FROM {table}")
 
        columns = cursor.description
        # hocus pocus alert!!!
        result = [
            {columns[index][0]: column for index, column in enumerate(value)}
            for value in cursor.fetchall()
        ]
 
        return result
 
def get_records_by_name(table, name):
 
    with get_db_connection() as db_connection:
        cursor = db_connection.cursor()
        cursor.execute(f"SELECT * FROM {table} where name = '{name}'")
 
        columns = cursor.description
        # hocus pocus alert!!!
        result = [
            {columns[index][0]: column for index, column in enumerate(value)}
            for value in cursor.fetchall()
        ]
 
        return result
 
 
def get_records_by_field_value(table, field, value):
 
    with get_db_connection() as db_connection:
        cursor = db_connection.cursor()
        cursor.execute(f"SELECT * FROM {table} where {field} = '{value}'")
 
        columns = cursor.description
 
        result = []
        for value in cursor.fetchall():
            row = {}
            for index, column in enumerate(value):
                row[columns[index][0]] = column
            result.append(row)
       
        return result
 
 
def create_demo_users():
    """
    user
    ho user
    ho brand user
    super user
    """
 
    brands = get_records("brands")
    brand_name = brands[0]["name"]
 
    users = []
    users.append(
        dict(
            password=secrets.token_urlsafe(20),
            name="Luke Davey",
            email="luke.davey@dt-squad.com",
            role_name="ho user",
            brand_name=brand_name,
        )
    )
   
 
    for user in users:
 
        create_user(
            user["name"],
            user["email"],
            user["password"],
            user["role_name"],
            user["brand_name"],
        )
 
 
def create_views():
 
    create_view("create_view_tasks_brands_joined.sql")
    create_view("create_view_retailers_tasks_brands_joined.sql")
    create_view("create_view_brand_programme_task_retailer_crosstab_status.sql")
    create_view("create_view_programme_brand_crosstab_status.sql")
    create_view("create_view_programme_task_crosstab_status.sql")
    create_view("create_view_programme_crosstab_status.sql")
    create_view("create_view_brand_task_crosstab_status.sql")
    create_view("create_view_brand_crosstab_status.sql")
    create_view("create_view_brand_programme_crosstab_status.sql")
    create_view("create_view_region_crosstab_status.sql")
    create_view("create_view_area_crosstab_status.sql")
    create_view("create_view_retailer_crosstab_status.sql")
    create_view("create_view_task_blocked_reasons_and_plans.sql")
    create_view("create_view_logs_01.sql")
    create_view("create_view_logs_02_crosstab.sql")
    create_view("create_view_league_table_01.sql")
 
 
def create_view(sql_file_name):
 
    sql = get_sql(sql_file_name)
    with get_db_connection() as db_connection:
        cursor = db_connection.cursor()
        cursor.execute(sql)
        # db_connection.commit()
 
    return
 
 
def create_brand(brand_package):
 
    sql = f"""
        INSERT INTO brands ( name)
        VALUES ('{brand_package['name']}');    
    """
 
    sql = sql.replace("\n", "")
 
    with get_db_connection() as db_connection:
        cursor = db_connection.cursor()
        try:
            test = cursor.execute(sql)
            db_connection.commit()
        except:
            pass
 
    return
 
 
def create_brands():
 
    create_brand(dict(name="Head Office"))
    create_brand(dict(name="Alpha Centauri"))
    create_brand(dict(name="Andromeda"))
    create_brand(dict(name="Aurora"))
    create_brand(dict(name="Ariel"))
    create_brand(dict(name="Celeste"))
 
def create_brands_volkswagen():
 
    create_brand(dict(name="Volkswagen Group"))
    create_brand(dict(name="Skoda"))
    create_brand(dict(name="Volkswagen Passenger Cars"))
    create_brand(dict(name="Volkswagen Commercial Vehicles"))
    create_brand(dict(name="Audi"))
    create_brand(dict(name="CUPRA"))
 
 
def create_role(role_package):
 
    sql = f"""
        INSERT INTO roles ( name, level)
        VALUES ('{role_package['name']}','{role_package['level']}');    
    """
 
    sql = sql.replace("\n", "")
 
    with get_db_connection() as db_connection:
        cursor = db_connection.cursor()
        try:
            test = cursor.execute(sql)
            db_connection.commit()
        except:
            pass
 
    return
 
 
def create_roles():
 
    create_role(dict(name="user", level=10))
    create_role(dict(name="ho user", level=20))
    create_role(dict(name="ho brand user", level=30))
    create_role(dict(name="super user", level=100))
    create_role(dict(name="support", level=15))
 
 
if __name__ == "__main__":
   
    # This must be run on the host machine as it does a local connection and uses the secrets to allow correct encryption
   
    # create_views()
 
    # create_roles()
 
    # create_brands()
 
    create_system_users()
 
    # Add any demo users that we want (Luke at least)
    # create_demo_users()
 
    message = '''
    The base user records have been created with some roles, brands, views refreshed, system_users and demo_users created
 
    If you want the full set of demo records, you must also run:
 
    back_end\create_demo_records_in_db.py
 
    '''
    print(message)
 

