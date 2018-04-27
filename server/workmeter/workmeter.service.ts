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
        let toSave = {
            workmeterTask: params._id,
            workmeterTaskStarted: true,
            workmeterCreatedBy: params.taskAssignedTo
        };
        let newSession = new this.workmeterModel(toSave);
        try {
            let session = await newSession.save();
            return session;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async closeSession(params): Promise<Workmeter>{
        let check = {
            workmeterTaskStarted: true,
            workmeterCreatedBy: params.taskAssignedTo
        };

        let getSession = await this.workmeterModel.findOne(check);
        if (!getSession) throw new HttpException('Can`t find task session!', HttpStatus.BAD_REQUEST); 

        let now = moment.utc();
        let start = moment(getSession.workmeterCreated).utc();
        let duration = moment.duration(now.diff(start));

        let set = {
            workmeterTaskStarted: false,
            workmeterStoped: now,
            workmeterDuration: duration.asSeconds()
        };
        try {
           let stopSession = await this.workmeterModel.update(check, set, {new: true});
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
        return;
    }

    // toHHMMSS = function (sec) {
    //     let hours: any = Math.floor(sec / 3600);
    //     let minutes: any = Math.floor((sec - (hours * 3600)) / 60);
    //     let seconds: any = sec - (hours * 3600) - (minutes * 60);
    
    //     if (hours   < 10) hours   = '0' + hours;
    //     if (minutes < 10) minutes = '0' + minutes;
    //     if (seconds < 10) seconds = '0' + seconds;
    //     return hours + ':' + minutes + ':'+seconds;
    // }

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
        //console.log(query);
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