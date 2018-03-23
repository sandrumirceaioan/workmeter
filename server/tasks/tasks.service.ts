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
        if (task.taskDraft) task.taskStatus = 'Draft';
            task = _.compactObject(task);
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

    // async oneList(params): Promise<List>{
    //     let query = {_id: new ObjectId(params.id)};
    //     try {
    //         let oneProject = await this.taskModel.findOne(query);
    //         if (!oneProject) throw new HttpException('List not found!', HttpStatus.BAD_REQUEST);
    //         return oneProject;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async updateList(params): Promise<List>{
    //     let query = {
    //         _id: new ObjectId(params._id)
    //     };
    //     let set = _.compactObject(params);
    //     try {
    //         let updatedProject = await this.taskModel.findOneAndUpdate(query, set, {new: true});
    //         if (!updatedProject) throw new HttpException('List not updated!', HttpStatus.INTERNAL_SERVER_ERROR);
    //         return updatedProject;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

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