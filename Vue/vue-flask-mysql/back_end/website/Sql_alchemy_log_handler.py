# partially inspired from here:
# https://docs.pylonsproject.org/projects/pyramid-cookbook/en/latest/logging/sqlalchemy_logger.html
# and here:
# https://matthewmoisen.com/blog/how-to-log-to-a-database-with-flask/
#
 
from website import db
from website.models import Log
import traceback
import logging
from website import site_config
 
class Sql_alchemy_log_handler(logging.Handler):
 
    def emit(self, record):
        # Trace contains the details if it fell over
        trace = None
 
        # did it fall over?
        exc_info = record.__dict__['exc_info']
 
        # if it did, get the trace to include in the log
        if exc_info:
            trace = traceback.format_exc()
       
        # construct the log record
        log = Log(
            logger=record.__dict__['name'],
            level=record.__dict__['levelname'],
            trace=trace,
            msg=record.__dict__['msg'],)
 
        try:
            # Try and write it out
            db.session.add(log)
            db.session.commit()
        except:
            # If we failed then roll it back
            db.session.rollback()
 
               

