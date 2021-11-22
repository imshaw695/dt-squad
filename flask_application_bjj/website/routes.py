# Import relevant modules
from flask import request, render_template, redirect, session, flash
from flask.helpers import url_for
from datetime import timedelta
import time

# Import the Flask webapp instance that we created in the __init__.py
from website import app
from website.bjj_data import put_persisted_data, all_data, get_new_entry, get_entry_id

grips = all_data["grips"]
positions = all_data["positions"]
moves = all_data["moves"]
move_types = all_data["move_types"]
moves_positions = all_data["moves_positions"]
moves_grips = all_data["moves_grips"]

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
    url_arguments = request.args.to_dict(flat=False)

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

    return render_template(
        "index.html", form_package=form_package, url_arguments=url_arguments
    )


@app.route("/", methods=["GET", "POST"])
@app.route("/homepage", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page


def homepage():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

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

    return render_template(
        "homepage.html",
        form_package=form_package,
        url_arguments=url_arguments,
        moves=moves,
        grips=grips,
        positions=positions,
        move_types=move_types,
    )


@app.route("/bjj", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def bjj():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

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

    return render_template(
        "bjj.html", form_package=form_package, url_arguments=url_arguments
    )


@app.route("/full_guard", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def full_guard():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

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

    return render_template(
        "full_guard.html", form_package=form_package, url_arguments=url_arguments
    )


@app.route("/modify_positions", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def modify_positions():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

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

    return render_template(
        "modify_positions.html",
        form_package=form_package,
        url_arguments=url_arguments,
        moves=moves,
        positions=positions,
        move_types=move_types,
        grips=grips,
    )


@app.route("/modify_grips", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def modify_grips():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

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

    return render_template(
        "modify_grips.html",
        form_package=form_package,
        url_arguments=url_arguments,
        grips=grips,
    )


@app.route("/modify_moves", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def modify_moves():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

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

    return render_template(
        "modify_moves.html",
        form_package=form_package,
        url_arguments=url_arguments,
        moves=moves,
    )


@app.route("/submissions", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def submissions():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # Make a list of keys for moves that are submissions
    submission_ids = []
    for move_type in move_types:
        if "submission" in move_types[move_type].values():
            submission_id = move_types[move_type]["id"]

    for move in moves:
        if moves[move]["move_type_id"] == submission_id:
            submission_ids.append(moves[move]["id"])

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

    return render_template(
        "submissions.html",
        form_package=form_package,
        url_arguments=url_arguments,
        moves=moves,
        grips=grips,
        positions=positions,
        move_types=move_types,
        submission_ids=submission_ids,
    )


@app.route("/sweeps", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def sweeps():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # Make a list of keys for moves that are submissions
    sweep_ids = []
    for move_type in move_types:
        if "sweep" in move_types[move_type].values():
            sweep_id = move_types[move_type]["id"]

    for move in moves:
        if moves[move]["move_type_id"] == sweep_id:
            sweep_ids.append(moves[move]["id"])

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

    return render_template(
        "sweeps.html",
        form_package=form_package,
        url_arguments=url_arguments,
        moves=moves,
        grips=grips,
        positions=positions,
        move_types=move_types,
        sweep_ids=sweep_ids,
    )


@app.route("/escapes", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def escapes():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # Make a list of keys for moves that are submissions
    escape_ids = []
    for move_type in move_types:
        if "escape" in move_types[move_type].values():
            escape_id = move_types[move_type]["id"]

    for move in moves:
        if moves[move]["move_type_id"] == escape_id:
            escape_ids.append(moves[move]["id"])

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

    return render_template(
        "escapes.html",
        form_package=form_package,
        url_arguments=url_arguments,
        moves=moves,
        grips=grips,
        positions=positions,
        move_types=move_types,
        escape_ids=escape_ids,
    )


@app.route("/passes", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def passes():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)

    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")

    # Make a list of keys for moves that are submissions
    pass_ids = []
    for move_type in move_types:
        if "pass" in move_types[move_type].values():
            pass_id = move_types[move_type]["id"]

    for move in moves:
        if moves[move]["move_type_id"] == pass_id:
            pass_ids.append(moves[move]["id"])

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

    return render_template(
        "passes.html",
        form_package=form_package,
        url_arguments=url_arguments,
        moves=moves,
        grips=grips,
        positions=positions,
        move_types=move_types,
        pass_ids=pass_ids,
    )


@app.route("/new_content", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def new_content():

    url_arguments = request.args.to_dict(flat=False)

    grip_id = None
    position_id = None
    move_id = None

    if "position_id" in url_arguments:
        position_id = "position_id"
        entry = "Enter a new position:"

    if "grip_id" in url_arguments:
        grip_id = "grip_id"
        entry = "Enter a new grip:"

    if "move_id" in url_arguments:
        move_id = "move_id"
        entry = "Enter a new move:"

    form_package = {}

    if request.method == "POST":
        # I would like the data submitted in the form to be added to the bjj_data moves dictionary
        # Somehow I need to append it to the dictionary and identify the move_type to put it all under
        # instead of below, just make a new dictionary called new_content or something and populate that
        # pull the form fields into a dictionary for ease
        form_package = request.form.to_dict(flat=False)
        print(form_package)

        if not form_package["move_id"][0] == "None":

            grip_ids = form_package["grip_ids"]
            position_ids = form_package["position_ids"]
            move_type_id = form_package["move_type"][0]
            move = get_new_entry(
                form_package["name"][0], form_package["description"][0], move_type_id
            )
            moves[move["id"]] = move
            move_id = get_entry_id(move["name"], moves)
            for position_id in position_ids:
                key = f"{move_id},{position_id}"
                moves_positions[key] = dict(move_id=move_id, position_id=position_id)
            for grip_id in grip_ids:
                key = f"{move_id},{grip_id}"
                moves_grips[key] = dict(move_id=move_id, grip_id=grip_id)
            put_persisted_data(all_data)
            flash(
                "Your addition has been sent to the moderation team for approval.",
                category="success",
            )
            return redirect(url_for("homepage"))

        if not form_package["grip_id"][0] == "None":
            grip = get_new_entry(
                form_package["name"][0], form_package["description"][0]
            )
            grips[grip["id"]] = grip
            put_persisted_data(all_data)
            print(grips)
            flash(
                "Your addition has been sent to the moderation team for approval.",
                category="success",
            )
            return redirect(url_for("homepage"))

        if not form_package["position_id"][0] == "None":
            position = get_new_entry(
                form_package["name"][0], form_package["description"][0]
            )
            positions[position["id"]] = position
            put_persisted_data(all_data)
            print(positions)
            flash(
                "Your addition has been sent to the moderation team for approval.",
                category="success",
            )
            return redirect(url_for("homepage"))

        # if user == admin:
        # have it added to the dictionary in bjj_data?

        # else:
        flash(
            "Your addition has been sent to the moderation team for approval.",
            category="success",
        )
        return redirect(url_for("homepage"))

    return render_template(
        "new_content.html",
        form_package=form_package,
        url_arguments=url_arguments,
        entry=entry,
        move_types=move_types,
        moves=moves,
        grips=grips,
        positions=positions,
        move_id=move_id,
        grip_id=grip_id,
        position_id=position_id,
    )


@app.route("/update_entry", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def update_entry():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    full_guard = "wx3ktKTcrcNw1g"
    url_arguments = request.args.to_dict(flat=False)

    grip_id = None
    position_id = None
    move_id = None
    entry_moves_positions = None
    entry_moves_grips = None

    if "position_id" in url_arguments:
        position_id = url_arguments["position_id"][0]
        try:
            entry = positions[position_id]
        except Exception as err:
            flash(
                "Warning, the URL appears to have been corrupted.", category="warning"
            )
            return redirect(url_for("homepage"))

    if "grip_id" in url_arguments:
        grip_id = url_arguments["grip_id"][0]
        try:
            entry = grips[grip_id]
        except Exception as err:
            flash(
                "Warning, the URL appears to have been corrupted.", category="warning"
            )
            return redirect(url_for("homepage"))

    if "move_id" in url_arguments:
        move_id = url_arguments["move_id"][0]
        try:
            entry = moves[move_id]
        except Exception as err:
            flash(
                "Warning, the URL appears to have been corrupted.", category="warning"
            )
            return redirect(url_for("homepage"))
        entry_moves_positions = []
        entry_moves_grips = []

        for key in moves_positions:
            if moves[move_id]["id"] in key:
                entry_moves_positions.append(moves_positions[key]["position_id"])

        for key in moves_grips:
            if moves[move_id]["id"] in key:
                entry_moves_grips.append(moves_grips[key]["grip_id"])

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
        print(form_package)
        grip_id = form_package["grip_id"][0]
        position_id = form_package["position_id"][0]
        move_id = form_package["move_id"][0]

        new_name = form_package["new_name"][0]
        new_description = form_package["new_description"][0]
        if not grip_id == "None":
            grips[grip_id]["name"] = new_name
            grips[grip_id]["description"] = new_description
        if not position_id == "None":
            positions[position_id]["name"] = new_name
            positions[position_id]["description"] = new_description
        if not move_id == "None":
            try:
                position_ids = form_package["position_ids"]
            except Exception as err:
                flash("You need to include a position.", category="warning")
                return redirect(url_for("update_entry", move_id=move_id))
            try:
                grip_ids = form_package["grip_ids"]
            except Exception as err:
                grip_ids = []
                print(f"[INFO] {time.ctime()}{err}")
            move_type_id = form_package["move_type"][0]
            moves[move_id]["name"] = new_name
            moves[move_id]["description"] = new_description
            moves[move_id]["move_type_id"] = move_type_id
            keys_to_delete = []
            # deletes all entries in moves_positions for the move, then creates new ones
            for move_position in moves_positions:
                if move_id in move_position:
                    keys_to_delete.append(move_position)
            for key in keys_to_delete:
                del moves_positions[key]
            for position_id in position_ids:
                key = f"{move_id},{position_id}"
                moves_positions[key] = dict(move_id=move_id, position_id=position_id)
            keys_to_delete = []
            # deletes all entries in moves_grips for the move, then creates new ones
            for move_grip in moves_grips:
                if move_id in move_grip:
                    keys_to_delete.append(move_grip)
            for key in keys_to_delete:
                del moves_grips[key]
            for grip_id in grip_ids:
                key = f"{move_id},{grip_id}"
                moves_grips[key] = dict(move_id=move_id, grip_id=grip_id)

        put_persisted_data(all_data)

        return redirect(url_for("homepage"))

    else:
        if not (position_id or grip_id or move_id):
            flash(
                "Warning, the URL appears to have been corrupted.", category="warning"
            )
            return redirect(url_for("homepage"))

    return render_template(
        "update_entry.html",
        form_package=form_package,
        url_arguments=url_arguments,
        entry=entry,
        grip_id=grip_id,
        position_id=position_id,
        move_id=move_id,
        move_types=move_types,
        positions=positions,
        grips=grips,
        moves=moves,
        moves_positions=moves_positions,
        full_guard=full_guard,
        entry_moves_positions=entry_moves_positions,
        entry_moves_grips=entry_moves_grips,
    )


@app.route("/delete_entry", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def delete_entry():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any

    url_arguments = request.args.to_dict(flat=False)

    grip_id = None
    position_id = None
    move_id = None

    if "position_id" in url_arguments:
        position_id = url_arguments["position_id"][0]
        entry = positions[position_id]

    if "grip_id" in url_arguments:
        grip_id = url_arguments["grip_id"][0]
        entry = grips[grip_id]

    if "move_id" in url_arguments:
        move_id = url_arguments["move_id"][0]
        entry = moves[move_id]

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
        grip_id = form_package["grip_id"][0]
        position_id = form_package["position_id"][0]
        move_id = form_package["move_id"][0]

        if not grip_id == "None":
            del grips[grip_id]
            keys_to_delete = []
            # deletes all entries in moves_grips for the move, then creates new ones
            for move_grip in moves_grips:
                if grip_id in move_grip:
                    keys_to_delete.append(move_grip)
            for key in keys_to_delete:
                del moves_grips[key]
        if not position_id == "None":
            del positions[position_id]
            keys_to_delete = []
            # deletes all entries in moves_grips for the move, then creates new ones
            for move_position in moves_positions:
                if position_id in move_position:
                    keys_to_delete.append(move_position)
            for key in keys_to_delete:
                del moves_positions[key]
        if not move_id == "None":
            del moves[move_id]
            keys_to_delete = []
            # deletes all entries in moves_grips for the move, then creates new ones
            for move_position in moves_positions:
                if move_id in move_position:
                    keys_to_delete.append(move_position)
            for key in keys_to_delete:
                del moves_positions[key]
            keys_to_delete = []
            # deletes all entries in moves_grips for the move, then creates new ones
            for move_grip in moves_grips:
                if move_id in move_grip:
                    keys_to_delete.append(move_grip)
            for key in keys_to_delete:
                del moves_grips[key]
        put_persisted_data(all_data)

        return redirect(url_for("homepage"))

    else:
        if not (position_id or grip_id or move_id):
            flash(
                "Warning, the URL appears to have been corrupted.", category="warning"
            )
            return redirect(url_for("homepage"))

    return render_template(
        "delete_entry.html",
        form_package=form_package,
        url_arguments=url_arguments,
        entry=entry,
        grip_id=grip_id,
        position_id=position_id,
        move_id=move_id,
        move_types=move_types,
        positions=positions,
        grips=grips,
        moves=moves,
    )


@app.route("/sign_up", methods=["POST", "GET"])
def sign_up():

    if request.method == "POST":

        req = request.form
        username = req["username"]
        email = req["email"]
        password = req["password"]

        print(username, email, password)

        return redirect(request.url)

    return render_template("sign_up.html")


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
    session.pop("user", None)
    flash("You have been logged out!", "info")
    return redirect(url_for("login"))


@app.route("/second_page", methods=["GET"])
def second():
    return "<a href=/index?name=Ivan&age=28>Visit our home page....</a>"


# Now we can define a page to handle 404 errors
# 404 errors occur when we try to visit a page for
# which there is no route set up
@app.errorhandler(404)
def page_not_found(error):

    # We can do a very simple return of a text string
    # or we could do a full blown template
    # And we could include handling logic in this
    # route as well if we needed to
    flash(
        "404 Not Found: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.",
        category="warning",
    )
    return render_template(
        "homepage.html",
        moves=moves,
        grips=grips,
        positions=positions,
        move_types=move_types,
    )
