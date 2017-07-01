from flask import Flask, render_template, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import json

import os

app = Flask(__name__)
CORS(app)

# TODO: Remote PostgreSQL data base configuration/connection
user = 'swe'
pwd = 'abc'
host = 'localhost'
db = 'test'
uri = 'postgresql://%s:%s@%s/%s' % (user, pwd, host, db)
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@app.route("/favicon.ico")
def favicon() -> str:
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route("/")
@app.route("/<page>")
def home(page: str = None) -> str:
    if page:
        return render_template(page + ".html")
    return render_template("home.html", page=page)


@app.route("/champions/<name>")
def champion_route(name: str) -> str:
    return render_template("champions/" + name + ".html", name=name)


@app.route("/items/<name>")
def item_route(name: str) -> str:
    return render_template("items/" + name + ".html", name=name)


@app.route("/classes/<name>")
def class_route(name: str) -> str:
    return render_template("classes/" + name + ".html", name=name)


@app.route("/roles/<name>")
def role_route(name: str) -> str:
    return render_template("roles/" + name + ".html", name=name)


#####
# API
#####


@app.route("/api/champion_names")
def api_get_champion_names() -> str:
    f = open("static/champion_names.json", "r")
    contents = json.load(f)
    print(type(contents))
    json_resp = contents
    resp = jsonify(json_resp)
    print(json_resp)
    return resp

#
# champions
#


@app.route("/api/champions")
def api_champions() -> str:
    pass


@app.route("/api/champion/<name>")
def api_champion(name: str) -> str:
    pass

#
# classes
#


@app.route("/api/classes")
def api_classes() -> str:
    pass


@app.route("/api/class/<name>")
def api_class(name: str) -> str:
    pass


#
# items
#


@app.route("/api/items")
def api_items() -> str:
    pass


@app.route("/api/item/<name>")
def api_item(name: str) -> str:
    pass

#
# roles
#


@app.route("/api/roles")
def api_roles() -> str:
    pass


@app.route("/api/role/<name>")
def api_role(name: str) -> str:
    pass


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
