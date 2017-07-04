from flask import render_template, send_from_directory, jsonify, Response, url_for
from models import app, Champion, Item, Class, Role
import json
import os


@app.route("/favicon.ico")
def favicon() -> Response:
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


#
# database querying
#

def get_champion(name):
    row = Champion.query.get(name)
    contents = {}
    contents['classes'] = [x.name for x in row.classes]
    contents['icon']    = row.icon
    contents['items']   = [x.name for x in row.items]
    contents['lore']    = row.lore
    contents['name']    = row.name
    contents['roles']   = [x.name for x in row.roles]
    return contents


def get_item(name):
    row = Item.query.get(name)
    contents = {}
    contents['categories'] = row.categories[1:-1].split(",")
    contents['champions']  = [x.name for x in row.champions]
    contents['classes']    = [x.name for x in row.classes]
    contents['icon']       = row.icon
    contents['name']       = row.name
    contents['roles']      = [x.name for x in row.roles]
    return contents


def get_class(name):
    row = Class.query.get(name)
    contents = {}
    contents['champions']   = [x.name for x in row.champions]
    contents['description'] = row.description
    contents['icon']        = row.icon
    contents['items']       = [x.name for x in row.items]
    contents['name']        = row.name
    return contents


def get_role(name):
    row = Role.query.get(name)
    contents = {}
    contents['champions'] = [x.name for x in row.champions]
    contents['classes']   = row.classes.split(",")
    contents['icon']      = row.icon
    contents['items']     = [x.name for x in row.items]
    contents['name']      = row.name
    return contents

#
# glob routing
#


@app.route("/")
def home() -> Response:
    return render_template("home.html")


@app.route("/about")
def route_about() -> Response:
    return render_template("about.html")


@app.route("/<react_route>")
def route_models(react_route: str) -> Response:
    filename = [file for file in os.listdir("react") if file.startswith(react_route) and file.endswith(".js")][0]
    css_filename = [file for file in os.listdir("react") if file.startswith(react_route) and file.endswith(".css")][0]
    return render_template("model_view.html", filename=filename, css_filename=css_filename)


@app.route("/react/<filename>")
def route_react(filename: str) -> Response:
    return send_from_directory("react", filename)


@app.route("/images/<path:image_name>")
def image(image_name) -> Response:
    return send_from_directory("static/images", image_name)


#
# particle routing
#


@app.route("/champions/<name>")
def champion_route(name: str) -> Response:
    return render_template("champion.html", champion=get_champion(name))


@app.route("/items/<name>")
def item_route(name: str) -> Response:
    return render_template("item.html", item=get_item(name))


@app.route("/classes/<name>")
def class_route(name: str) -> Response:
    return render_template("class.html", class_data=get_class(name))


@app.route("/roles/<name>")
def role_route(name: str) -> Response:
    return render_template("role.html", role=get_role(name))

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

    [ "Thresh", "Viktor", "Hecarim", ... ]
    """
    return json_response("champion_names.json")


@app.route("/api/champions")
def api_champions() -> Response:
    """
    gets a json with all champion information

    :return: the response

    [
        {
            "classes": [ ... ],
            "icon": "Quinn.png"
            "items": [ ... ],
            "lore": "Quinn and ...
            "name": "Quinn",
            "roles": [ ... ],
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
        "classes": [ ... ],
        "icon": "Quinn.png"
        "items": [ ... ],
        "lore": "Quinn and ...
        "name": "Quinn",
        "roles": [ ... ],
    }
    """
    response = jsonify(get_champion(name))
    return response


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
            "categories": [ ... ],
            "champions": [ ... ],
            "classes": [ ... ],
            "icon": "1038.png"
            "name": "B. F. Sword",
            "roles": [ ... ],
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
        "categories": Health, ,
        "champions": [ ... ],
        "classes": [ ... ],
        "icon": "1038.png"
        "name": "B. F. Sword",
        "roles": [ ... ],
    }
    """
    response = jsonify(get_item(name))
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
            "champions": [ ...],
            "description": "Marksman are ranged ...
            "icon": "Marksman.png",
            "items": [ ... ]
            "name": "Marksman",
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
        "champions": [ ...],
        "description": "Marksman are ranged ...
        "icon": "Marksman.png",
        "items": [ ... ]
        "name": "Marksman",
    }
    """
    response = jsonify(get_class(name))
    return response


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
            "champions" : [ ... ]
            "classes": [ ... ],
            "icon": "sup.png",
            "items": [ ... ],
            "name": "Sup",
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
        "champions" : [ ... ]
        "classes": [ ... ],
        "icon": "sup.png",
        "items": [ ... ],
        "name": "Sup",
    }
    """
    response = jsonify(get_role(name))
    return response


# endregion
#


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
