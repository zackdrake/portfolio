import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  testimonials = [
    {
      name: 'John Doe',
      message: 'This is a great service! I highly recommend it.',
    },
    {
      name: 'Jane Smith',
      message: 'Absolutely fantastic. 10/10.',
    },
    // add more testimonials as needed...
  ];

  constructor() {}

  ngOnInit(): void {}
}
