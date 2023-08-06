
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `Resto`
var RestoSchema = new mongoose.Schema({
    restoName: {
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
    address: {
        type: String,
        required: true
    },
    greetings: {
        type: String,
        required: false
    },
    about: {
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
    cuisine: {
        type: String,
        required: true
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]
});
/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/

const Resto = mongoose.model('resto', RestoSchema, 'profile');
console.log(Resto); // Log the Profile model to check if it's properly defined.
module.exports = Resto;