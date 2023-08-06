
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `Profile`
var ProfileSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: false
    },
    quoteMain: {
        type: String,
        required: false
    },
    quoteDesc: {
        type: String,
        required: false
    },
    isUser: {
        type: Boolean,
        required: true
    },
    profPic: {
        type: String,
        required: false
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/

const Profile = mongoose.model('profile', ProfileSchema, 'profile');
console.log(Profile); // Log the Profile model to check if it's properly defined.
module.exports = Profile;