import { Component, Renderer2, ElementRef } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { filter } from 'rxjs/operators';

interface Project {
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'My Programmer Portfolio';
  contactEmail = 'your.email@example.com';
  isDarkMode = true;

  projects: Project[] = [
    {
      title: 'Project 1',
      description: 'This is a description of project 1.',
      link: 'https://www.example.com/project1',
    },
    {
      title: 'Project 2',
      description: 'This is a description of project 2.',
      link: 'https://www.example.com/project2',
    },
    {
      title: 'Project 3',
      description: 'This is a description of project 3.',
      link: 'https://www.example.com/project3',
    },
  ];
  

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        const preloader = this.el.nativeElement.querySelector('#preloader');
        if (preloader) {
          if (event instanceof NavigationStart) {
            this.renderer.removeClass(preloader, 'hidden');
          } else {
            this.renderer.addClass(preloader, 'hidden');
          }
        }
      });
  }
}
