// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Profile` from `../models/ProfileModel.js`
const Profile = require('../models/ProfileModel.js');
const signupController = {

    showSignUp: function (req, res) {
        res.render('signUp'); // Assuming the filename is SignUp.hbs
    },

    postSignUp: async function (req, res) {

      // Extract the data from the request body
      var fname = req.body.fname;
      var lname = req.body.lname;
      var uname = req.body.uname;
      var email = req.body.email;
      var password = req.body.password;

      if(fname != undefined 
        && lname != undefined 
        && uname != undefined 
        && email != undefined
        && password != undefined){
            // Create an object to store the new profile data
        bcrypt.hash(password, saltRounds, async function(err, hash){
            const newProfileData = {
              fname: fname,
              lname: lname,
              uname: uname,
              email: email,
              password: hash,
              about: '',
              quoteMain: '',
              quoteDesc: '',
              isUser: true,
              profPic: ''
            };

          try {
            // Connect to the database
            await db.connect();

            // Check if a profile with the same username already exists
            const existingProfile = await db.findOne(Profile, { uname: uname }, 'uname');

            if (existingProfile) {
              // Profile with the same username already exists, redirect back to signup page with an error message
              res.render('signup', { signupError: 'Username already taken' });
            } else {
              // No existing profile with the same username, create a new profile document in the 'profiles' collection
              const newProfile = new Profile(newProfileData);
              await newProfile.save();

              // console.log('New Profile Added:');
              // console.log(newProfile);

              // Profile created successfully, redirect to the profile page passing the username
              if(req.session){
                req.session.curUser = newProfile.uname;
                console.log("signup-check:" + req.session.curUser);
                res.redirect(`profile/${newProfile.uname}`);
              }else{
                console.log('signup-check: no session found');
                res.redirect(`profile/${newProfile.uname}`);
              }
            }
          } catch (err) {
            console.error('Error while signing up:', err);
            res.render('error');
          }
        });
            
        }else{
          submitError = "Form isn't correctly filled/ Fully filled"
          res.render('signup',submitError);
        }
      
    
  },

  getCheckUName: async function (req, res) {

    /*
        when passing values using HTTP GET method
        the values are stored in `req.query` object
        Example url: `http://localhost/getCheckID?idNum=11312345`
        To retrieve the value of parameter `idNum`: `req.query.idNum`
    */
    var uname = req.query.uName;

    /*
        calls the function findOne()
        defined in the `database` object in `../models/db.js`
        searches for a single document based on the model `User`
        sends an empty string to the user if there are no match
        otherwise, sends an object containing the `idNum`
    */
   console.log("username checking match");
    var result = await db.findOne(Profile, { uname: uname }, 'uname');
    res.send(result);
}
};

module.exports = signupController;
