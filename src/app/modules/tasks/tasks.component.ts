import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { User } from '../../models/user.model';
import { Project } from '../../models/project.model';
import { List } from '../../models/list.model';
import { Task } from '../../models/task.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';
import { ListsService } from '../../shared/services/lists/lists.service';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        animate('.3s ease-out', keyframes([
          style({ opacity: '0', transform: 'translateY(0)', offset:0 }),
          style({ opacity: '0.5', transform: 'translateY(25px)', offset:0.3 }),
          style({ opacity: '1', transform: 'translateY(0)', offset:1 })
        ])),
      ),
      transition(":leave", 
      animate('.2s ease-out', keyframes([
        style({ opacity: '1', transform: 'translateX(25%)', offset:0 }),
        style({ opacity: '0.3', transform: 'translateX(50%)', offset:0.5 }),
        style({ opacity: '0', transform: 'translateX(70%)', offset:1 })
      ]))
      )
    ]),
  ]
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  addState: boolean = false;
  myOptions: INgxMyDpOptions;
  loader: boolean;
  status: string = 'new';
  projects: Project[] = [];
  lists: List[] = [];
  filteredLists: List[] = [];
  tasks: Task[] = [];
  users: User[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
    private toastService: ToastService,
    private usersService: UsersService,
    private listsService: ListsService,
    private projectsService: ProjectsService
  ) { }

  setClass(status){
    let classes = {};
    classes[status] = true;
    return classes;
  }

  ngOnInit() {
    // load resolved data
    this.activatedRoute.data.subscribe((result) => {
      this.projects = result.projects;
      this.lists = result.lists;
      this.users = result.users;
    });

    // datepicker options
    this.myOptions = {
      dateFormat: 'yyyy-mm-dd',
      sunHighlight: true,
      satHighlight: true
    };

    // load lazy tasks
    this.loader = true;
    this.tasksService.getAll(this.usersService.logged).subscribe(() => {
      /* tasks from service variable */
      this.tasks = this.tasksService.tasks;
    },
    (error) => {
      this.toastService.toastTrigger({
        message: error.error.message,
        options: {type: 'error'}
      });
    },
    () => {
      this.loader = false;
    });

    // init reactive form
    let date = new Date();
    this.taskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      taskDescription: new FormControl('',Validators.required),
      taskProject: new FormControl('',Validators.required),
      taskList: new FormControl('',Validators.required),
      taskScored: new FormControl(false),
      taskDraft: new FormControl(false),
      taskDifficulty: new FormControl(''),
      taskAssignedTo: new FormControl('',Validators.required),
      taskDeadline: new FormControl(null,Validators.required)
    });

    this.onProjectChanges();

  }

  onProjectChanges(): void{
    this.taskForm.get('taskProject').valueChanges.subscribe((value) => {
      if (value) {
        this.listsService.getAll({_id: value}).subscribe(
          (result) => {
            this.filteredLists = result;
          }, 
          (error) => {console.log(error.error.message)});
      }
        this.filteredLists = [];
    });
  }

  addTask(draft):void{
    this.taskForm.value.taskDraft = draft;
    this.tasksService.addTask(this.taskForm.value).subscribe(
      (result) => {
        this.toastService.toastTrigger({
          message: 'Task added! ',
          options: {type: 'success'}
        });
        this.taskForm.reset();
        this.addState = false;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

}
