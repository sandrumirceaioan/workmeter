import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';;
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'task-assign-form',
  templateUrl: './tasks-assign.component.html',
  styleUrls: ['./tasks-assign.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        animate('.3s ease-out', keyframes([
          style({ opacity: '0', transform: 'translateY(0)', offset: 0 }),
          style({ opacity: '0.5', transform: 'translateY(25px)', offset: 0.3 }),
          style({ opacity: '1', transform: 'translateY(0)', offset: 1 })
        ])),
      )
    ])
  ]
})
export class TasksAssignComponent implements OnInit {
  assignTaskForm: FormGroup;
  @Input() task: Task;
  @Input() users: User[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
    private toastService: ToastService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
        // init reactive form
        this.assignTaskForm = new FormGroup({
          assignTo: new FormControl(this.task.taskAssignedTo, Validators.required),
          assignStatus: new FormControl(null, Validators.required),
          assignComment: new FormControl('', Validators.required)
        });
  }

}
