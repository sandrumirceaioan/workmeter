var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        index: {
            unique: true
        },
        type: String,
        required: true
    },
    email: {
        index: {
            unique: true
        },
        type: String,
        required: true
    },
    invitation: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number
    }
});

var usersModel = mongoose.model('users', usersSchema, 'users');
module.exports = usersModel;