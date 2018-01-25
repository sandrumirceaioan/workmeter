import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../../shared/services/users/users.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {
    constructor(private usersService: UsersService,
                private toastService: ToastService,
                private router: Router
            ) {}

            canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
                let {access} = next.data;
                
                return this.usersService.checkLogged().map(e => {
                    let result = !!(access.indexOf(e.userType) > -1);
                    if (!result) {
                        this.router.navigate(['/login']);
                    }
                    return result;
                }).catch(() => {
                    this.router.navigate(['/login']);
                    return Observable.of(false);
                });
            }  
}