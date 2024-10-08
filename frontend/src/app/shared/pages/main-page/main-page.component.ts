import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {takeUntil} from "rxjs";
import {DestroySubscription} from "../../helpers/destroy-subscription";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {ArticleInterface} from "../../interfaces/article.interface";
import {DatePipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {CategoryInterface} from "../../interfaces/category.interface";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent extends DestroySubscription implements OnInit {
  articles: ArticleInterface[] = [];
  categories: CategoryInterface[] = [];
  currentPage: number = 1;
  totalArticles: number = 0;
  articlesPerPage: number = 10;
  selectedCategoryId?: number;

  constructor(private articlesService: ArticlesService, private router: Router) {
    super()
  }
  ngOnInit() {
    this.loadArticles();
    this.loadCategories();
  }

  loadArticles() {
    this.articlesService.getArticles(this.currentPage, this.articlesPerPage, this.selectedCategoryId)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(response => {
        this.articles = response.data;
        this.totalArticles = response.total;
        this.scrollToTop();
      });
  }

  loadCategories() {
    this.articlesService.getCategories()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = selectElement.value;
    this.selectedCategoryId = categoryId && categoryId !== "undefined" ? +categoryId : undefined;
    this.currentPage = 1;
    this.loadArticles();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadArticles();
  }

  get totalPages(): number {
    return Math.ceil(this.totalArticles / this.articlesPerPage);
  }

  goToArticleDetail(id: number) {
    this.router.navigate(['/articles', id]);
  }
}
