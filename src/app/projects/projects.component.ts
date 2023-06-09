import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      title: 'Project 1',
      image: 'assets/project-1.jpg',
      description: 'Description of Project 1',
      problem: 'Problem statement for Project 1',
      tools: 'Tools and technologies used in Project 1',
      results: 'Results achieved in Project 1',
      link: 'https://example.com/project-1',
    },
    {
      title: 'Project 2',
      image: 'assets/project-2.jpg',
      description: 'Description of Project 2',
      problem: 'Problem statement for Project 2',
      tools: 'Tools and technologies used in Project 2',
      results: 'Results achieved in Project 2',
      link: 'https://example.com/project-2',
    },
    // Add more projects here
  ];

  constructor() {}

  ngOnInit(): void {}
}
