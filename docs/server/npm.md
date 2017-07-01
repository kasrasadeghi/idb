# Setting up Node.js
 - [link](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

First, set up all of the dependencies for node.js 8.
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

Then, actually install it.
sudo apt-get install -y nodejs

We're currently using npm 8.1.3 on the server for this project.

#### Installing a package

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
