# This is inspired by the article here:
# https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xv-a-better-application-structure
#

import platform
import os
import socket
import logging

from flask import Flask
from flask_mail import Mail

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from website.utilities import get_sql, addLoggingLevel
from website.get_bad_password_set import get_bad_password_set

# instantiate the migrate for initialisation with app and db later
# to create the files and fiolders in the first instance, you need to
# execute "flask db init" from the conda command window in the project top level directory
migrate = Migrate()

# instantiate db for initialisation with app later
db = SQLAlchemy()

# create the holder for site config stuff
site_config = {}
site_config["platform"] = platform.system()
site_config["base_directory"] = os.path.abspath(os.path.dirname(__file__))
site_config["host_name"] = socket.gethostname()
site_config[
    "environment"
] = f'host:{site_config["host_name"]}, platform:{site_config["platform"]}'
site_config["INSTANCE_TYPE"] = os.environ.get("INSTANCE_TYPE")

# instantiate Mail for initialisation with app later
mail = Mail()

# get the set of bad passwords so we can check against them
bad_password_set = get_bad_password_set()

# Check the .env file contains valid pii_encryption keys and stop if it fails to do that
# from website.pii_data_handlers import test_get_encryption_keys_from_dot_env

# if not test_get_encryption_keys_from_dot_env():
#     # Put a very hard break here
#     print("[CRITICAL] The pii encryption keys are not configured correctly ")
#     1 / 0
# else:
#     you_can_break_here = True


def create_app():
    # Create Flask application.
    this_directory = os.path.abspath(os.path.dirname(__file__))
    static_folder = os.path.join(this_directory, "templates", "static")
    # print(static_folder)
    app = Flask(
        __name__,
        instance_relative_config=False,
        static_folder=static_folder,
        static_url_path="/static",
    )
    app.config.from_object("config.Config")

    with app.app_context():

        # now all the initiations
        db.init_app(app)
        migrate.init_app(app, db=db)
        mail.init_app(app)
        app.extensions["mail"].debug = 0

        # set up the logging
        addLoggingLevel("CRUD", logging.INFO + 1)
        # logging.getLogger(__name__).setLevel("CRUD")
        # logging.getLogger(__name__).crud('that worked')
        # logging.crud('so did this')
        # logging.crud

        # set up logging to data base
        from website.Sql_alchemy_log_handler import Sql_alchemy_log_handler

        sql_alchemy_log_handler = Sql_alchemy_log_handler()
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
        sql_alchemy_log_handler.setFormatter(formatter)
        app.logger.addHandler(sql_alchemy_log_handler)

        # set the log level dependent on the environment
        if site_config["INSTANCE_TYPE"] in ["production"]:
            app.logger.setLevel(logging.INFO)
        else:
            app.logger.setLevel(logging.DEBUG)
            try:
                1 / 0
            except:
                app.logger.crud(
                    "[INITIALISING] Testing that a crud log comes out as we are in development environment"
                )
                app.logger.exception(
                    "[INITIALISING] Testing that a exception log comes out as we are in development environment"
                )

        app.logger.info("[INITIALISING] Testing that a info log comes out")
        app.logger.debug("[INITIALISING] Testing that a debug log comes out")

        # import the routes
        from website import routes

        # all is set up correctly so return the app
        return app
