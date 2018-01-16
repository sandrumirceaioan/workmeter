import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {
  apiPath: string = '/api/user';
  logged: User;

  constructor(private http: Http) { }

  addUser(user: User): Observable<User> {
    let httpOptions = {
      headers: new Headers({'Content-Type': 'application/json'})
    };
    return this.http.post(this.apiPath + '/register', user, httpOptions)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error));
    }
}
