How I setup the AWS instance:

technologies:
 - AWS EC2
   - security group
   - route 53
   - key pairs
   - elastic IP
 - namecheap domain name provider

links:
 - http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html
 - https://www.mkyong.com/server/namecheap-domain-name-and-amazon-ec2/
 - https://ianlondon.github.io/blog/deploy-flask-docker-nginx/

I'm going to summarize the steps I followed as best as I can remember
for future use:

## accounts

 - get an AWS account
   - get a regular AWS account for now
   - go on github with the student pack thing (googling is easier)
   - look for something like "AWS unique link"
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
