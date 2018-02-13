import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as md5 from 'md5';

@Component()
export class UsersService {

    constructor(
        @InjectModel(UsersSchema) private readonly userModel: Model<User>
    ){}

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find({});
    }

    async loginUser(params): Promise<any> {
        let salt = '4m0$pr4l3*s0!p3n~d3';
        params.password = md5(params.password+salt);
        return this.userModel.findOne({userName: params.userName});
    }

}

// router.post('/login', function (req, res) {
//     let params = _.merge(req.body, req.query);
//     let salt = '4m0$pr4l3*s0!p3n~d3';
//     params.password = md5(params.password+salt);
  
//     users.findOne(params).then(function(user){
//       if (!user) throw {message:'User not found!'};
//       return user;
//     }).then(function(dbUser){
//       res.status(200).json(dbUser);
//     }).catch(function(error){
//       console.log(error);
//       res.status(401).json(error);
//     });
//   });