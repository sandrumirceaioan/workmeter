import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  addButton: boolean = false;
  projects: Project[] = [
    {
      projectName: 'Alexandria',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      projectCategory: 'other',
      projectTags: 'search engine',
      projectOwner: 'Rey',
      projectCreated: '01-01-2016'
    },
    {
      projectName: 'DanSmoke',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      projectCategory: 'ecommerce',
      projectTags: 'ecommerce, shop',
      projectOwner: 'Robin',
      projectCreated: '01-01-2010'
    },
    {
      projectName: 'Javandi',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      projectCategory: 'tracking',
      projectTags: 'affiliation, tracking',
      projectOwner: 'Chris',
      projectCreated: '24-06-2016'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  addProject(){
    this.addButton = !this.addButton;
    if (this.projects[this.projects.length-1].newProject && !this.addButton) {
      this.projects.pop();
      return false;
    }
    this.projects.push({
      newProject: true,
      projectName: '',
      projectDescription: '',
      projectCreated: ''
    });
  }

}
