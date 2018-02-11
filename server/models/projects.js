var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

var projectsSchema = new Schema({
    newProject: {
        type: Boolean
    },
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
      type: String,
      required: true
    },
    projectCategory: {
      type: String
    },
    projectTags: {
      type: String
    },
    projectOwner: {
      type: String
    },
    projectCreated: {
      type: Date,
      default: Date.now
    }
});

projectsModel = mongoose.model('projects', projectsSchema, 'projects');
module.exports = projectsModel;