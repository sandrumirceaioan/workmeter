import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectForm: FormGroup;
  @Input() details: Project;
  tags: String[];
  constructor() { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectDescription: new FormControl('',Validators.required)
    });

    this.tags = this.details.projectTags ? this.details.projectTags.split(','): [];
  }

  onSubmit(){
    console.log(this.projectForm.value);
  }
}
