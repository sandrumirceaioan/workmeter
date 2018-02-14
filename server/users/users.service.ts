import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { MessageCodeError } from '../common/errors/error.module';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import * as md5 from 'md5';
import * as jwt from "jwt-then";
import { HttpException } from '@nestjs/core/exceptions/http-exception';

@Component()
export class UsersService {

    constructor(
        @InjectModel(UsersSchema) private readonly userModel: Model<User>
    ){}

    async registerUser(createUserDto: CreateUserDto): Promise<User> {
    let orArray = [];
    orArray.push({userName: {$regex: new RegExp("^" + createUserDto.userName + "$", "i")}});
    orArray.push({emailAddress: {$regex: new RegExp("^" + createUserDto.emailAddress + "$")}});
    let filter = {$or: orArray};

        const user = await this.userModel.findOne(filter);
        if (user) throw new HttpException('dsfdsfsdf', 400);

    return;
    // return this.userModel.findOne(filter).then(user => {
    //     if (user) throw {message:'User already registered!'};
    //     return;
    //     }).then(() => {
    //         let JWT = {
    //             KEY: 's0!p3n~d34m0$pr4l3*',
    //             ALGORITHMS: 'HS512'
    //         }
    //         return jwt.sign({
    //             u: params.userName,
    //             i: params.invitationCode || '77777'
    //         }, JWT.KEY, {
    //             algorithm: JWT.ALGORITHMS,
    //             noTimestamp: true
    //         });
    //     }).then(token => {
    //         let salt = '4m0$pr4l3*s0!p3n~d3';
    //         params['userType'] = "user";
    //         params.token = token;
    //         params.password = md5(params.password + salt);
    //         return this.userModel.create(params);
    //     });
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find({}).exec();
    }

    async loginUser(params): Promise<User> {
        let salt = '4m0$pr4l3*s0!p3n~d3';
        params.password = md5(params.password+salt);
        return this.userModel.findOne(params).exec();
    }

}