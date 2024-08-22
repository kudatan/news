import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArticleInterface} from "../interfaces/article.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {
  }
  getArticles(page: number, limit: number): Observable<{ data: ArticleInterface[], total: number }> {
    return this.http.get<{ data: ArticleInterface[], total: number }>(
      `${this.baseUrl}/api/articles?page=${page}&limit=${limit}`
    );
  }

  getArticleById(id: number): Observable<ArticleInterface> {
    return this.http.get<ArticleInterface>(`${this.baseUrl}/api/articles/${id}`);
  }
}
