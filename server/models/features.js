var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

var featuresSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    allowed: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },

});

var featuredModel = mongoose.model('features', featuresSchema, 'features');
module.exports = featuredModel;