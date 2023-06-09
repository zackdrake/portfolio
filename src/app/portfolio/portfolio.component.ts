import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  projects = [
    // ... your project data ...
  ];

  categories = ['All', 'Web', 'Mobile', 'Desktop'];
  selectedCategory = 'All';

  constructor() {}

  ngOnInit(): void {}

  filterProjects(category: string) {
    this.selectedCategory = category;
  }
}
