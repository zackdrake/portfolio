import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  article1 =
    {
      image: 'assets/article-1.jpg',
    };
  article2 =
    {
      image: 'assets/article-2.jpg',
    }
  article3 =
    {
      image: 'assets/article-3.jpg',
    }
  article4 =
    {
      image: 'assets/article-4.jpg',
    }
  article5 =
    {
      image: 'assets/article-5.jpg',
    }
  article6 =
    {
      image: 'assets/article-6.jpg',
    }
  article7 =
    {
      image: 'assets/article-7.jpg',
    }
  article8 =
    {
      image: 'assets/article-8.jpg',
    }

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}


}
