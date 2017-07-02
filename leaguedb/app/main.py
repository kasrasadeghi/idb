from flask import Flask, render_template, send_from_directory, jsonify, Response
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

def json_response(filename: str) -> Response:
    f = open("static/json/" + filename, "r")
    contents = json.load(f)
    response = jsonify(contents)
    return response


#
# region champions
#


@app.route("/api/champion_names")
def api_champion_names() -> Response:
    """
    gets a list of champion names in a json

    :return: a list of champion names

    { "Thresh", "Viktor", "Hecarim", ... }
    """
    return json_response("champion_names.json")


@app.route("/api/champions")
def api_champions() -> Response:
    """
    gets a json with all champion information

    :return: the response

    [
        {
            "name": "Quinn",
            "roles": [ ... ],
            "classes": [ ... ],
            "items": [ ... ],
            "lore": "Quinn and ...
            "icon": "Quinn.png"
        },
        ...
    ]
    """
    return json_response("api_champions.json")


@app.route("/api/champion/<name>")
def api_champion(name: str) -> Response:
    """
    gets a single champion by name

    :param name: the name of the champion
    :return: the response

    {
        "name": "Quinn",
        "roles": [ ... ],
        "classes": [ ... ],
        "items": [ ... ],
        "lore": "Quinn and ...
        "icon": "Quinn.png"
    }
    """
    raise NotImplemented("cannot get champion by name yet")


# endregion
#


#
# region classes
#


@app.route("/api/classes")
def api_classes() -> Response:
    """
    gets all class in a json

    :return: the response

    [
        {
            "name": "Marksman",
            "icon": "Marksman.png",
            "description": "Marksman are ranged ...
            "champions": [ ...],
            "items": [ ... ]
        },
        ...
    ]
    """
    return json_response("api_classes.json")


@app.route("/api/class/<name>")
def api_class(name: str) -> Response:
    """
    gets a single class's json

    :param name: the name of a specific class
    :return: the response

    {
        "name": "Marksman",
        "icon": "Marksman.png",
        "description": "Marksman are ranged ...
        "champions": [ ...],
        "items": [ ... ]
    }
    """
    raise NotImplemented("cannot get classes by name yet")


# endregion
#


#
# region items
#


@app.route("/api/items")
def api_items() -> Response:
    """
    gets all item data in a json

    :return: the response
    [
        {
            "name": "B. F. Sword",
            "roles": [ ... ],
            "champions": [ ... ],
            "categories": [ ... ],
            "image": "1038.png"
        },
        ...
    ]
    """
    return json_response("api_items.json")


@app.route("/api/item/<name>")
def api_item(name: str) -> Response:
    """
    gets a single item's information

    :param name: the specific item's name
    :return: the response

    {
        "name": "B. F. Sword",
        "roles": [ ... ],
        "champions": [ ... ],
        "categories": [ ... ],
        "image": "1038.png"
    }
    """
    raise NotImplemented("cannot get items by name yet")


# endregion
#


#
# region roles
#


@app.route("/api/roles")
def api_roles() -> Response:
    """
    gets all of the roles

    :return: the response

    [
        {
            "name": "Sup",
            "icon": "sup.png",
            "classes": [ ... ],
            "items": [ ... ],
            "champions" : [ ... ]
        },
        ...
    ]
    """
    return json_response("api_roles.json")


@app.route("/api/role/<name>")
def api_role(name: str) -> Response:
    """
    gets a single role by name

    :param name: the role's name
    :return: the response

    {
        "name": "Sup",
        "icon": "sup.png",
        "classes": [ ... ],
        "items": [ ... ],
        "champions" : [ ... ]
    }
    """
    raise NotImplemented("cannot get role by name yet")


# endregion
#


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
