import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user.model';
import 'rxjs/add/observable/throw';
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
                    .map((res) => {
                      console.log('service: ', res);
                      return res;
                    })
                    .catch((error:HttpErrorResponse) => Observable.throw(error));
    }
}
