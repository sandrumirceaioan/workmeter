import { Controller, Get, Post, Body, HttpCode, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
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

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.usersService.registerUser(createUserDto);
    }
}

// router.post('/register', function (req, res) {
//     let params = _.merge(req.body, req.query);
//     let orArray = [];
  
//     orArray.push({userName: {$regex: new RegExp("^" + params.userName + "$", "i")}});
//     orArray.push({emailAddress: {$regex: new RegExp("^" + params.emailAddress + "$", "i")}});
  
//     let filter = {
//       $or: orArray
//     };
  
//     users.findOne(filter).then(function(user){
//       if (user) throw {message:'User already registered!'};
//       return;
//     }).then(function(){
//       let JWT = {
//         KEY: 's0!p3n~d34m0$pr4l3*',
//         ALGORITHMS: 'HS512'
//       }
//       return jwt.sign({
//         u: params.userName,
//         i: params.invitationCode || '77777'
//       }, JWT.KEY, {
//         algorithm: JWT.ALGORITHMS,
//         noTimestamp: true
//       });
//     }).then(function(token){
//       let salt = '4m0$pr4l3*s0!p3n~d3';
//       params['userType'] = "user";
//       params.token = token;
//       params.password = md5(params.password + salt);
//       let user = new users(params);
//       return user.save();
//     }).then(function(registered){
//       res.status(200).json(registered);
//     }).catch(function(error){
//       res.status(500).json(error);
//     });
//   });