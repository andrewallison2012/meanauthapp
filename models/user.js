// this model holds all the fields names password email and user name
// funtions that interact with the database

// to connect to database
const mongoose = require('mongoose');

// bcrypt for encrytion
const bcrypt = require('bcryptjs');

// config file for mongoose
const config = require('../config/database');

// User schema
// the fields you are going to be using in your database
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type : String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// what to export from this file
// name of the model which is User and the name of th Schema which is user UserSchema
const User = module.exports = mongoose.model('User', UserSchema);

// funtions to use out side of this file export the get funtion that is delared here
// uses the users id and callback can call from any file that requires this file
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};
// finds the user by username
module.exports.getUserByUsername = function getUserByUsername(username, callback){
    //using a query using the find one funtion
    // const is set by passed in arguments username
    const query = {username: username};
    User.findOne(query, callback);
};
// add user funtion that adds a user to the databse when registering it is used in the routes users file
module.exports.addUser = function addUser(newUser, callback){
    // salt is a random key, this is where the encrytion takes place
    // generate a salt which is a random key 
    bcrypt.genSalt(10, (err, salt) =>
    {
        // generate a hash from the using the salt(which is a key) to create a hashed password (a encoded or encryted password ie DFJEjdale3fnaeLEI)
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            // if there is an error thow the error
            if (err) throw err;
            //sets the new user password to a hash
            newUser.password = hash;
            // saves the new user
            newUser.save(callback);
        });
    });
};
//funtion that checks to see if the entered password matches
module.exports.comparePassword = function comparePassword(canidatePassword, hash, callback){
    bcrypt.compare(canidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}




