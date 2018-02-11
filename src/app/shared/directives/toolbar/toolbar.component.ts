import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects/projects.service';
import { ToastService } from '../../services/toast/toast.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  projectForm: FormGroup;
  addState: boolean = false;
  @Output() added: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() searched: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private toastService: ToastService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectDescription: new FormControl('',Validators.required),
      projectOwner: new FormControl('',Validators.required),
      projectCategory: new FormControl('',Validators.required),
      projectTags: new FormControl('',Validators.required)
    });
  }

  onSearchChange(e){
    this.searched.emit(e);
  }

  addEntity(): void{
    this.projectsService.addProject(this.projectForm.value).subscribe(
      (result)=>{
        this.toastService.toastTrigger({
          message: 'Project added! ',
          options: {type: 'success'}
        });
        this.projectForm.reset();
        this.addState = false;
        this.added.emit(result);
      },
      (error)=>{
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
}

}
