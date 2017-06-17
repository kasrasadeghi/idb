from pyfiglet import Figlet
import os
from flask import Flask

app = Flask(__name__)

font = Figlet(font="starwars")

@app.route("/")
def hello():
    message = os.getenv("MESSAGE", "WELCOME\nTO THE LEAGUE OF\nDRAVEN")

    html_text = font.renderText(message)\
                    .replace(" ", "&nbsp;")\
                    .replace(">", "&gt;")\
                    .replace("<", "&lt;")\
                    .replace("\n", "<br>")

    return "<html><body style='font-family: mono;'>" + html_text + "</body></html>"
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5000)
