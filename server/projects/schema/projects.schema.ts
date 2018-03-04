import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const ProjectsSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    projectCategory: String,
    projectTags: String,
    projectOwner: String,
    projectCreated: Date,
    projectCreatedBy: String
});
