from flask import Flask,jsonify,render_template,request
from flask_sqlalchemy import SQLAlchemy
import mysql.connector

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/users'
 
connector = mysql.connector.connect(user='root',password='root',database='flask')

cursor = connector.cursor()

@app.route('/', methods=['GET'])
def get_articles():
    return jsonify({'Key1':'Value1'})

@app.route('/createobservation', methods=['GET'])
def createobservation():
    return("Inside the flask router")

 
@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/login', methods = ['POST', 'GET'])
def login():
    if request.method == 'GET':
        return "Login via the login Form"
     
    if request.method == 'POST':
        id= 12345
        name = request.form['name']
        age = request.form['age']
        cursor.execute(''' INSERT INTO flask_table VALUES(%s,%s,%s)''',(id,name,age))
        connector.commit()
        cursor.close()
        return f"Done!!"
 

if __name__ == '__main__':
    app.run(debug=True)