import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import * as md5 from 'md5';
import * as jwt from "jwt-then";

@Component()
export class UsersService {

    constructor(
        @InjectModel(UsersSchema) private readonly userModel: Model<User>
    ){}

    /* register user */
    async registerUser(createUserDto: CreateUserDto): Promise<User> {

        let orArray = [];
        orArray.push({userName: {$regex: new RegExp("^" + createUserDto.userName + "$", "i")}});
        orArray.push({emailAddress: {$regex: new RegExp("^" + createUserDto.emailAddress + "$")}});
        let filter = {$or: orArray};

        const JWT = {KEY: 's0!p3n~d34m0$pr4l3*',ALGORITHMS: 'HS512'};
        const salt = '4m0$pr4l3*s0!p3n~d3';
            
        const userCheck = await this.userModel.findOne(filter);
        if (userCheck) throw new HttpException('User already registered!', 400);
        const token = await jwt.sign({
            u: createUserDto.userName,
            i: createUserDto.invitationCode || '77777'
        }, JWT.KEY, {
            algorithm: JWT.ALGORITHMS,
            noTimestamp: true
        });
        if (!token) throw new HttpException('Token could not be created!', HttpStatus.INTERNAL_SERVER_ERROR);
        createUserDto['userType'] = 'user';
        createUserDto['password'] = md5(createUserDto.password + salt);
        createUserDto['token'] = token;
        const newUser = new this.userModel(createUserDto);
        try {
            const user = await newUser.save();
            return user;
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* login user */
    async loginUser(params): Promise<User> {
        if (!params.userName || !params.password) throw new HttpException('Username and password required!', HttpStatus.BAD_REQUEST);
        let salt = '4m0$pr4l3*s0!p3n~d3';
        params.password = md5(params.password+salt);
        const loggedUser = await this.userModel.findOne(params);
        if (!loggedUser) throw new HttpException('User not found!', HttpStatus.UNAUTHORIZED);
        return loggedUser;
    }

    /* check logged */
    async checkLogged(params): Promise<User> {
        let filter = {token: params.token};
        const logged = await this.userModel.findOne(filter);
        if (!logged) throw new HttpException('Please log in to continue!', HttpStatus.UNAUTHORIZED);
        return logged;
    }

}