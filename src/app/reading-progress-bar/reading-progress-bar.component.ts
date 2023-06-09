import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-reading-progress-bar',
  templateUrl: './reading-progress-bar.component.html',
  styleUrls: ['./reading-progress-bar.component.css'],
})
export class ReadingProgressBarComponent {
  progress = 0;

  @HostListener('window:scroll')
  onScroll() {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / (fullHeight - windowHeight)) * 100;
    this.progress = Math.min(progress, 100);
  }
}
