import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

/*
 * components
 */
import { AppComponent } from './component/app/app.component';
import { MyBlogComponent } from './component/my-blog/my-blog.component';
import { AboutMeComponent } from './component/about-me/about-me.component';
import { HomeComponent } from './component/home/home.component';
import { ArticleComponent } from './component/article/article.component';
import { ArticleDetailComponent } from './component/article/article-detail/article-detail.component';
import { ArticleCommentComponent } from './component/article/article-comment/article-comment.component';
import { ArticlesListComponent } from './component/home/articles-list/articles-list.component';
import { UsersListComponent } from './component/home/users-list/users-list.component';
import { PageSliceComponent } from './component/page-slice/page-slice.component';
import { ArticleCommentCreateComponent } from './component/article/article-comment-create/article-comment-create.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AlertPopComponent } from './component/alert-pop/alert-pop.component';

/*
 * routes
 */
import { routes } from './app.route.config';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


/*
 * service
 */
import { UtilsServicesInjectable } from './service/utils.service';
import { NavLoginServicesInjectable } from './service/nav-login-communicate.service';
import { AlertPopServiceInjectable } from './service/alert-pop.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyBlogComponent,
    AboutMeComponent,
    ArticleComponent,
    ArticleDetailComponent,
    ArticleCommentComponent,
    PageSliceComponent,
    ArticleCommentCreateComponent,
    LoginComponent,
    RegisterComponent,
    AlertPopComponent,
    ArticlesListComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    UtilsServicesInjectable,
    NavLoginServicesInjectable,
    AlertPopServiceInjectable
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
