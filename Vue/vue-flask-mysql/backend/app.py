from flask import Flask,jsonify,render_template,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/users'
 

@app.route('/', methods=['GET'])
def get_articles():
    return jsonify({'Key1':'Value1'})

@app.route('/createobservation', methods=['GET'])
def createobservation():
    if request.method == "GET":
        connector = mysql.connector.connect(user='root',password='root',database='flask')
        cursor = connector.cursor()
        # cursor.execute(''' INSERT INTO users VALUES("2","Bob1994", "password1234") ''')
        # connector.commit()
        cursor.execute(''' SELECT * from users ''')
        data = cursor.fetchall()
        connector.close()
        return jsonify(data)

 
@app.route('/form')
def form():
    return render_template('form.html')

# @app.route('/login', methods = ['POST', 'GET'])
# def login():
#     if request.method == 'GET':
#         return "Login via the login Form"
     
#     if request.method == 'POST':
#         connector = mysql.connector.connect(user='root',password='root',database='flask')
#         cursor = connector.cursor()
#         id= 12345
#         name = request.form['name']
#         age = request.form['age']
#         cursor.execute(''' INSERT INTO flask_table VALUES(%s,%s,%s)''',(id,name,age))
#         connector.commit()
#         cursor.close()
#         return f"Done!!"
 

if __name__ == '__main__':
    app.run(debug=True)