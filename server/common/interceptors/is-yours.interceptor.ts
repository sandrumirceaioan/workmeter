import { Interceptor, NestInterceptor, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import * as jwt_decode from "jwt-decode";
import { TasksService } from '../../tasks/tasks.service';

@Interceptor()
export class IsYours implements NestInterceptor {
  constructor(private tasksService: TasksService){}

  intercept(req, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    let token = req.headers['x-access-token'];
    let decoded = jwt_decode(token);
    if (decoded.id != req.body.task.taskAssignedTo) 
    throw new HttpException('Task not yours!', HttpStatus.FORBIDDEN);
    return stream$;
  }
}