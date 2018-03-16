import * as mongoose from 'mongoose';

  export interface Task extends mongoose.Document {
    taskName: string;
    taskDescription: string;
    taskList: string;
    taskProject: string;
    taskDeadline: Date;
    taskStarted: boolean;
    taskStatus: string;
    taskDifficulty: number;
    taskScored: boolean;
    taskAttachments?: string[];
    taskAssignedBy: string;
    taskAssignedTo: string;
    created?: Date;
    createdBy?: string;
  }