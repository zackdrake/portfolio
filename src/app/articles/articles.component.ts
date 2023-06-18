import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  article1 =
    {
      title: 'Article 1',
      image: 'assets/article-1.jpg',
      summary: 'Summary of Article 1',
      link: 'https://example.com/article-1',
    };

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  searchArticles(term: string) {
    this.searchTerm = term.toLowerCase();
  }
}
