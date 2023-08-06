
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `Post`
var PostSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    reply: {
        type: String,
        required: true
    },
    replier: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    dateReplied:{
        type: String,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
const reply = mongoose.model('reply', PostSchema, 'replies');
console.log(reply); // Log the Profile model to check if it's properly defined.
module.exports = reply;