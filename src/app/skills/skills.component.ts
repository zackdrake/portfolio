import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SkillsComponent implements OnInit {
  skills = [
    { name: 'HTML', level: 100 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    // Add more skills here
  ];

  constructor() {}

  ngOnInit(): void {}
}
