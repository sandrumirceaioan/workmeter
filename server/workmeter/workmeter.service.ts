import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WorkmeterSchema } from "./schema/workmeter.schema";
import { Workmeter } from "./interfaces/workmeter.interface";
import * as _ from 'underscore';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CommentsService } from '../comments/comments.service';

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
export class WorkmeterService {
    constructor(
        @InjectModel(WorkmeterSchema) private readonly workmeterModel: Model<Workmeter>
    ){}

    async createSession(params): Promise<Workmeter>{
        let newSession = new this.workmeterModel(params);
        try {
            let session = await newSession.save();
            return session;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async hoursForOne(params): Promise<any>{
        let query = {_id: new ObjectId(params.taskid)};
        try {
            let oneSession = await this.workmeterModel.findOne(query);
            if (!oneSession) return {
                workmeterTask: params.taskid
            }
            return oneSession;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async todayHours(params): Promise<any>{
        let query = {
            createdBy: params.userId,
            created: {
                $gte: moment().startOf('day'), 
                $lte: moment().endOf('day')
            }
        };
        console.log(query);
        // try {
        //     let oneSession = await this.workmeterModel.findOne(query);
        //     if (!oneSession) return {
        //         workmeterTask: params.taskid
        //     }
        //     return oneSession;
        // } catch(e){
        //     throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        // }
        return;
    }

}