# import the Flask object: app

from website import app

from website  import routes

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)