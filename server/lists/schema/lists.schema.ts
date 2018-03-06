import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const ListsSchema = new mongoose.Schema({
    listName: String,
    listDescription: String,
    listProject: String,
    created: Date,
    createdBy: String
});
