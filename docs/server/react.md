# Creating a React app

This is a docfile describing the setup procedure and some notes for 
[Create React App](https://github.com/facebookincubator/create-react-app).

## Basic Initialization

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


