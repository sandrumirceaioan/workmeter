import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';
import { User } from '../../models/user.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';
import { ListsService } from '../../shared/services/lists/lists.service';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'task-update-form',
  templateUrl: './tasks-update.component.html',
  styleUrls: ['./tasks-update.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        animate('.3s ease-out', keyframes([
          style({ opacity: '0', transform: 'translateY(0)', offset: 0 }),
          style({ opacity: '0.5', transform: 'translateY(25px)', offset: 0.3 }),
          style({ opacity: '1', transform: 'translateY(0)', offset: 1 })
        ])),
      ),
      transition(":leave",
        animate('.2s ease-out', keyframes([
          style({ opacity: '1', transform: 'translateX(25%)', offset: 0 }),
          style({ opacity: '0.3', transform: 'translateX(50%)', offset: 0.5 }),
          style({ opacity: '0', transform: 'translateX(70%)', offset: 1 })
        ]))
      )
    ]),
  ]
})
export class TasksUpdateComponent implements OnInit {
  updateTaskForm: FormGroup;
  addState: boolean = false;
  myOptions: INgxMyDpOptions;
  loader: boolean;
  users: User[] = [];
  @Input() task: Task;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
    private toastService: ToastService,
    private usersService: UsersService,
    private listsService: ListsService
  ) { }

  ngOnInit() {
    let date = new Date(this.task.taskDeadline);
    let initDeadline = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      },
      formatted: moment(date).format("YYYY-MM-DD"),
      jsdate: date
    };

    // datepicker options
    this.myOptions = {
      dateFormat: 'yyyy-mm-dd',
      sunHighlight: true,
      satHighlight: true
    };

    // init reactive form
    this.updateTaskForm = new FormGroup({
      taskName: new FormControl(this.task.taskName, Validators.required),
      taskDescription: new FormControl(this.task.taskDescription, Validators.required),
      taskScored: new FormControl(this.task.taskScored),
      taskDifficulty: new FormControl(this.task.taskDifficulty),
      taskAssignedTo: new FormControl(this.task.taskAssignedTo, Validators.required),
      taskDeadline: new FormControl(initDeadline, Validators.required)
    });

  }

  updateTask(): void{
    console.log(this.updateTaskForm.value.taskDeadline);
  }

}
