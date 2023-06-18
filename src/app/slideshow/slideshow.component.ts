import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ left: '-100%', opacity: 0 }),
        animate('1s ease-out', style({ left: '0%', opacity: 1 })),
      ]),
      transition(':decrement', [
        style({ left: '100%', opacity: 0 }),
        animate('1s ease-out', style({ left: '0%', opacity: 1 })),
      ]),
    ]),
  ],
})
export class SlideshowComponent implements OnInit {
  isHovering = false;
  firstImageDisplayed = false;
  images = [
    {
      url: 'https://media.discordapp.net/attachments/827319877152538627/1119671921345318932/Untitled-3.png',
      firstLoad: true,
    },
    {
      url: 'https://media.discordapp.net/attachments/827319877152538627/1119673281985904670/Untitled-2.png',
      firstLoad: true,
    },
    {
      url: 'https://media.discordapp.net/attachments/827319877152538627/1119671920577761320/Untitled-1.png',
      firstLoad: true,
    },
  ];
  currentImageIndex = 0;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      if (!this.isHovering) {
        this.nextImage();
      }
    }, 3000);
  }

  previousImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex + this.images.length - 1) % this.images.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    if (this.currentImageIndex === 1) {
      this.firstImageDisplayed = true;
    }
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }
}
