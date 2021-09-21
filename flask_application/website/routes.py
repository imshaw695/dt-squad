# Import relevant modules
from flask import request, render_template, redirect, session, flash
from flask.helpers import url_for
from datetime import timedelta

# Import the Flask webapp instance that we created in the __init__.py
from website import app
from website.bjj_data import move_types, positions, grips, put_persisted_data, all_data

app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(minutes=15)
# Define our first route (the last part of the url for our website application)
# We can define what urls should land in this function. Let's say / and /index
# We can also define the legitimate methods for this page of GET and POST

@app.route("/index", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def index():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments =  request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # When pages contain a form, we can access the variables in this function 
    # if the form was submitted 
    # Create a default form_package in case the form not submitted 
    form_package = {}
    # And now check to see if the form was actually submitted 
    if request.method == "POST":

        # pull the form fields into a dictionary for ease 
        form_package = request.form.to_dict(flat=False)

        # print the form fields to the console so we can see it was submitted 
        print(f"\nThe form was submitted. The data is:\n{form_package}\n")

    return render_template ('index.html',
                            form_package = form_package,
                            url_arguments = url_arguments) 

@app.route("/", methods=["GET", "POST"])
@app.route("/index_v2", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page

def index_v2():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments =  request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # When pages contain a form, we can access the variables in this function 
    # if the form was submitted 
    # Create a default form_package in case the form not submitted 
    form_package = {}
    # And now check to see if the form was actually submitted 
    if request.method == "POST":

        # pull the form fields into a dictionary for ease 
        form_package = request.form.to_dict(flat=False)

        # print the form fields to trhe console so we can see it was submitted 
        print(f"\nThe form was submitted. The data is:\n{form_package}\n")

    return render_template ('index_v2.html',
                            form_package = form_package,
                            url_arguments = url_arguments,
                            move_types = move_types,
                            grips = grips,
                            positions = positions) 

@app.route("/update_entry", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page

def update_entry():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments =  request.args.to_dict(flat=False)

    if 'position_id' in url_arguments:
        position_id = url_arguments['position_id'][0]
        entry = positions[position_id]

    if 'grip_id' in url_arguments:
        grip_id = url_arguments['grip_id'][0]
        entry = grips[grip_id]


    # if there are any url arguments, print them to the console here
    # create a form which prints out the name and description, edit them, and then take that
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # When pages contain a form, we can access the variables in this function 
    # if the form was submitted 
    # Create a default form_package in case the form not submitted 
    form_package = {}
    # And now check to see if the form was actually submitted 
    if request.method == "POST":

        # pull the form fields into a dictionary for ease 
        form_package = request.form.to_dict(flat=False)
        new_name = form_package["name"][0]
        new_description = form_package["description"][0]

        updated_entry = {}
        updated_entry['name'] = new_name
        updated_entry['id'] = new_name.replace(" ", "_").lower()
        updated_entry['description'] = new_description
        print(updated_entry)

        if updated_entry['id'] in grips:
            print(grips[updated_entry['id']])
            grips[updated_entry['id']]['name'] = new_name
            grips[updated_entry['id']]['description'] = new_description
            print(grips[updated_entry['id']])
            put_persisted_data(all_data)

        # print the form fields to trhe console so we can see it was submitted 
        print(f"\nThe form was submitted. The data is:\n{form_package}\n")

    return render_template ('update_entry.html',
                            form_package = form_package,
                            url_arguments = url_arguments,
                            entry = entry,
                            ) 

@app.route("/bjj", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def bjj():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments =  request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # When pages contain a form, we can access the variables in this function 
    # if the form was submitted 
    # Create a default form_package in case the form not submitted 
    form_package = {}
    # And now check to see if the form was actually submitted 
    if request.method == "POST":

        # pull the form fields into a dictionary for ease 
        form_package = request.form.to_dict(flat=False)

        # print the form fields to trhe console so we can see it was submitted 
        print(f"\nThe form was submitted. The data is:\n{form_package}\n")

    return render_template ('bjj.html',
                            form_package = form_package,
                            url_arguments = url_arguments) 
@app.route("/full_guard", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def full_guard():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments =  request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # When pages contain a form, we can access the variables in this function 
    # if the form was submitted 
    # Create a default form_package in case the form not submitted 
    form_package = {}
    # And now check to see if the form was actually submitted 
    if request.method == "POST":

        # pull the form fields into a dictionary for ease 
        form_package = request.form.to_dict(flat=False)

        # print the form fields to trhe console so we can see it was submitted 
        print(f"\nThe form was submitted. The data is:\n{form_package}\n")

    return render_template ('full_guard.html',
                            form_package = form_package,
                            url_arguments = url_arguments) 
@app.route("/new_content", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def new_content():

    if request.method == "POST":
        # I would like the data submitted in the form to be added to the bjj_data moves dictionary  
        # Somehow I need to append it to the dictionary and identify the move_type to put it all under
        # instead of below, just make a new dictionary called new_content or something and populate that
        # pull the form fields into a dictionary for ease 
        form_package = request.form.to_dict(flat=False)
        print(form_package)
        
        move_type = form_package["move_type"][0]
        position = form_package["position"][0]
        grip = form_package["grip"][0]
        name = form_package["name"][0]
        description = form_package["description"][0]

        new_move = {}
        new_move["name"] = name
        new_move["description"] = description
        new_move["positions"] = [position]
        new_move["grips"] = [grip]
        # need to create id, takes name and turns it into id
        # check to see if new content conflicts with any entries using id
        # crud - create update and delete
        # if admin - add 2 buttons to the end of full guard for example, one takes to delete page and one to update
        # loop through each line under again to add buttons
        new_move["move_type"] = move_type
        move_types[move_type][name] = new_move

        put_persisted_data(all_data)

        print(new_content, new_move)

        #if user == admin:
            # have it added to the dictionary in bjj_data?
            
        #else:
        flash('Your addition has been sent to the moderation team for approval.', category='success')
        return redirect(url_for('index_v2'))


    return render_template ('new_content.html',
                            ) 

@app.route("/sign_up", methods=['POST','GET'])
def sign_up():

    if request.method == 'POST':

        req = request.form
        username = req['username']
        email = req['email']
        password = req['password']

        print(username, email, password)

        return redirect(request.url)

    return render_template('sign_up.html')

# Now the definition of our second_page

@app.route("/login", methods=["POST", "GET"])
def login():

    if request.method == "POST":
        session.permanent = True
        user = request.form["username"]
        session["user"] = user
        return redirect(url_for("user", usr=user))
    else:
        if "user" in session:
            return redirect(url_for("user"))

        return render_template("login.html")

@app.route("/user") 
def user():

    if "user" in session:
        user = session["user"]
        return f"<h1>{user}</h1>"

    else:
        return redirect(url_for("login"))

@app.route("/logout")
def logout():
    session.pop("user",None)
    flash("You have been logged out!", 'info')
    return redirect(url_for("login"))

@app.route("/second_page", methods=["GET"])
def second():
    return "<a href=/index?name=Ivan&age=28>Visit our home page....</a>"


