import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as jwt_decode from "jwt-decode";

@Interceptor()
export class Sign implements NestInterceptor {
  intercept(req, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    let token = req.headers['x-access-token'];
    let decoded = jwt_decode(token);
    req.body.createdBy = decoded.id;
    return stream$;
  }
}