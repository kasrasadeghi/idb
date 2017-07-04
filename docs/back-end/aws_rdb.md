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

The sources are [here][1] and [here][2].

[1]:http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SettingUp.html 
[2]:http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html
