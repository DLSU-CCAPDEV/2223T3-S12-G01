
// import module `mongoose`
const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

// defines the schema for collection `Post`
var PostSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
    },
    uname: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    reply: {
        type: Array,
    },
    date: {
        type: Date,
        required: true
    },
    dislike: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },  
    reviewing: {
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
const Post = mongoose.model('post', PostSchema, 'post');
console.log(Post); // Log the Profile model to check if it's properly defined.
module.exports = Post;