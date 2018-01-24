var mongoose = require('mongoose');
var validate = require('mongoose-validator');
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
    emailAddress: {
        index: {
            unique: true
        },
        type: String,
        required: true
    },
    invitationCode: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number
    },
    userStatus: {
        type: Number
    },
    token: {
        type: String
      },
});

var usersModel = mongoose.model('users', usersSchema, 'users');
module.exports = usersModel;