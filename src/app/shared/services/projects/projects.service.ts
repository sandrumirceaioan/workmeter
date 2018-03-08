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
  apiPath: string = '/api/projects';
  projects: Project[] = [];
  project: Project;

  constructor(private http: HttpClient) { }

  addProject(project: Project): Observable<Project>{
    return this.http.post(this.apiPath + '/add', project, httpOptions).map((result: Project) => {
      this.projects.push(result);
      return result;
    })
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

  getAll(): Observable<Project[]>{
    return this.http.post(this.apiPath + '/all', {}, httpOptions).map((result: Project[]) => {
                    this.projects = result;
                    return result;
                    })
                    .catch((error:HttpErrorResponse) => {
                        return Observable.throw(error)
                      });
  }

  getOne(params): Observable<Project>{
    return this.http.post(this.apiPath + '/one', params, httpOptions).map((result: Project) => {
      this.project = result;
      return result;
    })
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  updateOne(project: Project): Observable<Project>{
    return this.http.put(this.apiPath + '/update', project, httpOptions).map((result: Project) => {
      this.project = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  deleteOne(params): Observable<Project>{
    return this.http.post(this.apiPath + '/delete', params).map((result) => {
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

}
