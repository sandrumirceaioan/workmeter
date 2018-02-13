import { Component } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Component()
export class UsersService {
    // private readonly users: User[] = [];
    private readonly users: any = [1,2,3];

    getAllUsers(): User[] {
        return this.users;
    }

}