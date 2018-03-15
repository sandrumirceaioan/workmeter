import { Injectable } from '@angular/core';
import { Task } from '../../../models/task.model';
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
export class TasksService {
  apiPath: string = '/api/projects';
  tasks: Task[] = [];
  task: Task;

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task>{
    return this.http.post(this.apiPath + '/add', task, httpOptions).map((result: Task) => {
      this.tasks.unshift(result);
      return result;
    })
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

  // getAll(): Observable<Task[]>{
  //   return this.http.post(this.apiPath + '/all', {}, httpOptions).map((result: Task[]) => {
  //                   this.tasks = result;
  //                   return result;
  //                   })
  //                   .catch((error:HttpErrorResponse) => {
  //                       return Observable.throw(error)
  //                     });
  // }

  // getOne(params): Observable<Task>{
  //   return this.http.post(this.apiPath + '/one', params, httpOptions).map((result: Task) => {
  //     this.task = result;
  //     return result;
  //   })
  //   .catch((error:HttpErrorResponse) => {
  //     return Observable.throw(error);
  //   });
  // }

  // updateOne(task: Task): Observable<Task>{
  //   return this.http.put(this.apiPath + '/update', task, httpOptions).map((result: Task) => {
  //     this.task = result;
  //     return result;
  //   }).catch((error: HttpErrorResponse) => {
  //     return Observable.throw(error);
  //   });
  // }

  // deleteOne(params): Observable<Task>{
  //   return this.http.post(this.apiPath + '/delete', params).map((result) => {
  //     return result;
  //   }).catch((error: HttpErrorResponse) => {
  //     return Observable.throw(error);
  //   });
  // }

}
