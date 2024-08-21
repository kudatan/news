import { Routes } from '@angular/router';
import {MainPageComponent} from "./shared/pages/main-page/main-page.component";

export const routes: Routes = [
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', component: MainPageComponent}
];
