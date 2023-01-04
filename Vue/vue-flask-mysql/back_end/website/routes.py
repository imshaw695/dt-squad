# Import relevant modules
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import secrets
import time
import datetime
from sre_parse import parse_template
from flask import (
    request,
    render_template,
    url_for,
    redirect,
    render_template_string,
    send_from_directory,
)
import os
import sqlalchemy
from flask_mail import Message

from sqlalchemy.orm import class_mapper
from sqlalchemy.sql import func, expression, and_
import re
from website.utilities import (
    get_sql,
    process_tasks_brands_01,
    is_user_authorised,
    records_to_list,
)
from website import db, mail, bad_password_set, site_config

# keep a rolling log of route_timings and if they get too slow then log a warning
route_timings = {}


def computed_operator(column, v):

    # needed for building dynamic filters
    # adapted from here https://stackoverflow.com/a/69331512/2508957
    # eg:
    # name = "Ariel"
    # for boolean fields such as is_deleted, use:
    # is_deleted = "1"
    # is_deleted = "0"
    if re.match(r"^!", v):
        """__ne__"""
        val = re.sub(r"!", "", v)
        return column.__ne__(val)
    if re.match(r">(?!=)", v):
        """__gt__"""
        val = re.sub(r">(?!=)", "", v)
        return column.__gt__(val)
    if re.match(r"<(?!=)", v):
        """__lt__"""
        val = re.sub(r"<(?!=)", "", v)
        return column.__lt__(val)
    if re.match(r">=", v):
        """__ge__"""
        val = re.sub(r">=", "", v)
        return column.__ge__(val)
    if re.match(r"<=", v):
        """__le__"""
        val = re.sub(r"<=", "", v)
        return column.__le__(val)
    if re.match(r"(\w*),(\w*)", v):
        """between"""
        a, b = re.split(r",", v)
        return column.between(a, b)
    """ default __eq__ """
    return column.__eq__(v)


this_directory = os.path.abspath(os.path.dirname(__file__))


# Import the Flask webapp instance that we created in the __init__.py
from flask import current_app as app

# Import the db and models
from website.models import (
    User,
    Log,
)

# Put together dictionary of models
Models = dict(
    User=User,
    Log=Log,
)

# Define our first route (the last part of the url for our website application)
# We can define what urls should land in this function. Let's say / and /index
# We can also define the legitimate methods for this page of GET and POST
try:
    SESSION_EXPIRES_SECONDS = int(os.environ.get("SESSION_EXPIRES_SECONDS"))
except:
    SESSION_EXPIRES_SECONDS = 180

@app.route("/api_test_critical_log")
def test_critical_log(time_it=True):

    # throttle it
    # We need to do a throttle here that will not block the whole flask process

    # now fall over after loging a critical event
    try:
        1 / 0
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")

    return dict(rc=16, message="A criticial error was forced as part of a test")


@app.route("/", methods=["GET", "POST"])
@app.route("/index", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def index():

    # This is a vue project that serves the static index file only
    return render_template("index.html")


@app.route("/index_with_message", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def index_with_message():

    # This is a vue project that serves the static index file only
    return redirect(url_for("index", message="you were redirected"))


# app name
@app.errorhandler(404)
# inbuilt function which takes error as parameter
def not_found(e):
    # defining function
    return render_template("index.html")


@app.route("/api_login", methods=["POST"])
# Now comes the actual function definition for processing this page
def api_login():

    package = {}
    package["encoded_jwt"] = ""
    package["email"] = ""
    package["password"] = ""

    try:
        api_package = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")

    if "password" in api_package:
        form_password = api_package["password"]
        if not form_password:
            # throttle it
            # We need to do a throttle here that will not block the whole flask process
            return dict(
                rc=16,
                message=f"No password supplied to login with",
                user=package,
            )            

    else:
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return package
    if "email" in api_package:
        form_email = api_package["email"]
        if not form_email:
            # throttle it
            # We need to do a throttle here that will not block the whole flask process
            return dict(
                rc=16,
                message=f"No email was supplied to login with",
                user=package,
            ) 
    else:
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"No email was supplied to login with",
            user=package,
        ) 

    # now lets try from the database
    user = User.get_user_by_email(form_email)

    # If no match just get straight out
    if not user:
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"Login failed",
            user=package,
        ) 
    
    # have we exceeded the failed login streak count
    if user.failed_login_streak > 0:
        you_can_break_here = True
    if user.failed_login_streak > 10:
        app.logger.warning(f"[ACCESS] A user with the following email: {user.email} attempted to log in more than 10 times with the wrong password ")        
        package["failed_login_streak"] = user.failed_login_streak
        return dict(
            rc=16,
            message=f"Login failed - account locked. Please email support to ask for a call back on:{app.config['ADMINS'][0]}",
            user=package,
        ) 


    password_good = False
    try:
        if check_password_hash(user.hashed_password, form_password):
            password_good = True

        else:
            # throttle it
            # We need to do a throttle here that will not block the whole flask process

            # increase the streak count 
            user.failed_login_streak = user.failed_login_streak + 1
            package["failed_login_streak"] = user.failed_login_streak

            try:
                db.session.commit()
            except Exception as err:
                app.logger.exception(f"[EXCEPTION] err was {err}")

            return dict(
                rc=16,
                message=f"Login failed",
                user=package,
            ) 

    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        return dict(
            rc=16,
            message=f"Login failed",
            user=package,
        ) 
        # throttle it
        # We need to do a throttle here that will not block the whole flask process

    # We can only get to here if the password is good
    user.failed_login_streak = 0
    try:
        db.session.commit()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")  

    logged_in_package = get_logged_in_package(user)
    return dict(
        rc=0,
        message=f"Login was succesful",
        user=logged_in_package,
    ) 

def get_logged_in_package(user):

    package = {}

    if type(user) == type({}):

        user = User.get_user_by_email(user["email"]) 

        you_can_break_here = True

    user = user.get_dict()

    seconds = SESSION_EXPIRES_SECONDS

    loggedOnAt = datetime.datetime.now(tz=datetime.timezone.utc)
    jwt_content = dict(
        exp=loggedOnAt + datetime.timedelta(seconds=seconds),
        email=user["email"],
        loggedOnAtSeconds=loggedOnAt.timestamp(),
    )
    encoded_jwt = jwt.encode(jwt_content, app.secret_key, algorithm="HS512")
    package["encoded_jwt"] = encoded_jwt
    package["logged_in"] = True
    package["id"] = user["id"]
    package["name"] = user["name"]
    package["email"] = user["email"]
    package["failed_login_streak"] = user["failed_login_streak"]    

    return package

@app.route("/api_get_user", methods=["POST"])
# Now comes the actual function definition for processing this page
def api_get_user():

    # todo: Throttling if it fails
    try:
        user = get_user_from_request(request)
        return dict(
        rc=0,
        message=f"The API call worked successfully.",
        user=user
    )
    except Exception as err:
        return dict(
            rc=16,
            message=f"The API failed.",
            user=dict(
                logged_in = False,
                email = "",
                role_name= ""
            )
        )



@app.route("/api_get_sql", methods=["POST"])
def api_get_sql():

    time_started = time.time()

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )

    try:
        # get the contents of the package
        api_package = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (1)",
        )

    try:
        # we must have a sql_name with a sql_package
        sql_name = api_package["sql_name"]
        operation = api_package["operation"]
        parameters = api_package["parameters"]
        sql_package = sql_packages[sql_name]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        app.logger.warning(
            f"[ACCESS] a api_get_sql came in with a malformed api_package. Could be attack: {api_package}"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try again (2)",
        )


    # does this user have authority
    if not is_user_authorised(user, operation, sql_package):
        app.logger.warning(
            f"[ACCESS] User with no authority tried to run sql: {sql_name}"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"You don't have sufficient authority to perform the {operation}",
        )

    # get the sql
    sql = sql_package["sql"]

    # convert the sql as string to a sqlalchemy text clause object
    # so that we can bind the parameters to it before the execute
    sql = sqlalchemy.text(sql)

    if len(parameters):
        you_can_break_here = True

    # now bind the parameters to the text clause object
    try:
        sql = sql.bindparams(**parameters)
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        message = f"[ACCESS] User with id {user['email']} tried to run sql: {sql_name} with parameters: {parameters}"
        app.logger.warning(message)
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=8,
            message=f"The records were not returned",
            package=[],
        )

    try:
        records = db.session.execute(sql).all()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=8,
            message=f"The records were not returned",
            package=[],
        )

    # post process or return as dict
    try:
        package = sql_package["post_process_function"](records)
    except:
        package = records_to_list(records)

    return_package = dict(
        rc=0,
        message=f"The records were returned",
        package=package,
    )

    time_stopped = time.time()

    gather_and_log_response_times(f"api_get_sql [{sql_name}]", time_started)

    return return_package


@app.route("/api_create_record_db", methods=["POST"])
def api_create_record_db():

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )

    # define the operation
    operation = "create"

    try:
        # get the contents of the package
        api_package = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (1)",
        )

    try:
        # we must have a model_name with a model
        model_name = api_package["model_name"]
        Model = Models[model_name]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
        )

    # there is a specific api to create_users so we can reject them from here immediately
    # at one point there was a specifc api to update users but I merged that into the generic update records
    # we can do the same thing here but there is no urgency
    # todo: merge api_create_user_db into api_create_record_db
    # The application uses api_create_record_db so if there is an attempth to update a User with this route then
    # it's almost certainly part of an attack
    if model_name == "User":
        app.logger.critical(
            f"[ACCESS] {user} tried to create a user record with the create_record api.  It's very likely part of an attack"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api is not appropriate here",
        )

    # does this user have authority
    if not Model.is_user_authorised(user, operation):
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"You don't have sufficient authority to perform the {operation}",
        )

    try:
        data = api_package["data"]
        create_package = data["create_package"]
        temporary_id = create_package["id"]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
        )

    # if we are here, then we are good to go
    try:
        new_record = Model()
        new_record.update_from_dictionary(create_package)
        db.session.add(new_record)
        db.session.commit()
        app.logger.crud(f"[CREATE] user_email:{user['email']} created a {model_name} the following record: \n{create_package}")
        created_record = new_record.get_dict()
        # add the original id
        created_record["temporary_id"] = temporary_id
        return dict(
            rc=0, message=f"The {model_name} was added", created_record=created_record
        )
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        db.session.rollback()
        db.session.flush()  # for resetting non-commited .add()
        return dict(rc=16, message=f"The {model_name} was not added")


@app.route("/api_create_user_db", methods=["POST"])
def api_create_user_db():

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )

    # define the operation
    operation = "create"

    try:
        # get the contents of the package
        api_package = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (1)",
        )

    try:
        # we must have a model_name with a model
        model_name = "User"
        Model = Models[model_name]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
        )

    try:
        data = api_package["data"]
        create_package = data["create_package"]
        temporary_id = create_package["id"]
        password = create_package["password"]

    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
        )

    if is_strong_enough(password):
        # The difference here is that we need to create a hashed_password from the create package
        create_package["hashed_password"] = generate_password_hash(password)
    else:
        return dict(
            rc=16,
            message=f"The password is not strong enough",
        )

    # Now I have the full create package, need to see if the creating user has authority to do this
    # does this user have authority
    if not Model.is_user_authorised(user, operation, create_package):
        app.logger.warning(
            f"[ACCESS] The user {user} tried to create a user without sufficient authority"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"You don't have sufficient authority to perform the {operation}",
        )

    # if we are here, then we are good to go
    try:
        # need to make sure that the user does not create a user with a higher role_name than themselves
        new_record = Model()
        new_record.update_from_dictionary(create_package)
        db.session.add(new_record)
        db.session.commit()
        app.logger.crud(f"[CREATE] user_email:{user['email']} created a {model_name} the following record: \n{create_package}")
        created_record = new_record.get_dict()
        # add the original id
        created_record["temporary_id"] = temporary_id
        return dict(
            rc=0, message=f"The {model_name} was added", created_record=created_record
        )
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        db.session.rollback()
        db.session.flush()  # for resetting non-commited .add()
        return dict(rc=16, message=f"The {model_name} was not added")


@app.route("/api_super_user_crud_logs", methods=["POST"])
def api_super_user_crud_logs():

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )

    if user["role_name"] == "super user":
        crud_log_records = []
        crud_logs = Log.query.filter(Log.level=="CRUD").all()
        for crud_log in crud_logs:
            crud_log_record = crud_log.get_dict()
            crud_log_records.append(crud_log_record)
        return dict(
            rc=0,
            message=f"Log records retrieved",
            records=crud_log_records,
        )    
    else:
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )


@app.route("/api_update_db", methods=["POST"])
def api_update_db():

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )

    try:
        # get the contents of the package
        api_package = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (1)",
        )

    try:
        # we must have a model_name with a model
        model_name = api_package["model_name"]
        Model = Models[model_name]
        operation = api_package["operation"]

    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
        )

    try:
        data = api_package["data"]
        update_package = data["update_package"]
        id = update_package["id"]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
        )

    # does this user have authority
    if model_name == "User":
        authorised = Model.is_user_authorised(user, operation, update_package)
    else:
        authorised = Model.is_user_authorised(user, operation)

    if not authorised:
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"You don't have sufficient authority to perform the {operation}",
        )

    # if we are here, then we are good to go

    if operation == "create":
        # create a new template record
        record_to_update = Model()
    elif operation == "update":
        # get the record to update
        record_to_update = Model.query.filter_by(id=update_package["id"]).first()

        # check we got a valid record
        if not record_to_update.id == update_package["id"]:
            # throttle it
            # We need to do a throttle here that will not block the whole flask process
            return dict(
                rc=16,
                message=f"The {model_name} was not updated",
            )

    # now update it
    update_package_db = Model.update_from_dictionary(record_to_update, update_package)

    # If we didn't manage to apply the model get out
    if update_package_db["rc"] > 0:
        return dict(
            rc=4,
            message_text=f"There was a serious error and the update has not been applied: {update_package_db['message']} ",
            message_category="danger",
        )

    try:
        # how to process create
        if operation == "create":
            db.session.add(record_to_update)
        test = db.session.commit()
        app.logger.crud(f"[UPDATE] user_email:{user['email']} updated a {model_name} the following record: \n{update_package}")
        record_as_dict = record_to_update.get_dict()
        return dict(
            rc=0, message=f"The {model_name} was updated", record=record_as_dict
        )
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        db.session.rollback()
        db.session.flush()  # for resetting non-commited .add()
        return dict(
            rc=16,
            message=f"The {model_name} was not updated",
        )


@app.route("/api_get_records_db", methods=["POST"])
def api_get_records_db():

    time_started = time.time()

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )  

    # define the operation
    operation = "read"

    try:
        # get the contents of the package
        api_package = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (1)",
            records=[],
        )

    try:
        # we must have a model_name with a model
        model_name = api_package["model_name"]
        Model = Models[model_name]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
            records=[],
        )

    # does this user have authority
    if not Model.is_user_authorised(user, operation):
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"You don't have sufficient authority to perform the {operation}",
            records=[],
        )

    try:
        data = api_package["data"]
        filter_package = data["filter_package"]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
            records=[],
        )

    # if we are here, then we are good to go
    query = Model.query
    filters = []
    for column_name, column_criteria in filter_package.items():
        mapper = class_mapper(Model)
        if not hasattr(mapper.columns, column_name):
            continue
        filters.append(
            computed_operator(mapper.columns[column_name], f"{column_criteria}")
        )

    query = query.filter(*filters)
    results = query.all()

    # Now package them up in a list of dictionaries
    records = []
    for result in results:
        record = result.get_dict()
        records.append(record)

    gather_and_log_response_times(f"api_get_records [{model_name}]", time_started)

    return dict(
        rc=0,
        message=f"",
        records=records,
    )


@app.route("/api_delete_record_db", methods=["POST"])
def api_delete_record_db():

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )

    # define the operation
    operation = "delete"

    try:
        # get the contents of the package
        api_package = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (1)",
        )

    try:
        # we must have a model_name with a model
        model_name = api_package["model_name"]
        Model = Models[model_name]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {operation} again (2)",
        )

    # does this user have authority
    if not Model.is_user_authorised(user, "delete"):
        app.logger.critical(
            f"[CRITICAL] User with user.id {user} attempting to delete records from {model_name}"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"You don't have sufficient authority to perform the {operation}",
        )

    # If we get to here then we are good to execute the operation

    # api_package contains a dictionary called delete_package:
    # model = "User"
    # data = {dict with id that needs deleting}

    # return a package:
    # rc = integer return code [0 means ok, 4 means not applied]
    # message_text = "A user facing message suitable to be displayed on th screen "
    # message_category = "success" or "warning" or "danger"

    if not "data" in api_package:
        app.logger.warning(
            f"[WARNING] User with user.id {user} attempting to delete records from {model_name}"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message_text=f"There was a serious error and the record {operation} was not succesful",
            message_category="danger",
        )
    else:
        data = api_package["data"]

    if not "delete_package" in data:
        app.logger.warning(
            f"[WARNING] User with user.id {user} attempting to delete records from {model_name}"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message_text=f"There was a serious error and the record {operation} was not succesful",
            message_category="danger",
        )
    else:
        delete_package = data["delete_package"]

    # this operation requires an id
    try:
        id = int(delete_package["id"])
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message_text=f"There was a serious error and the record {operation} was not succesful",
            message_category="danger",
        )

    # get the record to we need
    record_to_delete = Model.query.filter_by(id=id).first()

    # check we got a valid record
    if record_to_delete.id == id:

        record_to_delete.is_deleted = True

        try:
            db.session.commit()
            app.logger.crud(f"[DELETE] user_email:{user['email']} deleted a {model_name} the following record: \n{delete_package}")
            return dict(rc=0, message=f"The {model_name} was deleted")
        except Exception as err:
            app.logger.exception(f"[EXCEPTION] err was {err}")
            db.session.rollback()
            db.session.flush()  # for resetting non-commited .add()
            app.logger.exception(f"[EXCEPTION] err was {err}")
            return dict(
                rc=16,
                message=f"There was a serious error and the record {operation} was not succesful",
            )

    else:
        app.logger.warning(
            f"[WARNING] User with user.id {user} attempting to delete records from {model_name}"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"There was a serious error and the record {operation} was not succesful",
        )


@app.route("/api_crud_task", methods=["POST"])
def api_crud_task():

    # [STANDARD BLOCK] first create a guard barrier such that only authenticated users can pass
    user = get_user_from_request(request)
    if not user["logged_in"]:
        app.logger.warning(
            f"[ACCESS] Attempt to access {request.path} with no valid credentials. Could be an attack"
        )        
        return dict(
            rc=16,
            message=f"You do not have the correct authorisation for this api",
        )

    model_name = "Task"

    try:
        # get the contents of the package
        payload = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the operation again (1)",
        )

    try:
        # we must have a crud_operation and a task
        crud_operation = payload["crud_operation"]
        task = payload["task"]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the {crud_operation} again (2)",
        )

    crud_authorities = dict(
        create=["super user", "ho user"],
        read=["user", "ho brand user", "ho user", "super user"],
        update=["super user", "ho user"],
        delete=["super user", "ho user"],
    )
    # does this user have authority
    if not user["role_name"] in crud_authorities[crud_operation]:
        app.logger.warning(
            f"[WARNING] User with user.id {user} attempting to do {crud_operation} on  a task record"
        )
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"You don't have sufficient authority to perform the {crud_operation}",
        )

    # If we get to here then we are good to execute the operation

    """
        Big step to get to here 
        we now need to 
        set the name and description  for the main task table using the task id 
        delete the brand_task records using the task id again
        insert the task_brand records from the tables in task driven by entries in the brands_tickboxes
        There must be a date for each one 
    """
    message = ""

    if crud_operation == "create":

        record_to_create = Task(
            programme_id=task["programme_id"],
            name=task["name"],
            description=task["description"],
            category=task["category"],
        )
        db.session.add(record_to_create)

        try:
            db.session.commit()
            app.logger.crud(f"[CREATE] user_email:{user['email']} created a {model_name} the following task: \n{task}")
            rc = 0
            message = f"The task was created "
            task["id"] = record_to_create.id

        except Exception as err:
            app.logger.exception(f"[EXCEPTION] err was {err}")
            db.session.rollback()
            db.session.flush()  # for resetting non-commited .add()
            return dict(
                rc=16,
                message=f"There was a serious error and the task delete was not succesful {message} ",
            )
    elif crud_operation == "delete":

        record_to_delete = Task.query.filter_by(id=task["id"]).first()
        if record_to_delete.id == task["id"]:

            record_to_delete.is_deleted = True

            try:
                db.session.commit()
                app.logger.crud(f"[DELETE] user_email:{user['email']} deleted a {model_name} the following task: \n{task}")
                rc = 0
                message = f"The task was deleted "
                task["is_deleted"] = True
            except Exception as err:
                app.logger.exception(f"[EXCEPTION] err was {err}")
                db.session.rollback()
                db.session.flush()  # for resetting non-commited .add()
                return dict(
                    rc=16,
                    message=f"There was a serious error and the task delete was not succesful {message} ",
                )

    elif crud_operation == "update":

        # do the name and description
        record_to_update = Task.query.filter_by(id=task["id"]).first()
        if record_to_update.id == task["id"]:

            record_to_update.name = task["name"]
            record_to_update.description = task["description"]

            try:
                db.session.commit()
                app.logger.crud(f"[UPDATE] user_email:{user['email']} updated a {model_name} the following task: \n{task}")
                rc = 0
                message = f"The task was updated {message} "
            except Exception as err:
                app.logger.exception(f"[EXCEPTION] err was {err}")
                db.session.rollback()
                db.session.flush()  # for resetting non-commited .add()
                return dict(
                    rc=16,
                    message=f"There was a serious error and the task update was not succesful",
                )

            # now get the task_brand records
            task_brands_to_delete = Task_brand.query.filter_by(
                task_id=task["id"]
            ).delete()

            # now add them back with the latest settings
            # The ui ensures that the tick_box and date_for are synchronised
            # date_for data
            # we need the brand_id that the ui task does not give us
            # so get that first
            brands = Brand.query.all()
            brands_as_dictionary = {}
            for brand in brands:
                brands_as_dictionary[brand.name] = dict(name=brand.name, id=brand.id)

            # >>> me = User('admin', 'admin@example.com')
            # >>> db.session.add(me)
            # >>> db.session.commit()

            # the tick bos indicates truth so we use that to only include brands that are ticked
            for brand_date_from_name in task["brands_dates"]:
                if not brand_date_from_name in task["brands_tick_box"]:
                    continue
                # MySQL retrieves and displays DATETIME values in ' YYYY-MM-DD hh:mm:ss ' format
                brand_dates = (task["brands_dates"][brand_date_from_name])
                date_start = brand_dates["date_start"]
                date_due = brand_dates["date_due"]
                brand_id = brands_as_dictionary[brand_date_from_name]["id"]
                record = Task_brand(
                    task_id=task["id"], brand_id=brand_id,date_start=date_start, date_due=date_due, 
                )
                db.session.add(record)

            # now commit the delete and add new records
            try:
                db.session.commit()
                app.logger.crud(f"[CREATE] user_email:{user['email']} created a Task_brand the following task: \n{task}")
                rc = 0
                message = f"The task brand dates were updated "
            except Exception as err:
                app.logger.exception(f"[EXCEPTION] err was {err}")
                db.session.rollback()
                db.session.flush()  # for resetting non-commited .add()
                return dict(
                    rc=16,
                    message=f"There was a serious error and the task update was not succesful",
                )

            # Now do the blocked_suggestions - start by deleting the existing ones and completely replace
            # now get the task_brand records
            blocked_suggestions_to_delete = Blocked_suggestion.query.filter_by(
                task_id=task["id"]
            )
            blocked_suggestions_to_delete.delete()
            for blocked_suggestion in task["blocked_suggestions"]:
                if blocked_suggestion["description"]:
                    new_blocked_suggestion = Blocked_suggestion()
                    new_blocked_suggestion.update_from_dictionary(blocked_suggestion)
                    db.session.add(new_blocked_suggestion)

                you_can_break_here = True

            # now commit the delete and add new records
            try:
                db.session.commit()
                app.logger.crud(f"[CREATE] user_email:{user['email']} created a Blocked_suggestion the following task: \n{task}")
                rc = 0
                message = f"The task brand dates were updated "
            except Exception as err:
                app.logger.exception(f"[EXCEPTION] err was {err}")
                db.session.rollback()
                db.session.flush()  # for resetting non-commited .add()
                return dict(
                    rc=16,
                    message=f"There was a serious error and the task suggestions update was not succesful",
                )
            you_can_break_here = True

    return dict(
        rc=rc,
        message=message,
        task=task,
    )


@app.route("/api_send_support_emails", methods=["POST"])
def api_send_support_emails():

    # get the log records where an email needs sending
    all_logs_needing_emails = Log.get_logs_needing_emails()

    # strip off the fake ones
    fake_message = "[INITIALISING] Testing that a exception log comes out as we are in development environment"
    logs_needing_email = []
    for log_needing_email in all_logs_needing_emails:
        if log_needing_email.msg == fake_message:
            log_needing_email.update_email_sent()
            continue
        logs_needing_email.append(log_needing_email)

    count_required = len(logs_needing_email)
    if count_required > 0:
        sent = send_support_email_failure_01(logs_needing_email)

        if sent:
            for log_needing_email in all_logs_needing_emails:
                log_needing_email.update_email_sent()

    message = f"The number of logs needing an email was: {count_required}."
    return dict(rc=0, message=message)


def send_support_email_failure_01(logs):

    email_html = """
        <p>Hi Support,</p>
        <p>
            There has been a critical failure of the readiness-tracker and you should be aware of the following logs
        </p>

        {%- for log in logs %}
        <hr>
        <p></p>
        <p>{{ log.created_timestamp }}</p>
        <p>{{ log.level }}</p>
        <p>{{ log.msg }}</p>
        <p>{{ log.trace }}</p>

        {% endfor %}
        
        <hr>
        
        <p>Cheers</p>
        <p>The dt-squad supporting your readiness tracker</p>    
        <p>PS To get help for this subject, call Peter on 07921 352128</p>    
    """
    email_text = """
Hi Support

There has been a critical failure of the readiness-tracker
{%- for log in logs %}

{{ log.created_timestamp }}

{{ log.level }}

{{ log.msg }}

{{ log.trace }} 

==========================================================================
{% endfor %}

Cheers,

The dt-squad supporting your readiness tracker  

PS To get help for this subject, call Peter on 07921 352128
    """
    sent = True
    try:

        did_it_send = send_email(
            "There have been some log events for readiness-tracker",
            sender=app.config["ADMINS"][0],
            recipients=app.config["ADMINS"],
            text_body=render_template_string(email_text, logs=logs),
            html_body=render_template_string(email_html, logs=logs),
            send=True,
        )
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        sent = False

    return sent


@app.route("/api_reset_password_request", methods=["POST"])
def api_reset_password_request():

    # this triggers an email to be sent to the user
    # we can throttle responses as it requires no immediate feedback

    try:
        api_package = request.get_json()
        if "email" in api_package:
            email = api_package["email"]
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(rc=16, message="No email arrived, try again")

    # user = User.query.filter_by(email=email).first()
    user = User.get_user_by_email(email)

    if user:
        try:
            send_password_reset_email(user)
        except Exception as err:
            app.logger.exception(f"[EXCEPTION] err was {err}")


    else:
        # we should put a warning out at least in case we are being swamped
        app.logger.warning(
            f"[WARNING] User with email: {email} attempting a password reset. If there are many of these, an attack could be underway"
        )

    return dict(
        rc=0,
        message="If that email address is registered, then a reset email has been sent to it",
    )


@app.route("/api_reset_password/", methods=["POST"])
def api_reset_password():

    """
    The user clicks on an email link with a token and it must serve the reset_password page in vue
    that must then call this api route with a new password

    It's low volume in normal circumstances
    """

    try:
        api_package = request.get_json()

        password_1 = api_package["input"]["password_1"]
        password_2 = api_package["input"]["password_2"]
        password_reset_token = api_package["input"]["password_reset_token"]
        if not password_1 == password_2:
            1 / 0
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        return dict(
            rc=16,
            message="No passwords or token arrived or passwords not the same, try again",
        )

    # see if the token is valid
    try:
        user_id = User.verify_token(
            password_reset_token, token_purpose="reset_password"
        )
        if user_id:
            # check complexity
            if is_strong_enough(password_1):
                user = User.query.get(user_id)
                user.set_password(password_1)
                db.session.commit()
                app.logger.crud(f"[UPDATE] user_id:{user_id} updated a User record to change the password")
            else:
                return dict(rc=4, message=f"The password does not have sufficient complexity")

        else:
            return dict(rc=4, message=f"The password was not updated")

    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        return dict(rc=4, message=f"The password was not updated")

    return dict(
        rc=0, 
        message="The password was updated. You can now log in using that password",
    )


@app.route("/api_do_log_deletions", methods=["POST"])
def api_do_log_deletions():
    """
    This route deletes log records according to an aging hierarchy
    It is executed as part of a regular automated task
    """
    try:
        number_deleted = Log.delete_old_logs()
        rc=0
    except:
        number_deleted = -1
        rc=4
    return dict(
        rc=rc, 
        message=f"{number_deleted} old logs have been deleted",
    )


@app.route("/api_keep_mysql_alive", methods=["POST"])
def api_keep_mysql_alive():


    """
    This is needed because pythonanywhere seems to have very problematic mysql connections that just disappear
    It causes an ungraceful failure in the browser when it occurs

    This is the smallest amount of work that can be done to keep the connections open
    It works in conjunction with an always on python script called keep_mysql_alive.py

    Obviously, it would be better not to use such a hacky process
    The documentation says there are two sqlalchemy configuraion settings that should completely prevent
    app.config["SQLALCHEMY_ENGINE_OPTIONS "] = {"pool_pre_ping": True, "pool_recycle": 200}
    I tried those but the errors remained
    """

    try:
        __just_need_to_read__ = (
            Role.query.filter_by(name="super user").first().get_dict()
        )
        db.session.close()
        return dict(
            rc=0,
            message=f"MySQL is alive a role name is: {__just_need_to_read__['name']}",
        )
    except Exception as err:
        try:
            app.logger.exception(f"[EXCEPTION] err was {err}")
        except:
            pass
        return dict(rc=8, message=f"MySQL is dead. The error is: {err}")
@app.route("/api_ivan", methods=["POST"])
def api_ivan():
    return dict(name="Ivan")

@app.route("/api_ivan_add_user", methods=["POST"])
def api_ivan_add_user():
    try:
        # get the contents of the package
        payload = request.get_json()
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try the operation again (1)",
        )

    return 



@app.route("/api_check_only_one_super_user", methods=["POST", "GET"])
def api_check_only_one_super_user():

    """
    This checks that only one super user exists on the database
    """

    try:
        super_user_role_id = Role.query.filter_by(name="super user").first().id
        super_users = User.query.filter_by(role_id=super_user_role_id)
        super_users_list = []
        for super_user in super_users:
            super_users_list.append(super_user.get_dict())

        if not super_users.count() == 1:
            # we have a problem
            app.logger.critical(
                f"[ACCESS] There is more than one super user and there should not be. This could be part of an ongoing attack. The users are:\n {super_users_list}"
            )
        else:
            # we only have one, let's check it's who it's supposed to be
            super_user =super_users_list[0] 
            super_user_email_from_dot_env = os.environ.get("super_user_email")
            if not super_user_email_from_dot_env == super_user["email"]:
                # we have a problem
                app.logger.critical(
                    f"[ACCESS] The super user does not appear to be who they should be . The user in question is: \n {super_users_list}"
                )

        return dict(
            rc=0,
            message=f"The number of super users is: {super_users.count()}",
        )
    except Exception as err:
        try:
            app.logger.exception(f"[EXCEPTION] err was {err}")
        except:
            pass
        return dict(rc=8, message=f"Could not complete the api. The error is: {err}")


@app.route("/favicon.png")
@app.route("/favicon.ico")
def favicon():

    # temporary 
    Log.update_all_to_latest_pii_key()
    User.update_all_to_latest_pii_key()

    path_for_favicon = os.path.join(app.root_path, "templates")
    return send_from_directory(
        path_for_favicon, "favicon.png", mimetype="image/vnd.microsoft.icon"
    )


def get_user_from_request(request, refresh_encoded_jwt=False):

    # Every api needs a legitimiate user to be signed in and to have a
    # properly encoded jwt
    # If the jwt is missing or invalid (other than being timed out) then
    # the reponse is throttled with a 1 second sleep

    '''
        There are further enhancement that we can do to improve security
        1   Always verify this is a POST reuest and discard anything that is not 
        2   Verify the source origin and the target origin match
        todo: further investigate and deploy if suitable
    '''

    api_package = request.get_json()

    user = dict(logged_in=False, role_name=None)

    if not "encoded_jwt" in api_package:
        # throttle the responses
        # We need to do a throttle here that will not block the whole flask process
        return user

    if not api_package["encoded_jwt"]:
        # throttle the responses
        # We need to do a throttle here that will not block the whole flask process
        return user

    # so we hav an encoded jwt - let's see if it any good
    encoded_jwt = api_package["encoded_jwt"]

    try:

        decoded_jwt = jwt.decode(encoded_jwt, app.secret_key, algorithms="HS512")

        now = datetime.datetime.now(tz=datetime.timezone.utc).timestamp()

        user_from_db = User.get_user_by_email(decoded_jwt["email"]) 

        if user_from_db.is_deleted:
            user["logged_in"] = False
        else:

            if "email" in decoded_jwt:
                user["email"] = decoded_jwt["email"]

            user["logged_in"] = True

            # get the role_name from the user.role_id
            role = Role.query.filter_by(id=user_from_db.role_id,is_deleted=False,).first()

            user["role_name"] = role.name

            if "loggedOnAtSeconds" in decoded_jwt:
                user["seconds_remaining"] = int(
                    SESSION_EXPIRES_SECONDS - (now - decoded_jwt["loggedOnAtSeconds"])
                )

    except Exception as err:
        try:
            if err.args[0] == "Signature has expired":
                pass
            elif err.args[0] == "Signature verification failed":
                # throttle the responses
                # We need to do a throttle here that will not block the whole flask process
                app.logger.warning(
                    f"[WARNING] err was {err} - can come from corrupted jwt if it happens often then could be attack"
                )
        except:
            # throttle the responses
            # We need to do a throttle here that will not block the whole flask process
            app.logger.exception(f"[EXCEPTION] err was {err}")

    return user


def is_strong_enough(password):

    strong_enough = True

    # at least 8 characters long
    if len(password) < 8:
        strong_enough = False

    if len(password) > 64:
        strong_enough = False

    # count the occurreences of each character
    character_dictionary = {}
    for character in password:
        try:
            character_dictionary[character] = character_dictionary[character] + 1
        except:
            character_dictionary[character] = 1

    # if any character makes up more than half
    for character in character_dictionary:
        count = character_dictionary[character]
        if count / len(password) > 0.5:
            strong_enough = False

    # if there aren't at least 3 different characters
    if len(character_dictionary) < 3:
        strong_enough = False

    # check if it is in the list of bad pawords
    if password in bad_password_set:
        strong_enough = False

    return strong_enough


def send_password_reset_email(user):

    '''    
        There is a vulnerability with this method whereby the emailed link could be intercepted and used by a bad actor
        It can be mitigated by providing a secure token in a cookie when the user requests the reset 
        Then the link clicked api can also present the same token back so we effectively have confirmation that the original machine 
        that requested the reset is the same machine that is used to modify the password
        See more here: https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
        todo: remove the vulnerability 
    '''
    expires_in_seconds = 3*60
    token = user.get_token(token_purpose="reset_password", expires_in_seconds=3*60)
    href_link = (
        url_for("api_reset_password", _external=True)[0:-1]
        + "?password_reset_token="
        + token
    )
    href_link = href_link.replace("api_reset_password", "passwordresetview")

    user_dict = user.get_dict()

    reset_password_html = """
        <p>Hi {{ user_dict["name"] }}</p>
        <strong>This link is valid for {{ expires_in_seconds }} seconds from the time of sending.</strong>
        <p>
            To reset your password for the readiness tracker - 
            <a href="{{ href_link}}">
                click here
            </a>.
        </p>
        <p>Alternatively, you can paste the following link in your browser's address bar:</p>
        <p>{{ href_link }}</p>
        <p>If you have not requested a password reset simply ignore this message.</p>
        <p>Cheers</p>
        <p>The dt-squad supporting your readiness tracker</p>    
        <p>PS To get help for this subject, call Peter on 07921 352128</p>    
    """
    reset_password_text = """
Dear {{ user_dict["name"] }},

This link is valid for {{ expires_in_seconds }} seconds from the time of sending.

To reset your password for the readiness tracker click on the following link:

{{ href_link}}

If you have not requested a password reset simply ignore this message.

Cheers,

The dt-squad supporting your readiness tracker  

PS To get help for this subject, call Peter on 07921 352128
    """
    did_it_send = send_email(
        "Reset Your Password for the Readiness Tracker...",
        sender=app.config["ADMINS"][0],
        recipients=[user_dict["email"]],
        text_body=render_template_string(
            reset_password_text, user_dict=user_dict, href_link=href_link
        ),
        html_body=render_template_string(
            reset_password_html, user_dict=user_dict, href_link=href_link
        ),
        send=True,
    )

    return


def send_email(subject, sender, recipients, text_body, html_body, send=False):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    # do not sentd email for the moment
    if send:
        mail.send(msg)
    return


def gather_and_log_response_times(route_name, time_started):

    try:
        time_taken = time.time() - time_started

        timings = route_timings[route_name]
        timings.append(time_taken)

        if site_config["INSTANCE_TYPE"] == "development":
            critical_time = 0.5
            warning_time = 0.25
            info_time = 0.05
            debug_time = 0
        else:
            critical_time = 1
            warning_time = 0.5
            info_time = 0
            debug_time = 0


        if len(timings) > 10:
            average_response_time = sum(timings) / len(timings)
            route_timings[route_name] = []
            if average_response_time > 0.5:
                app.logger.critical(
                    f"[TIMING] response times for {route_name} are {round(average_response_time,3)} seconds"
                )
            elif average_response_time > 0.25:
                app.logger.warning(
                    f"[TIMING] response times for {route_name} are {round(average_response_time,3)} seconds"
                )
            elif average_response_time > 0.05:
                app.logger.info(
                    f"[TIMING] response times for {route_name} are {round(average_response_time,3)} seconds"
                )
            elif average_response_time > 0.00:
                app.logger.debug(
                    f"[TIMING] response times for {route_name} are {round(average_response_time,3)} seconds"
                )

    except:

        route_timings[route_name] = [time_taken]

    return


