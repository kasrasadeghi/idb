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
