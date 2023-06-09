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
      url: 'https://static.billboard.com/files/2021/03/Taylor-Swift-grammys-2021-billboard-1548-1616425628-compressed.jpg',
      firstLoad: true,
    },
    {
      url: 'https://www.rollingstone.com/wp-content/uploads/2019/12/TaylorSwiftTimIngham.jpg',
      firstLoad: true,
    },
    {
      url: 'https://static01.nyt.com/images/2023/03/30/multimedia/30popcast-hctw/30popcast-hctw-videoSixteenByNine3000.jpg',
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
