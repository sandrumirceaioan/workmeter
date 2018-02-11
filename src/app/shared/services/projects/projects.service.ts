import { Injectable } from '@angular/core';
import { Project } from '../../../models/project.model';
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
export class ProjectsService {
  apiPath: string = '/api/project';

  constructor(private http: HttpClient) { }

  addProject(project: Project): Observable<Project>{
    return this.http.post(this.apiPath + '/add', project, httpOptions)
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

  getAll(){
    return this.http.post(this.apiPath + '/getAll', {}, httpOptions).map((result: Project[]) => {
                    return result;
                    })
                    .catch((error:HttpErrorResponse) => {
                        return Observable.throw(error)
                      });
  }

}