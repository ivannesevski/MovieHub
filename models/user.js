var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true
        },
        firstName: {
            type: String, default: ""
        },
        lastName: {
            type: String, default: ""
        },
        gender: {
            type: String, default: ""
        },
        DoB: {
            type: String, default: "yyyy-mm-dd"
        },
        about: {
            type: String, default: ""
        },
        private: {
            type: Boolean, default: false
        },
        movieList: {
            type: Array, default: []
        },
        isAdmin: {
            type: Boolean, default: false
        }
    },
    {
        collection: 'users'
    }
);


var connection = mongoose.createConnection('mongodb://localhost/usersdb');

module.exports = connection.model('User', userSchema);