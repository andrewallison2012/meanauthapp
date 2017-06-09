// this tells your application where the mongo database is and establishes a secret
// must require in your app.js file
//

module.exports = {
    // below is mongo's default port slash/ database you are using which is meanauth
    database: 'mongodb://localhost:27017/meanauth',
    // secret for your token it can be anything
    secret: 'yoursecret'
}