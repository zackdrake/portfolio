import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles = [
    {
      title: 'Article 1',
      image: 'assets/article-1.jpg',
      summary: 'Summary of Article 1',
      link: 'https://example.com/article-1',
    },
    {
      title: 'Article 2',
      image: 'assets/article-2.jpg',
      summary: 'Summary of Article 2',
      link: 'https://example.com/article-2',
    },
    // Add more articles here
  ];

  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  searchArticles(term: string) {
    this.searchTerm = term.toLowerCase();
  }
}
