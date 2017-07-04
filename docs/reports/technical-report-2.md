# Technical Report
Kasra Sadeghi, Ben Yang, Todd Schriber, Avilash Rath

## Introduction

### Motivation

We want to create a site full of information on the global game, League of
Legends. The developers play the game and are somewhat passionate about it.

### Use Cases and API

The website is primarily designed for information gathering with a simple to use
API. The original League of Legends API from Riot Games uses an arbitrary `id`
value in the API methods. It would be something like `/api/champions/123`. Our
API is more user friendly as we use the name instead, so it looks like
`/api/champions/Zyra`. We predict the majority of people using the website will
be League of Legends players and fans. This implies that they know something
about the game.

The API is primarily a set of GET methods. For every model, you can get every
row in the database in a JSON file. You can also specify an individual row if
you want, like how we did above with Zyra.

## Tools Overview

### AWS

AWS hosts our web server and our database.

### Apiary

Apiary gives us and the future users of our API a clean, easy-to-read document
of our API calls.

### Bootstrap

Bootstrap gives us a starter template for a potentially attractive website.

### Namecheap

We got `leaguedb.me` through this thing.

### Plan it Poker

This is a group oriented piece of technology. We come up with stories that a
user would want. We vote on those stories to see how long each would take or how
hard each one is. Then, we implement the stories. When we finish the
implementation, we repeat the cycle and refine our estimates through this
method.

### PostgreSQL

This is the database we use. It is SQL based and we interact with it through the
next software.

### SQLALchemy

The object relational model that allows us to talk about databases like they are
Python objects and classes.

### React

The majority of the front end of our website. This allows for efficient
rendering of our templates, since it only loads changes.

### Slack

We communicate through this thing. This allows us to focus on work. If our
primary communication tool were Facebook messenger, we would be distracted all
the time.

### Trello

We also communicate through this thing. Except Trello allows us to have an issue
tracker. We put our stories on here and each developer chooses some stories to
work on. This is how we prevent two people from working on the same thing
without realizing that they are.

## Bootstrap (GUI setup)

### Installation

Click on the "Get Bootstrap" button from the
[above](http://getbootstrap.com/getting-started/#download) page in order to get
all the files seen in static/.

It contains a bunch of style, JavaScript and image files.


### Home page

For the home page of our website, we have a big splash image of the iconic
League of Legends' Summoner Rift. The image is centered and responsive thanks to
the class `img-responsive` provided by Bootstrap. Whenever the window in which
leaguedb.me is open changes shape, the image will stay centered and respond to
the external changes. On top of the image, we have a small title and short
description of what our website is about. We do not need to include too much
here because the about page of the website should complete whatever information
the user desires about us, the makers.

### Page with many models

The model page contains a grid of information. For example, we have a page
dedicated to champions. We decided to divide the pages into three columns and
the clickable icons posted in the middle of one of the columns. This is made
easy with the grid system that Bootstrap gives us. In addition to that,
Bootstrap gives us a `figure` tag that allows for an image and text to be placed
neatly next to each other. We decided to put the name of the champion above its
picture by putting, inside the `figure` tag, the caption before the picture. In
order to give the user a convenient experience, instead of only making the text
clickable, we make the entire `figure` clickable. The user can click on either
the name or the icon in order to go to the model page containing information
about that champion. This routing is done in Python through Flask, explained in
another section.

[Source 1](https://www.w3schools.com/tags/tag_figure.asp)
[Source 2](https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp)

### Model page

For each model, there is an instance, which has its own page of information.
This page contains text and an image. For example, we have the champion pages.
We leverage the Bootstrap grid system again in order to divide the page into
two. We put the image on the left and the text to right.

## Front End

### Installation

The first thing to do, in order to get started with building the front end, is
getting the required software. In Phase 1 of the project, we relied heavily on
Flask for routing and the corresponding templating engine, Jinja, for writing
the actual pages to be displayed on the website. You can get both of these
things by running the command `pip install flask`.

### Flask Routing

The file `main.py` contains all the code for routing. It makes sure that when a
user clicks on a link to some page, the website responds correctly. Flask gives
us a very simple framework for routing because all we had to do is create a
Flask object and write in the address that we wanted to route to whichever HTML
template. For example, we have our homepage which connects to the home.html
template.

Inside of `main.py`, we can use a part of the address to connect to a desired
template. For example, if we have the decorator
`@app.route('/champions/<name>')`, `name` is actually a variable that we can use
in the python code. If the user were to go to `/champions/draven`, then the
Python code will know that `name` is a variable bound to the string `draven`,
and we can use that to refer to a template, such as `name + ".html"`.

### Jinja Templates

Templates are HTML files, in essence. With the Jinja templating engine, we are
given the power analogous to that of object oriented programming. Flask and
Jinja will look in a specific folder for these templates. This folder is called
*templates*. Inside of this folder lies a directory tree that contains a ton of
templates that are displayed on the website or not. The ones not displayed on
the website are base or layout templates, which are analogous to the parent
class in object oriented programming.

The first template we created under the *templates* directory is named
`layout.html`. This template is the base for every other template on our
website. It itself is not displayed on our website. What it contains is whatever
we as a team deemed necessary to be on every single page. The first thing that
came to mind was the navigation bar at the top of the page. We knew that if it
were not at the top of the page, the user would have a hard time looking through
the entirety of our website. The navigation bar is the main part of layout.

On top of the navigation bar, we also include the main Bootstrap style and
JavaScript files that came with the Bootstrap installation. These are necessary
in order for a majority of the functionality of the user interface to work (e.g.
navigation bars, fonts, colors).

Inside of `layout.html`, you will see one other component that is not in the
mundane HTML file. This is a piece of code that looks like `{% block head %}`.
`block` is the keyword, while `head` is just a variable name that refers to a
html tag or ID. This piece of code tells the Jinja templating engine to
acknowledge that this part of the code may be referred to later on by child
templates.

For example, if `layout.html` is a parent template, one of its child templates
is `home.html`, the home page of our website. In order to be a child of
`layout.html` it must have a piece of code recognizable to the Jinja templating
engine at the top of the page: `{% extends "layout.html" %}`. Once the child
template, `home.html`, has this line, it inherits all of the HTML from
`layout.html`. In order to add items of its own, `home.html` can use normal HTML
or it use a line of code: `{% block head %}`. This was specified in the parent
template. What it does in the child template is allow it to put whatever HTML
code in the exact spot where `{% block head %}` was declared in the parent
template.

## Setting up Node.js
 - [link](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

First, set up all of the dependencies for node.js 8.
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

Then, actually install it.
sudo apt-get install -y nodejs

We're currently using npm 8.1.3 on the server for this project.

### Installing a package

To install a package called *the_package* locally:
$ npm install *the_package*

To install a package globally:
$ npm install -g *the_package*

local vs global:
 - local is a project dependency
 - global is a global utility or commandline helper.
   - usually actual programs instead of libraries/dependencies

some local options, from [this link](https://docs.npmjs.com/cli/install)

$ npm install -E
$ npm install --save-exact
 - saves the exact version of the dependency
 - otherwise nodejs will figure out the range that you need
 
$ npm install -D
$ npm install --save-dev
 - saves in devDependencies
 - used for development but not shipped

## Creating a React app

This is a docfile describing the setup procedure and some notes for 
[Create React App](https://github.com/facebookincubator/create-react-app).

### Basic Initialization

You need npm set up to do this. See docs/server/npm for details.

overview:
 - dependencies
 - make project
 - commands
 
### Dependencies

npm install -g create-react-app
 
### Make Project

$ cd react
$ create-react-app leaguedb
    This makes the folder react/leaguedb.

### Commands

$ npm start
Starts the development server.
 - you can edit files and then see updates live (!)


$ npm run build
Bundles the app into static files for production.
 - you can build the project for use in production (on flask!)

$ npm test
Starts the test runner.
 - tests are nice

$ npm run eject
Removes this tool and copies build dependencies, configuration files
and scripts into the app directory. If you do this, you can’t go back!
 - I'm probably not going to do this for a long time.

## AWS Setup
 - by Kasra Sadeghi

I used several technologies in the AWS setup. For the server hosting itself, I used an AWS EC2 instance.
Setting up the EC2 instance required making a security group and opening that up to the world, 
routing through AWS Route 53, I made some key pairs to get access to the server, and I set up a git repository on the machine that 
built a docker image to set up the application inside of it using the latest version of flask and python so that everyone has 
the same thing. 

Amazon also has a lot of irregular naming conventions for IPs on their website. There's a private IP, which is the local 
IP you have access to on the Amazon Cloud machinery. There's the Static IP, which changes every time your EC2 instance turns 
on and off. Then there's the Elastic IP which is unchanging for an EC2 instance and is used in Route 53.

Managing the NameCheap DNS lookup is also essential. The NameCheap student website specifically allows free .me domains, 
which is great for getting the project up and running.

These are some helpful links for the rest of the post, and most of the information in the steps below comes from these links:
 - http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html
 - https://www.mkyong.com/server/namecheap-domain-name-and-amazon-ec2/
 - https://ianlondon.github.io/blog/deploy-flask-docker-nginx/


I'm going to summarize the steps I followed as best as I can remember
for future use:

## Accounts

There are several accounts you need to get before you actually start setting anything up.

First you need an AWS account. In order to set that up, first get a regular AWS account. The login page will be called
"Log in to the Amazon Web Services Console" or something similar on anything you look up for AWS.
It will ask you for your 
credit card number, don't worry. Even if you don't have a student account, it won't charge you for a year. Afterwords,
go on GitHub and locate your student pack page. On the page, it'll have something like "Unique Link" under Amazon Web 
Services. Clicking that unique link will bring you to the Amazon account creation page where you will go through the setup process for 
creating an education account. 

At one point, it'll prompt you with a radio button that gives you two different amounts of credit
for the AWS Billing Process. One of the radio buttons will tell you to put in an Account ID. 
The Account ID is bound to the real Amazon Web Services account you made in the previous step.
 
Next, you need to make a NameCheap account. Go on the [NameCheap student website](https://nc.me/).
First, find a domain you like, and if you use a '.me' domain it'll be free.
   
## EC2 setup

There will be something that tells you to download a pem file. **It's
very very important.** That's how you will actually ssh into it and do
the [setup.txt](https://github.com/kasrasadeghi/idb/blob/master/docs/server/setup.txt) stuff.

Go back to the Amazon Web Services Console, which is the page you see after you log in. 
To log in from [aws.amazon.com](https://aws.amazon.com/), click my account in the top-right drop-down, and click
AWS Management Console underneath 'My Account'.

Under 'All Services', under 'Compute', it'll show EC2. In the documentation for EC2 it'll try to convince you to try 
out other things. In my experience they are much more complicated. Click EC2.

Click the blue 'Launch Instance' button. There are several options for servers. If you're not doing anything too fancy
or you're not managing much of the server yourself, you can choose from one of the many Fedora-based operating systems.
Personally, I chose the Ubuntu server because of its massive user base and the massive amount of packages it has, but also because
usually everyone is familiar with Ubuntu and has some amount of knowledge in how to set it up. Ubuntu Desktop and other
Debian-based desktops are also fairly popular so most people have some exposure to them. Choose the highest free instance type. Currently that is t2.micro.

Now we'll move onto configuring the instance. Don't assign a public IP to it, and it goes away immediately after it shuts down.
The only things you're going to want to look at in this first section are making sure you're using a working VPC, which is
probably the default one that Amazon Web services set up for you. It'll also probably default to the subnet closest to you.
If you client base is somewhere other than your current place of development, then choose a subnet to your preference.

AWS offers 30 gigabytes of free memory for the computer, and it defaults to 8. I chose 24 as a good in-between. It gives the instance
some room to grow, so you don't have to be scared of hosting databases or other things on it, but once it definitely won't 
run over the memory limit.

Next we're going to Configure Security Group. Make sure you're making a new security group in the radio buttons. Name it whatever you like
and be sure to add another rule below the SSH Rule for HTTP. It should be open to the world, 0.0.0.0, ::0 or something, and that just means that
all IPs can send HTTP requests. It'll warn you that you don't have security and that your computer is open to the whole world,
don't worry about it. It's just available for HTTP requests. Click review and launch and make sure the instance is running. It'll
take a couple minutes to spin up. If you've messed something up, terminate the instance. It won't delete immediate, but bits and pieces
of it will be reclaimed by the cloud as it goes away, and it should disappear eventually.

Somewhere in the configuration on the EC2 instance, probably around the creation of the security group, it'll tell you to make a .pem file
to log into your instance. I don't remember where in the workflow this happened, but make sure you download that and keep it somewhere safe.
That's going to be how you access the instance. If you've lost the file, you have to spin up an entirely new instance. Thankfully, 
AWS has an option to make instances like other instances.

Next we need to associate the EC2 instance with an Elastic IP, which is the publicly available non-changing IP. We need this
for routing. On the EC2 Dashboard, click Elastic IPs under the Resources header in the middle. Make a new one, and right click
it to associate the address. Click the instance you want to associate the address with. You can use this IP to ssh into the 
instance and set it up, especially while waiting for the name servers to propagate. You also want to jot down the static IP for the next step.

Most other services call Elastic IPs "Static IPs". The non-standardization of computer science naming conditions is
pervasive.

## AWS Route 53 setup

Now we're going to set up AWS Route 53 which is how our domain from NameCheap is going to be directed to the processes running on our EC2
instance. By the way, it might cost like 50 cents per month or something for this hosted zone, but with the education account,
it won't chip into real money for a while.

Back on the AWS Console, under "Networking & Content Delivery", click Route 53. On the Route 53 Dashboard, click Hosted Zones.
Create a new Hosted Zone. Type in the domain from NameCheap. For this project, it's "leaguedb.me". Leave everything else default.
There should be two record by default in the Record Set under the domain you just made. One of them should be of type NS, the other
of type SOA. The NS one is important for NameCheap later on.

Make two more records, both of type A. The first one leave everything default, and the second add a www to the name
so the full domain, in our case, is www.leaguedb.me. Then go to both and change the value to the Elastic IP we got in the EC2 Setup.

That finishes routing.

## NameCheap setup

Log back onto NameCheap. On the Dashboard, click Manage on the far-right for the domain you made.
Make sure nothing is set to auto-renew, under Products, and Domain. Under the first Domain tab, under the 
NAMESERVERS tag, choose Custom DNS. Put the things from the Route 53 NS record from the last step.

On amazon they have a dot at the end so they look like
"ns-1107.awsdns-10.org**.**". Delete the dot so
"ns-1107.awsnds-10.org".

Basically they should not have dots at the end of them.

## Wrap up

It will take at most a day or two for the domain name to work, but you can
SSH in regularly using the Elastic IP.

The SSH format is kind of strange; you need that .pem file from the security step during **EC2 setup**.

SSH looks like:

$ ssh -i "FILE_NAME.pem" ubuntu@[INSERT IP OR DOMAIN NAME]"

so for us it's 

$ ssh -i "secret_file_for_leaguedb.pem" ubuntu@leaguedb.me

See [setup.txt](https://github.com/kasrasadeghi/idb/blob/master/docs/server/setup.txt) for server running details.

## Set up Postgres on a local machine with Ubuntu 16.04

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

Remove a table.

`drop table name;`

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

[Source][postgres 1]

[postgres 1]:https://www.fullstackpython.com/blog/postgresql-python-3-psycopg2-ubuntu-1604.html

## AWS RDB Setup

### Create a Database Instance

Go to the AWS RDS page. On the left, there is a tab named **Instances**. Click
on it. A page shows up with a button called **Launch DB Instance**. Click on it.
Another page shows up with a collection of different databases including MySQL,
MariaDB, Oracle and PostgreSQL. For this project, select PostgreSQL. The next
page asks whether the usage of the database is for an actual product or for
development. I chose development.

The next page is a form with a many complicated attributes. I will go through
the important ones. **DB Engine Version** should be compatible with your build.
I chose 9.5 rather than the latest (at the time of the creating the new database
instance). For **Allocated Storage**, choose from 5 to 20 GB of storage. For
this project, I chose 10 GB because I did not expect our database to grow too
big. The following options are important for connecting to the new database
instance. For **DB Instance Identifier**, choose an appropriate name that you
will remember. Do the same for **Master Username** and **Master Password**. Make
sure the **Master Password** is very strong.

The next page is another form with even more complicated queries. If you want to
get through the process quickly, it is good to note that if you do not mention a
**Database Name** and a **Database Port**.

The sources are [here][db aws 1] and [here][db aws 2].

[db aws 1]:http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html 
[db aws 2]:http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html

## Database Setup

### Create the Models

In order to create a model

### Connect to the Database from Python

For this project, the database requires a secret password that is on the server,
so that the server can connect. We specify inside of `models.py` the remaining
specifications such as user name, database name and database location.

### Populate the Database

In `models.py`, I wrote a few functions that populate the database. In fact, you
can execute `models.py` on the command line, wait a few minutes, and the
database will be full with data.


