import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Comment } from '../../models/comment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../../shared/services/comments/comments.service';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  commentForm: FormGroup;
  addState: boolean = false;
  loader: boolean;
  taskId: Task;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private commentsService: CommentsService,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    // get comments for current task
    this.activatedRoute.params.subscribe(
      (result) => {
        this.taskId = result.id;
      }
    );
    this.loader = true;
    this.commentsService.getAll({_id: this.taskId._id}).subscribe((result) => {
        this.comments = result;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error ? error.error.message : error,
          options: {type: 'error'}
        });
      },
      () => {
        this.loader = false;
      }
    );
    this.commentForm = new FormGroup({
      commentDescription: new FormControl('',Validators.required),
      commentTask: new FormControl(this.taskId,Validators.required),
      commentParent: new FormControl(null)
    });
  }

  addComment(): void{
    console.log(this.commentForm.value);
    this.commentsService.addComment(this.commentForm.value).subscribe(
      (result) => {
        this.comments = this.commentsService.comments;
        this.commentForm.reset();
        this.addState = false;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    )
  }

}
