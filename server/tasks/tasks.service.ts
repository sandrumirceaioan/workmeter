import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TasksSchema } from "./schema/tasks.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./interfaces/tasks.interface";
import * as _ from 'underscore';
import * as moment from 'moment';

const ObjectId = require('mongoose').Types.ObjectId;

_.mixin({
    compactObject: function(o){
        _.each(o, function(v,k){
            if (!v) delete o[k];
        });
       return o; 
    }
});

@Component()
export class TasksService {
    constructor(@InjectModel(TasksSchema) private readonly taskModel: Model<Task>){}
    
    async addTask(task): Promise<Task>{
        if (task.taskDeadline) task.taskDeadline = moment(task.taskDeadline.formatted).endOf('day');
        if (task.taskDraft) task.taskStatus = 'draft';
        let newTask = new this.taskModel(task);
        try {
            let task = await newTask.save();
            return task;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allTasks(params): Promise<Task[]>{
        let query = {
            taskAssignedTo: params._id,
            taskDraft: false
        };
        let tasks = await this.taskModel.find(query).sort({created: -1});
        return tasks;
    }

    async oneTask(params): Promise<Task>{
        let query = {_id: new ObjectId(params.id)};
        try {
            let oneTask = await this.taskModel.findOne(query);
            if (!oneTask) throw new HttpException('Task not found!', HttpStatus.BAD_REQUEST);
            return oneTask;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateTask(params): Promise<Task>{
        let query = {
            _id: new ObjectId(params._id)
        };
        try {
            let updatedProject = await this.taskModel.findOneAndUpdate(query, params, {new: true});
            if (!updatedProject) throw new HttpException('Task not updated!', HttpStatus.INTERNAL_SERVER_ERROR);
            return updatedProject;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async addDefaultList(list): Promise<List>{
    //     let defaultList = new this.taskModel(list);
    //     try {
    //         let list = await defaultList.save();
    //         return list;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async deleteProjectLists(param): Promise<any>{
    //     let query = {listProject: param._id};
    //     try {
    //         let deletedProject = await this.taskModel.remove(query);
    //         if (!deletedProject) throw new HttpException('List not deleted!', HttpStatus.INTERNAL_SERVER_ERROR);
    //         return deletedProject;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

}