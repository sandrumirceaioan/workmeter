import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model'; 

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      projectName: 'Alexandria',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      projectCategory: 'other',
      projectTags: 'search engine, platform',
      projectOwner: 'Rey',
      projectCreated: '01-01-2016'
    },
    {
      projectName: 'DanSmoke',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      projectCategory: 'ecommerce',
      projectTags: 'search engine, platform',
      projectOwner: 'Robin',
      projectCreated: '01-01-2010'
    },
    {
      projectName: 'Javandi',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      projectCategory: 'tracking',
      projectTags: 'affiliate marketing, tracking, platform',
      projectOwner: 'Chris',
      projectCreated: '24-06-2016'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
