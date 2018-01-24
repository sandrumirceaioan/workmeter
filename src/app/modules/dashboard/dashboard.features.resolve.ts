import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UsersService } from '../../shared/services/users/users.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { FeaturesService } from '../../shared/services/features/features.service';

@Injectable()
export class FeaturesResolve implements Resolve<any> {
  checkFeatureAccess: number;
  constructor(
    private usersService: UsersService,
    private featuresService: FeaturesService,
    private toastService: ToastService,
    private router: Router
  ) {}
  
  resolve(route: ActivatedRouteSnapshot) {
    console.log('userService logged: ', this.usersService.logged);
    return this.featuresService.getFeatures({userType: this.usersService.logged.userType}).catch(
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
        this.router.navigate(['login']);
        return Observable.of(null);
      });
  }
}