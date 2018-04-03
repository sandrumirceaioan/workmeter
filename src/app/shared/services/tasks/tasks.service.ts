import { Injectable } from '@angular/core';
import { Task } from '../../../models/task.model';
import { User } from '../../../models/user.model';
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
export class TasksService {
  apiPath: string = '/api/tasks';
  tasks: Task[] = [];
  task: Task;
  newTasksSubscription;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private socket: Socket
  ) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post(this.apiPath + '/add', task, httpOptions).map((result: Task) => {
      return result;
    }).catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      });
  }

  startGetTasks(): void{
    // start receive new tasks subscription
    this.newTasksSubscription = this.socket.fromEvent("tasks").map((result: Task) => {
      return result;
    }).subscribe((result) => {
      if (result.taskAssignedTo == this.usersService.logged._id) this.tasks.unshift(result);
    });
  }

  stopGetTasks(): void {
    this.newTasksSubscription.unsubscribe();
  }

  getAll(user: User): Observable<Task[]> {
    return this.http.post(this.apiPath + '/all', user, httpOptions).map((result: Task[]) => {
      this.tasks = result;
      return;
    }).catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      });
  }

  getOne(params): Observable<Task> {
    return this.http.post(this.apiPath + '/one', params, httpOptions).map((result: Task) => {
      this.task = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
        return Observable.throw(error);
      });
  }

  updateStartedPaused(task: Task): Observable<Task> {
    return this.http.put(this.apiPath + '/updateStatus', task, httpOptions).map((result: Task) => {
      this.task = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  // update task status in tasks list
  updateListView(task: Task): void {
    let length = this.tasks.length;
    for (let i = 0; i < length; i++) {
      if (this.tasks[i].taskStatus != 'new') {
        this.tasks[i].taskStarted = false;
        this.tasks[i].taskStatus = 'paused';
      }
      if (task._id == this.tasks[i]._id) {
        this.tasks[i] = task;
      }
    }
  }

  updateInfo(task: Task): Observable<Task>{
    return this.http.put(this.apiPath + '/updateInfo', task, httpOptions).map((result: Task) => {
      this.task = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    })
  }

  // deleteOne(params): Observable<Task>{
  //   return this.http.post(this.apiPath + '/delete', params).map((result) => {
  //     return result;
  //   }).catch((error: HttpErrorResponse) => {
  //     return Observable.throw(error);
  //   });
  // }

}
