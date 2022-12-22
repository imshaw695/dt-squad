 
import os
import datetime
 
this_directory = os.path.abspath(os.path.dirname(__file__))
import time
import logging
import mysql.connector
 
from dotenv import load_dotenv
 
load_dotenv(os.path.join(this_directory,"..", '.env'),override=True)
 
def get_db_connection():
    load_dotenv(os.path.join(this_directory, "..", ".env"), override=True)
    DB_USERNAME = os.environ.get("DB_USERNAME")
    database_password = os.environ.get("database_password")
    database_url = os.environ.get("database_url")
    database = os.environ.get("database")
 
    db_connection = mysql.connector.connect(
        host=database_url,
        user=DB_USERNAME,
        password=database_password,
        database=database,
    )
 
    # test the connection works
    cursor = db_connection.cursor()
    cursor.execute("select * from roles where id <0 limit 1;")
    for role in cursor:
        print(role)
 
    return db_connection
 
def get_csv_into_list_of_dictionaries(path_to_file):
 
    list_of_dictionaries = []
 
    with open(path_to_file) as file_handle:
        csv = file_handle.readlines()
 
    # remove the /n
 
    for line_index, line in enumerate(csv):
 
        # remove the /n
        line = line.replace("\n", "")
 
        if line_index == 0:
            labels = line.split(",")
            continue
 
        elements = line.split(",")
 
        if not len(elements) == len(labels):
            print(
                f"This line is malformed as the number of elements does not match the number of labels: {elements}"
            )
 
        dictionary = {}
        for element_index, element in enumerate(elements):
 
            label = labels[element_index]
            element = elements[element_index]
 
            if "date" in label:
                format_string = "%d/%m/%Y"
                if element:
                    try:
                        element = datetime.datetime.strptime(
                            element, format_string
                        ).isoformat()
                        you_can_break_here = True
                    except Exception as err:
                        pass
 
            dictionary[label] = element
 
        list_of_dictionaries.append(dictionary)
 
    return list_of_dictionaries
 
 
def get_sql(file_name):
 
    path_to_file = os.path.join(this_directory, "sql", file_name)
 
    with open(path_to_file) as file_handle:
        sql = file_handle.read()
 
    return sql
 
 
def records_to_list(records):
 
    records_as_list = []
 
    try:
 
        for record in records:
            row_as_almost_dict = record._mapping  # SQLAlchemy 1.4 and greater
            row_as_dict = {}
            for key in row_as_almost_dict:
                value = row_as_almost_dict[key]
                row_as_dict[key] = value
                you_break_here = True
            records_as_list.append(row_as_dict)
    except Exception as err:
        print(err)
 
    return records_as_list
 
 
def process_tasks_brands_01(records):
 
    # Create a timestamp for this result so if it changes, we can force a vue refresh
    # we are collapsing many task records into one task with an array of brands as that is better for the ui
    programmes = {}
 
    for record in records:
        # record = record._asdict()
 
        if not record["programme_name"] in programmes:
            programmes[record["programme_name"]] = dict(
                tasks_as_dict={}, tasks_as_list=[], id=record["programme_id"]
            )
        programme = programmes[record["programme_name"]]
 
        if not record["task_name"] in programme["tasks_as_dict"]:
            task = dict(
                name=record["task_name"],
                description=record["task_description"],
                brands_tick_box=[],
                brands_dates={},
                id=record["task_id"],
            )
            programme["tasks_as_dict"][record["task_name"]] = task
            programme["tasks_as_list"].append(task)
 
        task = programme["tasks_as_dict"][record["task_name"]]
 
        if record["brand_name"]:
            if not record["brand_name"] in task["brands_tick_box"]:
                task["brands_tick_box"].append(record["brand_name"])
                try:
                    task["brands_dates"][record["brand_name"]] = {}
                    task["brands_dates"][record["brand_name"]]["date_start"] = record.date_start.strftime("%Y-%m-%d")
                    task["brands_dates"][record["brand_name"]]["date_due"] = record.date_due.strftime("%Y-%m-%d")
 
                except Exception as err:
                    you_break_here = True
            else:
                you_break_here = True
 
        # xxxxxxxxxxxx = record["date_due"].strftime("%Y-%m-%d")
        # "yyyy-MM-dd"
 
        you_break_here = True
 
    # now remove the redundant tasks as dict
    for programme_name in programmes:
        programme = programmes[programme_name]
        del programme["tasks_as_dict"]
 
    programmes["time"] = time.time()
 
    return programmes
 
 
def is_user_authorised(user, operation, sql_package):
 
    crud_authorities = sql_package["crud_authorities"]
 
    if user["role_name"] in crud_authorities[operation]:
        authorised = True
    else:
        authorised = False
    return authorised
 
 
def get_cities():
    cities = """        Bath
        Birmingham
        Bradford
        Brighton & Hove
        Bristol
        Cambridge
        Canterbury
        Carlisle
        Chelmsford
        Chester
        Chichester
        Colchester
        Coventry
        Derby
        Doncaster
        Durham
        Ely
        Exeter
        Gloucester
        Hereford
        Kingston-upon-Hull
        Lancaster
        Leeds
        Leicester
        Lichfield
        Lincoln
        Liverpool
        London
        Manchester
        Milton Keynes
        Newcastle-upon-Tyne
        Norwich
        Nottingham
        Oxford
        Peterborough
        Plymouth
        Portsmouth
        Preston
        Ripon
        Salford
        Salisbury
        Sheffield
        Southampton
        Southend-on-Sea
        St Albans
        Stoke on Trent
        Sunderland
        Truro
        Wakefield
        Wells
        Westminster
        Winchester
        Wolverhampton
        Worcester
        York
        Armagh
        Bangor
        Belfast
        Lisburn
        Londonderry
        Newry
        Aberdeen
        Dundee
        Dunfermline
        Edinburgh
        Glasgow
        Inverness
        Perth
        Stirling
        Bangor
        Cardiff
        Newport
        St Asaph
        St Davids
        Swansea
        Wrexham    """
 
    cities = cities.split("\n")
    for index, city in enumerate(cities):
        cities[index] = city.strip()
 
    return cities
 
 
def get_names():
 
    boys_names = """
    Muhammad  +1    Oliver  -1    Harry  +1    Jack  +1    George  +3    Noah  -3    Leo  +8    Jacob  -1    Oscar  +2    Charlie  -4    Jackson  +14    William  +7    Joshua  +0    Ethan  -5    James  -3    Freddie  -2    Alfie  -1    Logan  +15    Lucas  +3    Finley  +0    Aiden  +6    Henry  -12    Archie  +1    Thomas  -6    Isaac  -4    Theo  -3    Mason  +4    Arthur  +7    Jayden  +18    Elijah  +22    Max  -14    Alexander  +0    Dylan  +3    Edward  +22    Reuben  +6    Louie  +32    Samuel  +2    Harrison  -9    Joseph  -13    Teddy  -2    Daniel  -11    Aaron  +24    Sebastian  -3    Adam  -16    Riley  +6    Liam  -3    Zachary  -3    Luca  +2    Elliot  -12    Benjamin  -16      Caleb  +6    Nathan  +3    Ahmad  new!    Jude  +4    Theodore  +29    John  +41    Hugo  +6    David  +3    Harvey  +13    Carter  +27    Jenson  +1    Syed  new!    Arlo  -3    Ollie  -11    Jake  -20    Matthew  -18    Ellis  +23    Hunter  new!    Ryan  -23    Luke  -16    Harley  new!    Ezra  +1    Rory  -2    Lewis  -32    Tyler  +8    Albie  +6    Finn  -10    Jesse  +2    Toby  -30    Michael  -15    Abdul  new!    Albert  +18    Eli  +10    Ali  -3    Bobby  +1    Austin  -12    Blake  +12    Stanley  -11    Reggie  +5    Roman  new!    Kai  -13    Gabriel  -13    Frankie  -8    Parker  new!    Ronnie  +1    Levi  new!    Tommy  +1    Evan  -3    Jamie  -24    Joel  new!  
    """
    girls_names = """
    Olivia  +0    Sophia  +1    Amelia  +2    Lily  -2    Emily  -1    Ava  +0    Isla  +0    Isabella  +0    Mia  +3    Isabelle  -1    Ella  +0    Poppy  +1    Freya  +7    Grace  +3    Sophie  -5    Evie  -2    Charlotte  -2    Aria  +5    Evelyn  +6    Phoebe  +2    Chloe  -5    Daisy  +4    Alice  -4    Ivy  +22    Darcie  +9    Sienna  +11    Harper  +29    Hannah  -1    Ruby  +0    Scarlett  -12    Maya  +0    Jessica  -11    Layla  +11    Matilda  +2    Willow  +7    Eva  -12    Emma  -5    Erin  +17    Florence  -1    Molly  +5    Rosie  +12    Millie  +1    Emilia  -15    Mila  +21    Esme  +16    Elsie  +8    Maisie  +0    Ellie  -9    Lucy  -19    Thea  -17      Zoe  -3    Nur  -1    Imogen  -4    Luna  +20    Lola  +3    Zara  -21    Maryam  +10    Bella  -1    Holly  -19    Annabelle  -10    Eleanor  -2    Eliza  +0    Amber  -11    Abigail  -23    Lyla  +15    Penelope  +3    Niamh  +31    Madison  new!    Violet  +6    Fatima  new!    Georgia  -7    Sarah  +16    Elizabeth  +0    Amelie  -14    Jasmine  -12    Harriet  -4    Rose  -6    Lexi  -1    Nancy  +4    Anna  -12    Amy  new!    Leah  +3    Summer  -5    Lottie  -2    Ayla  +15    Orla  -2    Clara  -17    Robyn  +3    Gracie  -3    Heidi  -11    Lara  +3    Maria  -16    Felicity  -3    Sara  +1    Aurora  new!    Megan  -15    Martha  +0    Arabella  new!    Hallie  new!    Skye  new!  
    """
 
    names = girls_names + " " + boys_names
    names = names.split(" ")
    new_names = []
    for name in names:
        if len(name) > 3:
            if not "!" in name:
                new_names.append(name)
 
    return sorted(new_names)
 
def addLoggingLevel(levelName, levelNum, methodName=None):
    """
    From here:
        https://stackoverflow.com/questions/2183233/how-to-add-a-custom-loglevel-to-pythons-logging-facility/35804945#35804945
       
    Comprehensively adds a new logging level to the `logging` module and the
    currently configured logging class.
 
    `levelName` becomes an attribute of the `logging` module with the value
    `levelNum`. `methodName` becomes a convenience method for both `logging`
    itself and the class returned by `logging.getLoggerClass()` (usually just
    `logging.Logger`). If `methodName` is not specified, `levelName.lower()` is
    used.
 
    To avoid accidental clobberings of existing attributes, this method will
    raise an `AttributeError` if the level name is already an attribute of the
    `logging` module or if the method name is already present
 
    Example
    -------
    >>> addLoggingLevel('TRACE', logging.DEBUG - 5)
    >>> logging.getLogger(__name__).setLevel("TRACE")
    >>> logging.getLogger(__name__).trace('that worked')
    >>> logging.trace('so did this')
    >>> logging.TRACE
    5
 
    """
    if not methodName:
        methodName = levelName.lower()
 
    if hasattr(logging, levelName):
       raise AttributeError('{} already defined in logging module'.format(levelName))
    if hasattr(logging, methodName):
       raise AttributeError('{} already defined in logging module'.format(methodName))
    if hasattr(logging.getLoggerClass(), methodName):
       raise AttributeError('{} already defined in logger class'.format(methodName))
 
    # This method was inspired by the answers to Stack Overflow post
    # http://stackoverflow.com/q/2183233/2988730, especially
    # http://stackoverflow.com/a/13638084/2988730
    def logForLevel(self, message, *args, **kwargs):
        if self.isEnabledFor(levelNum):
            self._log(levelNum, message, args, **kwargs)
    def logToRoot(message, *args, **kwargs):
        logging.log(levelNum, message, *args, **kwargs)
 
    logging.addLevelName(levelNum, levelName)
    setattr(logging, levelName, levelNum)
    setattr(logging.getLoggerClass(), methodName, logForLevel)
    setattr(logging, methodName, logToRoot)
 
def get_git_data():
    this_directory = os.path.abspath(os.path.dirname(__file__))
 
    # navigate to the repo root and save that in this object
    search_directory = this_directory
    repo_root_found = False
    while not repo_root_found:
        entries = os.listdir(search_directory)
        if ".git" in entries:
            repo_root = search_directory
            break
        else:
            search_directory = os.path.dirname(search_directory)
        pass  
 
    git_data = {}
    git_data["repo_root"] = repo_root
 
    # now look for the current head
    path_to_head = os.path.join(repo_root, ".git", "ORIG_HEAD")
    with open(path_to_head) as file_handle:
        data = file_handle.readlines()
        elements = data[0].split("/")
        branch_sha_remote = elements[-1].replace("\n", "")
        git_data["branch_sha_remote"] = branch_sha_remote
 
    # now look for the current head
    path_to_head = os.path.join(repo_root, ".git", "HEAD")
    with open(path_to_head) as file_handle:
        data = file_handle.readlines()
        elements = data[0].split("/")
        branch_name = elements[-1].replace("\n", "")
        git_data["branch_name"] = branch_name
 
    # now look for the local branch sha head
    path_to_head = os.path.join(repo_root, ".git", "refs", "heads", branch_name)
    with open(path_to_head) as file_handle:
        data = file_handle.readlines()
        elements = data[0].split("/")
        branch_sha_local = elements[-1].replace("\n", "")
        git_data["branch_sha_local"] = branch_sha_local
 
    return git_data
 
if __name__ == "__main__":
 
    git_data = get_git_data()
 
    addLoggingLevel('CRUD', logging.DEBUG - 5)
    logging.getLogger(__name__).setLevel("CRUD")
    logging.getLogger(__name__).crud('that worked')
    logging.crud('so did this')
    logging.crud
 
    cities = get_cities()
    names = get_names()
 
    path_to_csv = os.path.join(
        this_directory, "bulk_loads", "volkswagen_task_bulk_load.csv"
    )
    dictionary = get_csv_into_list_of_dictionaries(path_to_csv)
 
    user = dict(role_name="user")
    sql_package = dict(
        crud_authorities=dict(read=["user", "super user"], create=["super user"])
    )
    operation = "read"
    authorised = is_user_authorised(user, operation, sql_package)
    print(authorised)
 
    operation = "create"
    authorised = is_user_authorised(user, operation, sql_package)
    print(authorised)
 

