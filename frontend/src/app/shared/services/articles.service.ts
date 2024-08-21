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
  getAllArticles(articles: ArticleInterface): Observable<ArticleInterface> {
    return this.http.post<ArticleInterface>(`${this.baseUrl}/api/auth/register`, articles);
  }
}
