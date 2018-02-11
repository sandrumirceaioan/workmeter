import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { ListFilterPipe } from '../../shared/filters/search-filter.pipe';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  addState: boolean = false;
  searchTerm: string;
  projects: Project[] = [];
  
  constructor(
    private projectsService: ProjectsService, 
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data
    .map((result) => {return result.projects})
    .subscribe((result) => {
      this.projects = result;
    });
  }

  pushProject(object){
    this.projects.unshift(object);
  }

  searchList(str){
    this.searchTerm = str;
  }

}
