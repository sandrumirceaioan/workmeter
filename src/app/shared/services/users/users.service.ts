import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { User } from '../../../models/user.model';
import 'rxjs/add/observable/throw';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UsersService {
  apiPath: string = '/api/user';
  logged: User;

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post(this.apiPath + '/register', user, httpOptions)
                    .catch((error:HttpErrorResponse) => {
                      return Observable.throw(error)
                    });
  }

  loginUser(params){
    return this.http.post(this.apiPath + '/login', params, httpOptions).map((result: User) => {
                    localStorage.setItem('wmtoken', result.token);
                    this.logged = result;

                    return result;
                    })
                   .catch((error:HttpErrorResponse) => {
                      return Observable.throw(error)
                    });
  }

checkLogged(){
  if (!!this.logged) {
    return Observable.of(this.logged);
  }
  let params = {token: localStorage.getItem('wmtoken')};
  return this.http.post(this.apiPath + '/checkLogged', params, httpOptions).map((result: User) => {
                  this.logged = result;
                  return result;
                  })
                  .catch((error:HttpErrorResponse) => {
                      return Observable.throw(error)
                    });
}
}
