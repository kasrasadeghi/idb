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
