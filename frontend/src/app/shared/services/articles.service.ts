import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArticleInterface} from "../interfaces/article.interface";
import {Observable} from "rxjs";
import {CategoryInterface} from "../interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {
  }
  getArticles(page: number, limit: number, categoryId?: number): Observable<{ data: ArticleInterface[], total: number }> {
    let url = `${this.baseUrl}/api/articles?page=${page}&limit=${limit}`;
    if (categoryId !== undefined) {
      url += `&categoryId=${categoryId}`;
    }
    return this.http.get<{ data: ArticleInterface[], total: number }>(url);
  }

  getArticleById(id: number): Observable<ArticleInterface> {
    return this.http.get<ArticleInterface>(`${this.baseUrl}/api/articles/${id}`);
  }

  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.baseUrl}/api/categories`);
  }
}
