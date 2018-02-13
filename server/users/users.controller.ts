import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get('/get')
    async getAll(){
        return this.usersService.getAllUsers();
    }

    @Post('/login')
    async login(@Body() credentials){
        return this.usersService.loginUser(credentials);
    }

    @Post('/add')
    async add(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto);
        throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
    }
}