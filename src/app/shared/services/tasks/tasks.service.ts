import { Injectable } from '@angular/core';
import { Task } from '../../../models/task.model';
import { User } from '../../../models/user.model';
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
  apiPath: string = '/api/tasks';
  tasks: Task[] = [];
  task: Task;

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task>{
    return this.http.post(this.apiPath + '/add', task, httpOptions).map((result: Task) => {
      return result;
    })
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

  getAll(user: User): Observable<Task[]>{
    return this.http.post(this.apiPath + '/all', user, httpOptions).map((result: Task[]) => {
                    this.tasks = result;
                    return;
                    })
                    .catch((error:HttpErrorResponse) => {
                      return Observable.throw(error)
                    });
  }

  getOne(params): Observable<Task>{
    return this.http.post(this.apiPath + '/one', params, httpOptions).map((result: Task) => {
      this.task = result;
      return result;
    })
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  updateOneStatus(task: Task, status: string): Observable<Task>{
    let params = {
      task,
      status
    };
    return this.http.put(this.apiPath + '/updateStatus', params, httpOptions).map((result: Task) => {
      this.task = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  // update task status in tasks list
  updateStatusView(task: Task): void{
      let length = this.tasks.length;
      for (let i=0; i < length; i++) {
        if (task._id == this.tasks[i]._id) {
          this.tasks[i].taskStatus = task.taskStatus;
        }
      }
  }

  // deleteOne(params): Observable<Task>{
  //   return this.http.post(this.apiPath + '/delete', params).map((result) => {
  //     return result;
  //   }).catch((error: HttpErrorResponse) => {
  //     return Observable.throw(error);
  //   });
  // }

}
