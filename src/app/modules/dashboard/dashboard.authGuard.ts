import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../../shared/services/users/users.service';
import { ToastService } from '../../shared/services/toast/toast.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {
    constructor(private usersService: UsersService,
                private toastService: ToastService
            ) {}

canActivate(route: ActivatedRouteSnapshot) {
    let access = route.data["access"];
    if (this.usersService.logged.userType <= access) {
        return true;
    } else {
        this.toastService.toastTrigger({
            message: 'Not allowed to view this page!',
            options: {type: 'error'}
        });
        return false;
    }
}
}