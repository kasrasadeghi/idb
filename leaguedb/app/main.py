import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home(page=None):
    return render_template("home.html", page=page)
def champions(page=None):
	return render_template("champions.html", page=page)
def Jax(page=None):
	return render_template("Jax.html", page=page)
def Khazix(page=None):
	return render_template("Kha'Zix.html", page=page)
def Caitlyn(page=None):
	return render_template("Caitlyn.html", page=page)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
