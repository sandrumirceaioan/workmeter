import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ListsService } from '../../shared/services/lists/lists.service';
import { UsersService } from '../../shared/services/users/users.service';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ToastService } from '../../shared/services/toast/toast.service';

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
    private usersService: UsersService,
    private tasksService: TasksService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.activatedRoute.data
    .map((result) => {return result.task})
    .subscribe((result) => {
      this.task = result;
      this.translateIds();
    });
  }

  updateTask(param): void{
    this.task.taskStatus = param;
    this.tasksService.updateStatus(this.task);
    this.tasksService.updateOne(this.task).subscribe(
      (result) => {
        this.task = result;
        this.translateIds();
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

  translateIds(): void{
    this.task.taskProjectName = this.projectsService.mappedResults[this.task.taskProject].projectName;
    this.task.taskListName = this.listsService.mappedResults[this.task.taskList].listName;
    this.task.createdByName = this.usersService.mappedResults[this.task.createdBy].userName;
    this.task.taskModifiedByName = this.usersService.mappedResults[this.task.taskModifiedBy].userName;
  }

}
