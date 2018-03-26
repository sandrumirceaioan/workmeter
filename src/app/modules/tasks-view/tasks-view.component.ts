import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ListsService } from '../../shared/services/lists/lists.service';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {
  task: Task;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private listsService: ListsService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.activatedRoute.data
    .map((result) => {return result.task})
    .subscribe((result) => {
      this.task = result; 
    });
  }

}
