# Technical Report
Kasra Sadeghi, Ben Yang, Todd Schriber

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

### Docker

We use this in order to maintain the same development environment between all of
our developers. Whenever someone pushes the code to the remote repositories, and
another person pulls the newest version, we will have no fear that the code will
run if it ran on another's computer, as long as we have the same docker image.
In fact, our AWS host that has our web server uses the same docker image that we
use for testing. This is so that we, the developers, will have no worries after
deploying the most recent version of our website.

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

### Unittest

This Python module `unittest` allows us to write unit tests for the backend of
the website. It makes sure that API calls are functioning to a decent degree,
from both the website's perspective and any potential, future user's
perspective.

### Coverage

Since the backend is in Python, we make use of the coverage tool to report how
much of our code is actually being run with out tests. It is not our life
commitment to make sure that coverage one-hundred percent, but it is a decent
heuristic to see how well our tests are.


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

### TravisCI

There is no question about it. We use continuous integration because we want an
automatic build to run all of our unit tests whenever we do a `git push`. We can
check after every push whether our build is still working and passing all of the
tests.

### Git

This is the most popular source control system. We jumped onto the bandwagon and
use it as well. The best part about Git is using its website, GitHub, in order
to link many of the other technologies to it. For example, TravisCI runs our
build every time we do a `git push` because our GitHub repository has specific
settings telling TravisCI to do so.

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

## Python Front End

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

## React Front End

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

### Reactstrap

This is an module of React that is essentially a wrapper for Bootstrap style
tags. For all of the React pages on our website, we use this rather than vanilla
Bootstrap so that we can have the best of both worlds, and have them easily
manageable from one piece of software, React. This allows us to make edits to
the functionality of the display of the website and to the style of our entire
website solely from editing a few JavaScript files written with React.

After going to our website and browsing it for a while, you will see that there
are a lot of buttons, cards, layouts and navbars. All of these seem like they
come from Bootstrap, but as mentioned before, they come from reactstrap. For
example, when you click on a button, the code will run a `handleKeyPress` kind
of function. Because all of this is done in React, we are able to see all of the
other React elements as well. The elements hard-coded into the `index.html`
template are accessible, but it is better if all of the important and
*malleable* elements are configured with React, at least for the sake of better
development.

Inside of the React-based JavaScript files, we have modularity. For example, the
code that displays the website for viewing all the champions has a navigation
bar on the top, a set of options for filtering and sorting and a paginated list
of champions. In order to maintain consistency between React pages, for example,
we encapsulated the navigation bar in a class called `LeagueBar`.

This is not to say that Reactstrap is a replacement for Bootstrap. In order to
use Reactstrap, you have to have Bootstrap installed onto your system!

### Model Views

Our website consists of four main pages, each of which is a list of instances of
a distinct model. For example, one of the models is **Champion**. The
**Champions** page contains a list of champions.

### Sort

Automatically, the champions are sorted by name. The list will have the names:
Aatrox, Ahri, etc. There is a button *Sort Alphabetically Backwards* that does
what it says. If the user clicks on this button, the list will start with the
champions: Zyra, Zed, etc.

### Filter

By default, there is no filtering. For example, on the champions page, all of
the champions are present. The user has the option to sort by classes. Classes
are another model of our website. Each champion has one or two main classes.
There are a set of buttons at the top of the page, each of which contains a
class name in it. If the user clicks on one of these buttons, the code will
filter out the list of champions.

## AWS Setup

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

## Search

### Overview

Our search functionality is based on a single search page that the user can go
to through the navigation bar. Once, the user gets to the page, the user is able
to type something he or she wants to search and results will dynamically show
up. The search term will be highlighted and have other text around it, which
will show the user the context of the search term.

### Multiple Search Terms

The user is able to input multiple search terms by separating words with spaces.
For example, the user may search *dr as*, and both search terms will be
highlighted in the resulting search.

### AND/OR

There is another button that the user is able to toggle. The only two options
are AND and OR. The consequences of this setting are only visible to the user
when the user inputs more than one search term.

If the user inputs more than one search term and highlights the AND button, that
means the results will only shows instances of models, where some attribute of
the model contains all of the search terms.

If the user inputs more than one search term and selects the OR button, that
means the results will show instances of models, where some attribute of the
models contains any of the search terms.

### Filter By Model

Another reason we did not choose the aforementioned implementation is because we
wanted to offer easily accessible filters with our search functionality. The
user is able to go to our search page and click on a button. We have button for
each model, and when the user clicks on one, the search will be filtered by that
model.

For example, if the user clicks on the *Items* button and types in *zyra*, the
results will only be of instances from the *Item* model. The results will mainly
consist of items that the champion *Zyra* uses.

### Rationale

We thought that a search page would be better than a search bar because it would
be easier for the user to view search results. At first, we had the idea of
appending a search bar to the end of our navigation bar. However, we didn't not
think that this would be beneficially to a dynamic search system. We wanted a
dynamic search system because we believed that it would give the user a better
experience with the website's data.

### A Potential Implementation

What we could have done is the following. When the user goes to our website, and
focuses on the search bar inside of the navigation bar, by clicking on it or by
some other means, the website would pop open a modal which would expand the size
of the search bar and center on the screen. On the same modal, below the search
bar, results would show up dynamically as the user typed.

We did not go with this implementation because we thought it was overly complex
for the website. We wanted to keep things as simple as possible, which would
benefit the user's navigation experience and our development.

## Automatic About Page

For the most part, we, the developers, completed the about page's information
manually. The stupid task that we did not want to do was count the number of
commits we each had, and then count the number of Trello issues we each had. We
had the idea that his function could be automatically implemented into the about
page's JavaScript. That is what we did.

The first we had to do was find the compatible API's provided by GitHub and
Trello. Luckily, since we are only requesting for information and not changing
anything with a POST or PUT or DELETE request, neither website requires us to
make and account and use a special API key.

The GitHub API was a lot nicer to use. They had an endpoint to their API that
gave back to us a JSON which contained information about all of the
contributors. Each contributor object contained information such as the GitHub
ID and the number of commits. That is all we needed. It contained a lot of other
information, but we did not have a use for that.

The reason that the above is nice is that it plays well with ReactJS. The
ReactJS code for the about page contains a state. The state is able to contain a
set of variables. In the case of using the GitHub API, we were able to cleanly
implement the solution using a JSON object. The object was essentially a mapping
of names or number of commits.

The Trello API was hard to use because it was a pain to implement it with our
already existing ReactJS code.

## About Page Clean Up

In the end with a group member dropping we decided to remove him from the
project. After removing all references to him we had to re-organize our new
automatic system. We were still gathering his commits as well as extraneous
information. Therefore, we re-added him into the system as a dummy to collect
the data, we also dynamically tracked the commits he did have and subtracted the
number. This was all okay because after thorough vetting we found that anything
that he had written had been replaced by new cleaner code. So, his commits were
invalid. After all the data was removed there was still a formatting issue so
after much debate we ended up only centering the third member utilizing
reactstrap to create a singular row.

## Consolidation

### Terminology

In our project, we have many models, and each models has many instances. We call these
instances "particles" and we call the pages that collect many instances in some kind of
list or grid "blobs".

So for example, Aatrox is an instance of the Champion model, so the Aatrox page is a 
champion particle page.

### Routing

To consolidate the project, I had to first get all of the components from 
our original projects in the top level react folder to one project. The next
problem was routing all of the components together.

The routing solution we used was that there is a top-level App react component 
that keeps track of the current state of the program. The state it keeps track
of is the whether a particle of one of the models is currently being inspected,
and what models are generally supposed to be displayed. This makes it so that
all of the routing logic and display logic all waterfalls down from one component
that keeps track of inherent state. The other benefit to this strategy is that 
it's easily extensible in the future. If you want a component to route to any 
other program state, you simple pass along the route function as a property and then
call it with the correct arguments.

The route function takes two arguments, the model and the particle name. If the particle
name exactly matches the string "none", the website shows a general purpose page, like any
of the pages in the navbar. If the particle name is not "none", it's name is expected 
to be an identifying name of one part of the current model. 

There are the following models, and only some of them have specific particles:

 - Home: no particles
 - Search: particles of all models, needs routing.
 
The following are particle models: 
 
 - ChampionList: champion particles, needs routing.
 - ChampionView: a single champion particle that routes to the attributes of the champion 

 - ItemList: item particles, needs routing.
 - ItemView: a single item particle that routes to the attributes of the item
 
 - ClassList: class particles, needs routing.
 - ClassView: a single class particle that routes to the attributes of the class
 
 - RoleList: role particles, needs routing.
 - RoleView: a single role particle that routes to the attributes of the role
 
 - About: no particles
 
Every single page has some basic routing with the navbar, so we send some basic routes 
through that that don't keep track of any specific particle. So when we route to the navbar,
we can partially apply it so that it only uses "none" for the particle type.

### Consolidation Benefits

There's a great deal of benefits that we received when consolidating the project. 
Since create-react-app had to build around ten individual project before and now it only has
to build one, the build times are an order of magnitude faster. It also means that there's
a great increase in the testability of the code because we can use create-react-app's 
"npm start" command and test the majority of the code for the website, with live updates
and refreshes. This tremendously increases developer productivity and it decreases the time
between a bug is made and the bug is found and squashed, even separate as a byproduct of the 
simplified testing. This also means that it's a lot simpler to get started helping the 
project grow in the future, and onboarding new members of the team should be rather simple in
comparison.

There's also the code itself, that is much more clean with the impressive scale of this 
refactor. Many of the benefits include reuse of react components, reuse of program logic, 
cleaner logic for program state, better analysis of program state during testing, and many 
more.

The reuse of react components was the principle thing on my mind during the consolidation.
Before, on every page, we had to have a separate navbar that was basically the same component
copy-pasted onto many different files. There were ten different copies of the navbar 
initially. After that, the number shrank. We also extended many of the view components to
be reused in both the list and the search results, so that much of the code to show each 
particle in a card from reactstrap was reduced.

The reuse of program logic was the fundamental thing that allowed us to actually consolidate
the project at all. The project needs to have a core component that analyzes state, so 
it removes all routing logic to a central location, all champion logic to the champion 
modules, all item logic to the item modules, all class logic to the class modules, and all 
role logic to the role modules. There's also a great deal of state that is abstracted away 
in the search module. 

The fact that our project is modular in the first place was necessary to make it possible
to add new features quickly. In effect, this made our code more agile.

## Aesthetic Improvements

### Colors 
In order to improve the professional environment, we took several steps in order
to create a more refined product. We started by going into react and changing
our initial white and black color scheme into the traditional league blue and
gold, with some black thrown in for style. We found the exact RGB values by
utilizing the color picker from photoshop and then extrapolated shades from
there. We also attempted to make the entire site more uniform by creating a new
nav bar that worked in both react strap and regular boot strap. The redesign was
actually a bit more difficult than expected since the first one was native to boot strap. Building it up from scratch was a bit harder.

### Resizing photos

This was actually in stage 2 of the project, but going through
our notes we realized we had forgotten. In order to provide our profile pictures
we all had to contribute a photo. However they were sent in different sizes and
different file formats so we had to utilize photoshop in order to make all of
the pictures uniform. We eventually decided that these would be close in pixel
size to the images we were using for champions. Eventually we decided to convert
everything to jpg instead of png because we wanted to increase the load speed of
our website while still maintaining quality of pictures.

## Edit

### Additions

Currently, the only edits that a user is able to make is an addition of an
instance to the *Champion* model. The navigation bar was an *Edit* tab which the
user is able to click on. Once the user clicks on it, the website redirects the
user to the *Edit* page. This page contains a form that the user will fill out.

The first thing that the user will see is a *Key* entry. The user must have
access to a key that we have on the GitHub repo. This is put as an incomplete
security measure, so that the malicious user is not able to overload our website
with too many faulty additions or destroy our website by deleting everything
(once we implement removals). When the user types the key, it will be dots on
the screen, so that no one looking form behind them will see the key.

The next part of the form that the user needs to fill out is the model. The user
needs to decide which model he or she wants to edit. As I said before,
currently, the only edit that is possible is an addition to the champions model.
To be more precise, the user is able to add an instance of a champion to the
database. There is currently no check whether that champion is completely made
up or is actually a real, newly released champion.

The other models are in the drop down menu just for show. The functionality is
not yet implemented, even if you see the green box show up at the bottom of the
page after you click submit.

The next section of the form is the various attributes that is unique to each
model. The ReactJS code is setup so that the HTML will render a different set of
attributes depending on which model the user selected from the drop down menu.
Once the user has filled in the attributes, with legitimate information or not,
the user is able to click the *Submit* button and send a POST request to the
server.

The server will check whether the key is a valid key. If the key is wrong, then
the server will abort and send back to the client a response with the error code
*499*. The client is coded so that the client will respond to this by outlining
the *Key* part of the form red. The client's browser will also display a message
that says *Wrong Key*.

If the server accepts that the key is valid, then the server will check another
condition, which is which model the user selected. Recall that in the POST
request that the client sends to the server, the body of the POST request has
all the information that the server needs in order to process the request. One
such piece of information is the key. Another is the model name, such as
*Champion* or *Item*. The rest of the information is the attributes that the
user filled out, which is also a majority of the form.

The server code will then add the data to the database and update the cache that
we have on the server. If all of the above goes well, and there are no
complaints from the database or the server's code, then the server will respond
with a status code of *200*, indicating that the edit was successful.

