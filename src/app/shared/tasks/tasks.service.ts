import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
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

}
