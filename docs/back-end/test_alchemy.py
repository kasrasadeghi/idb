#!/usr/bin/env python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

user = 'swe'
pwd  = 'abc'
host = 'localhost'
db   = 'test'
uri  = 'postgresql://%s:%s@%s/%s' % (user, pwd, host, db) 

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'
db = SQLAlchemy(app)


class Item (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Item %r>' % self.name

if __name__ == "__main__":
    try:
        # create the item model
        db.create_all()
        print("Created item model")

        # add an item
        dd = Item("Death's Dance")
        ss = Item("Statikk Shiv")
        print("Created items")

        db.session.add(dd)
        db.session.add(ss)
        print("Added items")
        db.session.commit()
        print("Committed transaction")
    except Exception as e:
        print('Something went wrong')
