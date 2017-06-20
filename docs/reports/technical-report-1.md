# Technical Report
Kasra Sadeghi, Ben Yang

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