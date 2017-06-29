## Set up Postgres on a local machine with Ubuntu 16.04

### [Source][1]

### Install Postgres

Get the required packages.

`sudo apt-get install postgresql libpq-dev postgresql-client postgresql-client-common`

Switch to the default user.

`sudo -i -u postgres`

Create a new user. Enter a password (abc). A few prompts will pop up. Say "n" to
superuser. Say "y" to other questions.

`createuser swe -P --interactive`

Create a new database.

`createdb test`

### Interact with Postgres from Normal Prompt

Remove a database.

`dropdb name`

Remove a user.

`dropuser name`

### Interact with Postgres from psql

If you don't want to use Python, use the command line client to connect to the
local host. You will get a prompt: "test=#".

`psql test`

View existing users.

`=# \du`

Remove existing users.

`=* DROP ROLE name;`

### Install psycopg2

We can use pip or pip3.

`pip3 install psycopg2`

### Use Postgres with psycopg2

This is a very simple script that connects to our local database and does a few
SQL commands. The following code is also in the file `test_psycop.py`. 

```python
#!/usr/bin/env python3

import psycopg2

try:
    connect_str = "dbname   = 'test'     \
                   user     = 'swe'      \
                   host     = 'localhost'\
                   password = 'abc' "

    # establish a connection
    c = psycopg2.connect(connect_str)

    # create a psycopg2 cursor that can execute queries
    cursor = c.cursor()

    # SERIAL means to assign the ID automatically
    cursor.execute("""
                CREATE TABLE champions (
                    champion_id SERIAL PRIMARY KEY,
                    champion_name VARCHAR(20)
                ) """)

    # add a row of data
    cursor.execute("INSERT INTO champions(champion_name) VALUES('Draven')")

    # get all data
    cursor.execute("SELECT * from champions")

    # a list to put the results in
    rows = cursor.fetchall()

    # commit the changes and close the connection
    c.commit()
    c.close()

    print(rows)
    

except Exception as e:
    print("Uh oh, can't connect. Invalid dbname, user or password?")
    print(e)
```

This script will only run without errors once, the first time you run it. It
creates a table the first time, and when you want to run it again, it will try
to create a table of the same name, but fail.

In order for the changes made with the cursor object to be persistent, you need
to `commit()`.

### Use Postgres with Flask-SQLAlchemy

This script has the roughly the same functionality as above with respect to the
database.  The difference is that this makes a new Flask app, uses the Flask
extensions of SQLAlchemy instead of psycop2, and creates a different table with
different data. The code is in `test_alchemy.py`.

```python
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
```

You only need to call `db.create_all()` one time in order to let the database
know that you want to add these new tables. Additionally, a `db.create_all()`
does not require a `db.session.commit()` for persistence. Calling this multiple
times does not seem to do anything.

Adding a row that already exists (that is supposed to be unique) raises an
exception, and the transaction fails.

[1]:https://www.fullstackpython.com/blog/postgresql-python-3-psycopg2-ubuntu-1604.html
