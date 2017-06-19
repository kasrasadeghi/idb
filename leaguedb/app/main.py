import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
@app.route("/<page>")
def home(page=None):
    if page:
        return render_template(page+".html", page=page)
    return render_template("home.html", page=page)

@app.route("/champions/<name>")
def champions(name=None):
    return render_template(name + ".html", name=name)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
