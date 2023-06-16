import { Component, Renderer2, ElementRef } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { filter, map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';


interface Project {
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My Programmer Portfolio';
  contactEmail = 'your.email@example.com';
  isDarkMode = false;

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
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private translate: TranslateService,
    private breakpointObserver: BreakpointObserver
  ) {
    translate.setDefaultLang('en');
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

  currentLanguage = 'en';

  switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
    this.translate.use(this.currentLanguage);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  isActive(route: string) {
    return this.router.url === route ? 'active-link' : '';
  }

  onMouseEnter(event: MouseEvent): void {
    (event.target as HTMLElement).style.transform = 'scale(1.2)';
    (event.target as HTMLElement).style.fontWeight = 'bold';
  }

  onMouseLeave(event: MouseEvent): void {
    (event.target as HTMLElement).style.transform = 'scale(1)';
    (event.target as HTMLElement).style.fontWeight = 'normal';
  }

  onClick(event: MouseEvent): void {
    (event.target as HTMLElement).style.animation = 'filled 0.5s';
  }
}
