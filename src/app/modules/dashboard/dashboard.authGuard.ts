import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsersService } from '../../shared/services/users/users.service';
import { ToastService } from '../../shared/services/toast/toast.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {
    allow: boolean = true;
    constructor(private usersService: UsersService, private toastService: ToastService) {}

canActivate() {
    //return this.usersService.isLoggedIn();
    if (this.allow) {
        this.toastService.toastTrigger({
            message: 'Allowed!',
            options: {type: 'success'}
        });
        return true;
    } else {
        this.toastService.toastTrigger({
            message: 'Rejected!',
            options: {type: 'error'}
        });
        return false;
    }
}
}