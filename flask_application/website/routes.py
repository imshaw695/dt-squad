# Import relevant modules
from flask import request, render_template, redirect, session, flash
from flask.helpers import url_for
from datetime import timedelta
from website.data import input_variables, data_03, unique_variables
import numpy as np
import tensorflow as tf
import os
import json

this_directory = os.path.abspath(os.path.dirname(__file__))
path_to_model = os.path.join(this_directory, '..','..','breast_cancer.model')

loaded_model = tf.keras.models.load_model(path_to_model)

# Import the Flask webapp instance that we created in the __init__.py
from website import app

app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(minutes=15)

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

@app.route("/form_data", methods=["GET", "POST"])
# Now comes the actual function definition for processing this page
def form_data():

    # Url arguments can be added to the url like this ?name=Peter&age=57
    # Get the url arguments if there are any
    url_arguments = request.args.to_dict(flat=False)
    prediction = None
    form_package = {}
    # if there are any url arguments, print them to the console here
    if len(url_arguments) > 0:
        print(f"\nThere were some url arguments and they were:\n{url_arguments}\n")
        form_package = json.loads(url_arguments['form_package'][0])
        prediction = url_arguments['prediction'][0]
        value = None
        if prediction[0] > 0.5:
            value = 1

    # When pages contain a form, we can access the variables in this function
    # if the form was submitted
    # Create a default form_package in case the form not submitted
    # And now check to see if the form was actually submitted
    if request.method == "POST":

        # pull the form fields into a dictionary for ease
        form_package = request.form.to_dict(flat=False)

        # print the form fields to the console so we can see it was submitted
        print(f"\nThe form was submitted. The data is:\n{form_package}\n")

        test_data = []
        for item in form_package:
            if item == 'submit':
                continue
            value = form_package[item][0]
            test_data.append(value)
        
        print(test_data)

        number_of_zeros = 0
        for list in unique_variables:
            number_of_zeros = number_of_zeros + len(list)
        # I need to input the form package into the below pipeline now so that it can be used in the model
        data_04 = []
        for line in [test_data]:
            # create a row with the correct number of zeros
            output_line = [0] * (number_of_zeros - 2)
            offset = 0
            for column_index,column in enumerate(line):
                # for this column, find out which zero needs setting
                found_at = unique_variables[column_index].index(column)
                flip_index = offset + found_at
                output_line[flip_index] = 1
                offset = len(unique_variables[column_index]) + offset
            data_04.append(output_line)
    
        data_05 = np.array(data_04)

        prediction = loaded_model.predict(data_05)

        return redirect(url_for("form_data",form_package=json.dumps(form_package),prediction=prediction))

    return render_template(
        "form_data.html", 
        form_package=form_package, 
        url_arguments=url_arguments,
        input_variables=input_variables,
        prediction=prediction
    )

