# Technical Report
Kasra Sadeghi, Ben Yang

##  Bootstrap (GUI setup)
 - by Ben Yang

### Installation

http://getbootstrap.com/getting-started/#download

Click on the "Get Bootstrap" button from the above page in order to get all the
files seen in static/.

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

https://www.w3schools.com/tags/tag_figure.asp
https://www.w3schools.com/bootstrap/bootstrap_grid_system.asp

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

### Model page

For each model, there is an instance, which has its own page of information.
This page contains text and an image. For example, we have the champion pages.
We leverage the Bootstrap grid system again in order to divide the page into
two. We put the image on the left and the text to right.

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

First you need an AWS account. In order to set that up, get a regular AWS account. It will ask you for your 
credit card number, don't worry. Even if you don't have a student account, it won't charge you for a year. Afterwords,
go on GitHub and locate your student pack page. On the page, it'll have something like "Unique Link" under Amazon Web 
Services. Clicking that unique link will bring you to the Amazon account creation page where you will go through the setup process for 
creating an education account. 

At one point, it'll prompt you with a radio button that gives you two different amounts of credit
for the AWS Billing Process. One of the radio buttons will tell you to put in an Account ID.

   - get the education AWS account
   - on the AWS education account, it tells you to find account ID
   - this can be found on account security or something (google it)
 - get a namecheap account
   - go on to the namecheap *student* website
   - find a .me domain you like
   - go through the process of setting it up
   
   
## EC2 setup

There will be something that tells you to download a pem file. **It's
very very important.** That's how you will actually ssh into it and do
the [setup.txt](https://github.com/kasrasadeghi/idb/blob/master/docs/server/setup.txt) stuff.

 - get on amazon web service (it'll say something about console log in)
 - find EC2 under services
 - click launch instance
 - click the server you like (recommended: ubuntu server)
 - choose the high free instance type (mine is t2.micro)
 - configure instance
   - don't assign public IP
     - the public IP goes away when the instance shuts down
   - don't change anything except 
   - using a working VPC
   - choose a subnet close to you, probably the default
 - add storage
   - at the time of writing you can get 30 gigs for free, I chose 24Gi
 - go to Configure Security Group
   - radio button: Create a *new* security group
   - name it whatever you like
   - add a rule for HTTP
   - don't touch it. it's fine if it's warning you
 - click review and launch
 - then launch it
   - there will be something around here that tells you to download a
     .pem file
 - on the dashboard, click "Elastic IPs"
   - make a new Elastic IP
   - right-click and say "assocaite address"
   - click the instance you want in the drop down

Now you have an Elastic IP. Everyone else calls these Static
IPs. We're going to use this in the next step.


## AWS Route 53 setup

 - get to route 53 under AWS services
 - on the dashboard for route 53 go to hosted zones
 - create a hosted zone
 - type in the Domain Name you chose from NameCheap
   - mine is leaguedb.me
   - every else default
   - click create
 - go to the record set if you're not brought there automatically
 - there should be 2 records automatically named
   - a record with type NS -> THIS ONE IS IMPORTANT LATER
   - a record with type SOA
 - make two more records, both of type A
   - the first one leave everything default
     - for us it points to leaguedb.me
     - it's called "leaguedb.me." on amazon
   - the second one add a "www" to the name
     - so then www.leaguedb.me for us
   - **Both** should have the value = Elastic IP you got in **EC2 Setup**


## NameCheap setup

 - get onto namecheap.com
 - log in
 - on dashboard
   - click the far-right "Manage" button for your domain
 - make sure nothing is auto-renew
   - check under products and domain
 - under domain, find the NAMESERVERS tag
 - choose Custom DNS
   - put in the things from the amazon NS record from the last step
   
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