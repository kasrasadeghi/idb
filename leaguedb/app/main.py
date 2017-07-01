from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import json
from typing import List

app = Flask(__name__)

# TODO: Remote PostgreSQL data base configuration/connection
user = 'swe'
pwd  = 'abc'
host = 'localhost'
db   = 'test'
uri  = 'postgresql://%s:%s@%s/%s' % (user, pwd, host, db) 
app.config['SQLALCHEMY_DATABASE_URI'] = uri
db  = SQLAlchemy(app)


@app.route("/")
@app.route("/<page>")
def home(page = None):
    if page:
        return render_template(page+".html")
    return render_template("home.html", page=page)


@app.route("/champions/<name>")
def champion_route(name):
    return render_template("champions/" + name + ".html", name=name)


@app.route("/items/<name>")
def item_route(name):
    return render_template("items/" + name + ".html", name=name)


@app.route("/classes/<name>")
def class_route(name):
    return render_template("classes/" + name + ".html", name=name)


@app.route("/roles/<name>")
def role_route(name):
    return render_template("roles/" + name + ".html", name=name)

#####
# API
#####


@app.route("/api/champion_names")
def get_champion_names():
    file = open("static/champion_names.json", "r")
    loaded = json.load(file)
    loaded: List[str] = list(loaded)
    result = ""
    for champ in sorted(loaded):
        result += champ + "\n"
    return result


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
