from flask import Flask, request, render_template, redirect
from flask.helpers import url_for
import os
from website import app
import pandas as pd

app.secret_key = "hello"

@app.route("/form", methods=["GET", "POST"])
def form():

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

        date = form_package['datetime'][0]
        dbulb = form_package['dbulb'][0]
        dpoint = form_package['dpoint'][0]
        direction = form_package['direction'][0]
        
        df = pd.read_excel('testbook.xlsx', sheet_name="Sheet1")
        new_data = pd.DataFrame({'datetime': [date], 'drybulb': [dbulb], 'dewpoint':[dpoint], 'direction':[direction]})
        df = df.append(new_data, ignore_index=True)
        writer = pd.ExcelWriter("testbook.xlsx")
        df.to_excel(excel_writer=writer, sheet_name="Sheet1", na_rep="", index=False)
        writer.save()
        return redirect(url_for("form"))
        
    return render_template(
        "form.html", form_package=form_package, url_arguments=url_arguments
    )

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)