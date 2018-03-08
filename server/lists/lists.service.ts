import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ListsSchema } from "./schema/lists.schema";
import { CreateListDto } from "./dto/create-list.dto";
import { List } from "./interfaces/lists.interface";
import * as _ from 'underscore';
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
export class ListsService {
    constructor(@InjectModel(ListsSchema) private readonly listModel: Model<List>){}

    async addProject(CreateListDto: CreateListDto): Promise<List>{
        let query = {listName: CreateListDto.listName};
        let checkList = await this.listModel.findOne(query);
        if (checkList) throw new HttpException('List already exists!', HttpStatus.BAD_REQUEST);
        let newList = new this.listModel(CreateListDto);
        try {
            let list = await newList.save();
            return list;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allLists(): Promise<List[]>{
        let lists = await this.listModel.find().sort({created: -1});
        return lists;
    }

    // async oneProject(params): Promise<Project>{
    //     let query = {_id: new ObjectId(params.id)};
    //     try {
    //         let oneProject = await this.listModel.findOne(query);
    //         if (!oneProject) throw new HttpException('Project not found!', HttpStatus.BAD_REQUEST);
    //         return oneProject;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async updateProject(params): Promise<Project>{
    //     let query = {
    //         _id: new ObjectId(params._id)
    //     };
    //     let set = _.compactObject(params);
    //     try {
    //         let updatedProject = await this.listModel.findOneAndUpdate(query, set, {new: true});
    //         if (!updatedProject) throw new HttpException('Project not updated!', HttpStatus.INTERNAL_SERVER_ERROR);
    //         return updatedProject;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async deleteProject(params): Promise<any>{
    //     let query = {_id: new ObjectId(params._id)};
    //     try {
    //         let deletedProject = await this.listModel.findOneAndRemove(query);
    //         if (!deletedProject) throw new HttpException('Project not deleted!', HttpStatus.INTERNAL_SERVER_ERROR);
    //         return deletedProject;
    //     } catch(e){
    //         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

}