import { Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { MyBlogComponent } from './component/my-blog/my-blog.component';
import { AboutMeComponent } from './component/about-me/about-me.component';
import { ArticleComponent } from './component/article/article.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'my-blog', component: MyBlogComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
]
