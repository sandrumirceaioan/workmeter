import { Injectable } from '@angular/core';
import { Workmeter } from '../../../models/workmeter.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UsersService } from '../users/users.service';
import { Socket } from 'ng-socket-io';
import { Subject } from 'rxjs/Subject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorkmeterService {
  apiPath: string = '/api/hours';
  worked: number;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private socket: Socket
  ) { }

  getOne(params): Observable<Workmeter> {
    return this.http.post(this.apiPath + '/one', params, httpOptions).map((result: Workmeter) => {
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  totalTime(params): Observable<any>{
    return this.http.post(this.apiPath + '/hours', params, httpOptions).map((result: any) => {
      this.worked = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

}
