from flask import Flask, render_template

app: Flask = Flask(__name__)


@app.route("/")
@app.route("/<page>")
def home(page: str = None) -> str:
    if page:
        return render_template(page+".html")
    return render_template("home.html", page=page)


@app.route("/champions/<name>")
def champion_route(name: str) -> str:
    return render_template(name + ".html", name=name)


@app.route("/items/<name>")
def item_route(name: str) -> str:
    return render_template("item.html", name=name)


@app.route("/class/<name>")
def class_route(name: str) -> str:
    return render_template("class.html", name=name)


@app.route("/roles/<name>")
def role_route(name: str) -> str:
    return render_template("role.html", name=name)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
