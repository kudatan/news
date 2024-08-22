import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleInterface} from "../../interfaces/article.interface";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-one-news-page',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
  ],
  templateUrl: './one-news-page.component.html',
  styleUrl: './one-news-page.component.scss'
})
export class OneNewsPageComponent implements OnInit{

  article?: ArticleInterface;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articlesService.getArticleById(+id).subscribe((article) => {
        this.article = article;
      });
    }
  }

}
