import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills = [
    { name: 'HTML', level: 100 },
    { name: 'CSS', level: 100 },

    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 90 },

    { name: 'Angular', level: 90 },
    { name: 'VueJS', level: 90 },
    { name: 'React', level: 90 },
    { name: 'Svelte', level: 90 },
    { name: 'Vite', level: 90 },

    { name: 'MySQL', level: 80 },
    { name: 'MongoDB', level: 70 },
    { name: 'PosgreSQL', level: 80 },

    { name: 'PHP', level: 100 },
    { name: 'C#', level: 100 },
    { name: 'Go', level: 100 },
    { name: 'Python', level: 100 },


    { name: 'GCP', level: 100 },
    { name: 'PowerBI', level: 100 },
    { name: 'Tableau', level: 100 },

    { name: 'AWS', level: 80 },
    { name: 'Docker', level: 80 },
    { name: 'Kubernetes', level: 70 },

    { name: 'Git', level: 100 },

    { name: 'Jira', level: 100 },


    // Add more skills here
  ];

  constructor() {}

  ngOnInit(): void {}
}
