import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AppRoutingModule} from "./app-routing-module";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RankingComponent } from './ranking/ranking.component';
import { NavBComponent } from './nav-b/nav-b.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PracticeComponent } from './practice/practice.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {APP_BASE_HREF} from "@angular/common";
import {environment} from "../environments/environment";
import { LessonComponent } from './lesson/lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RankingComponent,
    NavBComponent,
    MainPageComponent,
    PracticeComponent,
    LessonComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, {
    provide: APP_BASE_HREF,
    useValue: environment.baseRef
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
