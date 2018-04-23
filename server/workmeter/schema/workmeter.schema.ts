import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const WorkmeterSchema = new mongoose.Schema({
    workmeterTask: String,
    workmeterDuration: {
        type: Number,
        default: 0
    },
    workmeterStoped: {
        type: Date
    },
    created: {
        type: Number,
        default: function(){return new Date().getTime()}
    },
    createdBy: String
});
