const express = require('express');
const controller = require('../controllers/controllers.js');
const loginController = require('../controllers/loginController.js');
const profileController = require('../controllers/profileController.js'); // Import the profileController
const signupController = require('../controllers/signupController.js'); // Import the signupController
const restoLoginController = require('../controllers/restoLoginController.js'); // Import the restoLoginController
const validation = require('../helpers/validation.js');

const app = express();

app.get('/', controller.redirectToRoot);

app.get('/login', controller.getMain);

app.post('/logincheck', validation.loginValidation() ,loginController.postLogIn);

app.get('/restologin', restoLoginController.showRestoLogin);
app.post('/restoLoginCheck', restoLoginController.postRestoLogin); // Add a route for establishment login


// Add a route for profile
app.get('/profile/:uname', profileController.showProfile);

// Add a route for resto
app.get('/resto/:email', profileController.showResto);

// Add a route for resto
app.get('/restoProfile/:email', profileController.showRestoProfile);

// Add a route for signup
app.get('/signup', signupController.showSignUp);
app.post('/signup',validation.signupValidation(), signupController.postSignUp);
app.get('/getCheckUName', signupController.getCheckUName);

app.get('/restolist', controller.showRestoList); // Add a route for restoList

app.get('/home', controller.showHome); // Add a route for home

// Route to handle liking a review
app.post('/likeReview/:reviewId', profileController.likeReview);

// Route to handle disliking a review
app.post('/dislikeReview/:reviewId', profileController.dislikeReview);

// Route to handle the "Reply" button click
app.post('/replyReview/:reviewId', profileController.replyToReview);

// Route to handle editing a reply
app.put('/editReply/:replyId', profileController.editReply);

// Route to handle deleting a reply
app.delete('/deleteReply/:replyId', profileController.deleteReply);

app.get('/logout', controller.logout);

app.get('/updateProfile', profileController.updateProfile);

app.get('/createReview', controller.createReview);

module.exports = app;