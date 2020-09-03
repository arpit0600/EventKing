# Event-King
Event space rental web app made with the help of MapMyInda interactive map API, HTML CSS with BOOTSTRAP with Express backend and mongoDB. 

Software Installation:

1. This web-app is running on node.js backend before prrocedding towards installing dependencies first configure node and npm on your system, [download](https://nodejs.org/en/download/) and for installation and configuration refer [npm documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Download the community server of the mongoDB data base from [here](https://www.mongodb.com/try/download/community) and set up the environment with the delp of [documentation](http://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/).




Setting up working enviornment:

1. To initiate nodejs run followig command
  npm init

2. To set up mongoDB environment open powershell and pass command "mongod" and it will start        


Installing dependencies with the help of npm:

1. Firstly have to install express for backend framework 
  "npm install express"
  
2. install bodyparser for body elements
  "npm install body-parser"
  
3. installing path
  "npm i path"
  
4. install mongoose which willl help us to store data in mongoDB
  "npm i mongoose"
  
5. install pug template engine 
  "npm i pug"
  
now run command "node server.js"


If there is no problem then in terminal it will output the port no. on which application is running abd by default it is port no. 50
So to access the webpage check this [url](http://localhost:50/).

Don't forget to add MAP API KEY in search.pug file in script tag

POINTS TO REMEMBER:

1. On index page will there be a search bar and on nav bar there will be a "Add Property" button, so technically untill and unless there are no property listed we won't be able to search anything so first click on "Add Property" button and list a property.

2. City and Date of Event are the main filtering points on which search will happen, so remember the date and the city of the property listed.

3. After adding all the details of the property click on the submit button and look out for the message "done hurray!!!!" and also the details of property submitted will be flashed on the terminal.

4. After listing the property go to the search page or home page and search of the event space.

5. If a successful search happens then the search results will be dispalyed in the form of cards with the location given on the map.

6. For more details click on "Deatils" button and we will be navigated on the respective page.
