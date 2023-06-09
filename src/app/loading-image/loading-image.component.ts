import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-image',
  templateUrl: './loading-image.component.html',
  styleUrls: ['./loading-image.component.css'],
})
export class LoadingImageComponent implements OnInit {
  @Input() src: string | undefined;
  @Input() alt: string | undefined;
  @Input() backgroundColor: string | undefined;
  isLoaded = false;

  constructor() {}

  ngOnInit(): void {}

  onImageLoad() {
    this.isLoaded = true;
  }
}
