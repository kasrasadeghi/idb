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


#
# region champions
#


@app.route("/api/champion_names")
def api_get_champion_names() -> str:
    """
    gets a list of champion names in a json

    :return: a list of champion names

    { "Thresh", "Viktor", "Hecarim", ... }
    """
    f = open("static/champion_names.json", "r")
    contents = json.load(f)
    json_resp = contents
    resp = jsonify(json_resp)  # this is a response object
    return resp


@app.route("/api/champions")
def api_champions() -> str:
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
    pass


@app.route("/api/champion/<name>")
def api_champion(name: str) -> str:
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
    pass

# endregion
#


#
# region classes
#


@app.route("/api/classes")
def api_classes() -> str:
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
    pass


@app.route("/api/class/<name>")
def api_class(name: str) -> str:
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
    pass

# endregion
#


#
# region items
#


@app.route("/api/items")
def api_items() -> str:
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
    pass


@app.route("/api/item/<name>")
def api_item(name: str) -> str:
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
    pass

# endregion
#


#
# region roles
#


@app.route("/api/roles")
def api_roles() -> str:
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
    pass


@app.route("/api/role/<name>")
def api_role(name: str) -> str:
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
    pass

# endregion
#


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
