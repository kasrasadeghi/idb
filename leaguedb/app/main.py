from flask import render_template, send_from_directory, jsonify, Response, url_for
from models import app, Champion, Item, Class, Role
import json
import os

@app.route("/favicon.ico")
def favicon() -> str:
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


#
# glob routing
#


@app.route("/")
def home() -> str:
    return render_template("home.html")


@app.route("/<base_route>")
def route_template(base_route):
    return render_template(base_route + ".html")


@app.route("/items")
def route_items():
    return send_from_directory("react/items", 'index.html')


@app.route("/champions")
def route_react() -> str:
    return send_from_directory("react/champions", 'index.html')


@app.route("/images/<path:image_name>")
def image(image_name):
    return send_from_directory("static", image_name)


#
# particle routing
#


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
    row = Champion.query.get(name)
    contents = {}
    contents['name']    = row.name
    contents['roles']   = [x.name for x in row.roles]
    contents['classes'] = [x.name for x in row.classes]
    contents['items']   = [x.name for x in row.items]
    contents['lore']    = row.lore
    contents['icon']    = row.icon
    response = jsonify(contents)
    return response


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
