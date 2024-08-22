import { Routes } from '@angular/router';
import {MainPageComponent} from "./shared/pages/main-page/main-page.component";
import {OneNewsPageComponent} from "./shared/pages/one-news-page/one-news-page.component";

export const routes: Routes = [
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', component: MainPageComponent},
  { path: 'articles/:id', component: OneNewsPageComponent }
];
