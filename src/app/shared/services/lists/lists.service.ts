import { Injectable } from '@angular/core';
import { List } from '../../../models/list.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable()
export class ListsService {
  apiPath: string = '/api/projects';

  constructor(private http: HttpClient) { }

  addList(list: List): Observable<List>{
    return this.http.post(this.apiPath + '/add', list, httpOptions)
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

}
