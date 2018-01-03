var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = ({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    eta: {
        type: Number
    },
    content: {
        type: String
    },
    urgent: {
        type: Boolean
    },
    solved: {
        type: Boolean
    }
});

var todoSchema = mongoose.model('todos', todoSchema);
module.exports = todoSchema;