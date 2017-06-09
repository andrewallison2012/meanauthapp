const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// gets us our User schma funtions and all exported stuff
const User = require('../models/user');

//Register ... it will automatically put in the "user"/register in th url due to app.js app.use('/users', users)
// shows what to dispaly at http://localhost:3000/users/register
router.post('/register', (req, res, next) => {
    // calling a funtion from our model 
    // it is passed an object that is submitted in the form 
    // this is the new user object
        // request the body then the name  
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    // calls a funtion to add user
    // passed a new user object and a callback
    // call back handels errors and takes err and user name to respond with json message
    User.addUser(newUser, (err, user) => {
        if(err){res.json({success: false, msg: 'failed to register user' });}
        else{res.json({success: true, msg: 'successfully registed user'})}
    });    
});
//authenticate ... it will automatically put in the "user"/register in th url due to app.js app.use('/users', users)
// shows what to dispaly at http://localhost:3000/users/authenticate
router.post('/authenticate', (req, res, next) => {
    //capture username
    const username = req.body.username;
    // capture password
    const password = req.body.password;
    // get user by username
    User.getUserByUsername(username, (err, user) => {
        // if there has been an error
        if(err) throw err;
        //if not a user then
        if(!user){
            return res.json({success: false, msg: 'user not found'})
        }
        // tells us if the password matches
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            // if the password is a matach
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                   // one week until password exprires
                    expiresIn: 604800
                });
                //respond with a json token and success true
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }else{
                //if pass word doesnt match
                return res.json({success: false, msg: 'wrong password'});
            }
        });
    });
});
//profile ... it will automatically put in the "user"/register in th url due to app.js app.use('/users', users)
// shows what to dispaly at http://localhost:3000/users/profile
// profile route is protected by adding the second parameter of passport.authenticate('jwt', {session: false})
// tells what to do with the get request, which is send back the user info that made the request
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json(
        {
            user: req.user // all user info
            // _id: req.user._id, // just id
            // name: req.user.name, // just name
            // email: req.user.email, // just email
            // username: req.user.username, // just username
            // password: req.user.password, // just password
            // __v: req.user.__v, //  
    }
    );
});

//this exports the routes so the app.js file can use it IE its not avaliable from require untill you do
module.exports = router;

