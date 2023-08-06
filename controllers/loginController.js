const bcrypt = require('bcrypt');

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Profile = require('../models/ProfileModel.js');

const loginController = {
  postLogIn: async function (req, res) {
    var username = req.body.uname;
    var password = req.body.password;
    console.log("username: ", username);
    console.log("password: ", username);
    if(username != undefined && password != undefined){
      var query = { uname: username, isUser: true};
      var projection ='uname password';
  
      try {
        await db.connect();
        // Find the user in the database based on the provided credentials
        const prof = await db.findOne(Profile,query,projection);
  
        console.log('prof:',prof); // Add this line for logging
  
        if (prof) {
          bcrypt.compare(password, prof.password, function(err, equal){
            if(equal){
              // User found, redirect  to the profile page passing the user data
              if(req.session){
                req.session.curUser = prof.uname;
                console.log("check:" + req.session.curUser);
                res.redirect(`profile/${prof.uname}`);
              }else{
                console.log('no session found');
                res.redirect(`profile/${prof.uname}`);
              }
              
            }else{
              res.render('main', { submitError: 'Invalid username or password'});
            }
          })
          
        } else {
          // User not found or invalid credentials, render the login page with an error message
          res.render('main', { submitError: 'Invalid username' });
        }
  
      } catch (err) {
        console.error('Error while logging in:', err);
        res.render('error');
      }
    }else{
        submitError = "Form isn't fully filled"
          res.render('main',submitError);
    }
  }
};

module.exports = loginController;
