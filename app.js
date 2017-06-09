
// simplifys server setup with node js
const express = require('express');

//lets you navage to path in server
const path = require('path');

// helps you get data from body of json form
const bodyParser = require('body-parser');

//middleware for your server allows certian connections to api
const cors = require('cors');
const passport = require('passport');

// the package that connects you to your database
const mongoose = require('mongoose');

// imports the export form the database.js file which tells us the mongodb database to use
const config = require('./config/database');

//Includes the routes for all other paths . is the current directory... when
// When navagating to relative file use tell how to get to file from current file
// only gets the stuff that has been exported in users
const users = require('./routes/users')
// Allows us to connect to out database
// location of the database is passed as an argument
// config folder is where new data base is for now
// uses the config require above and gets the database attribute in the object which was exported (not saying get the file database, the file has already been gotten by the requires)
//config.database means look at require file this get the database item in that export object... this is a data base string url
// mongoose.connect('mongodb://localhost:27017/meanauth'); would work for simplisty sake
mongoose.connect(config.database);

//gives us feedback when connected
// says when a connection is made using mongoose run the callback funtion that issues a console log
mongoose.connection.on('connected', () =>{
    console.log('connected to: '+config.database)
});
// when there is an error
mongoose.connection.on('error', () =>{
    console.log('database connection error with: '+config.database + " the error is: "+err)
});

//links the constant app to the express method
const app = express();

//names the port the express is going to serve on
const port = 3000; 

// Middle ware to allow access for API, this is for access to the API from any url
app.use(cors());

//This is where the live Angular 2 File will live this is the static client side folde
//__dirname is the current directory, we are joining the current directory and naming it public you can call it what ever you would like
// this tells this server to look in the directory called public for index.html
app.use(express.static(path.join(__dirname, 'public')))

//This enables body parser.json, parses incoming request bodies, enables you to grab data when a form is sent
app.use(bodyParser.json());

// set up passport middleware for password and token set up
app.use(passport.initialize());
app.use(passport.session());

// passport require
//  gets the funtion with no name that has been exported form passport.js and passes the passport variable to it as an argument
require('./config/passport')(passport);

/*
------------------This is where user routes are managed... require antother file of name/name after name
*/


//anything that uses mydomainname.com/user/... will use "users = require('./routes/users')""
// shows what to dispaly at http://localhost:3000/users/
app.use('/users', users)

//Index Route, all other routes are managed above in the const users require
app.get('/',(req,res) => {
res.send('You are currently seeing the route for: /');
});

//START SERVER This asks which port to start the server on and lets you call a funtion when it has been run.
app.listen(port);

// Below is an optional listen funtion with a callback funtion read to log which port is connected
// app.listen(port, () => {
// console.log('Server Started on port: ' + port)
// });



