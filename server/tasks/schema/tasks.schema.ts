import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const TasksSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    taskList: String,
    taskListName: String,
    taskProject: String,
    taskProjectName: String,
    taskDeadline: Date,
    taskStarted: {
      type: Boolean,
      default: false
    },
    taskStatus: {
        type: String,
        default: 'new'
      },
    taskDifficulty: Number,
    taskScored: Boolean,
    taskDraft: Boolean,
    taskAttachments: [],
    taskModifiedBy: String,
    taskAssignedTo: String,
    created: {
        type: Date,
        default: new Date()
      },
    createdBy: String,
});
