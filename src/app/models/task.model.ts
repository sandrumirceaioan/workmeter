export class Task {
    _id?: string;
    taskName: string;
    taskDescription: string;
    taskList: string;
    taskProject: string;
    taskDeadline: Date;
    taskStarted: boolean;
    taskStatus: string;
    taskAssignedBy: string;
    taskAssignedTo: string;
    created?: Date;
    createdBy?: string;
}