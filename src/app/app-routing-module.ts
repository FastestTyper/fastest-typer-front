import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NgModule} from "@angular/core";
import {MainPageComponent} from "./main-page/main-page.component";
import {LoginGuard} from "./guards/login.guard";
import {PracticeComponent} from "./practice/practice.component";
import {LessonComponent} from "./lesson/lesson.component";
import {LessonVideoComponent} from "./lesson-video/lesson-video.component";
import {OnlineAvailablesComponent} from "./online-availables/online-availables.component";
import {WaitingOnlineComponent} from "./waiting-online/waiting-online.component";
import {OnlineGameComponent} from "./online-game/online-game.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'main-page', component: MainPageComponent, canActivate:[LoginGuard]},
  { path: 'practice', component: PracticeComponent, canActivate:[LoginGuard]},
  { path: 'lesson/:lessonId', component: LessonComponent, canActivate:[LoginGuard]},
  { path: 'lesson-video/:lessonId', component: LessonVideoComponent, canActivate:[LoginGuard]},
  { path: 'online/available', component: OnlineAvailablesComponent, canActivate:[LoginGuard]},
  { path: 'online/waiting/:invitedUserId', component: WaitingOnlineComponent, canActivate:[LoginGuard]},
  { path: 'online/game/:gameId', component: OnlineGameComponent, canActivate:[LoginGuard]},
  { path:  '', redirectTo: 'home', pathMatch: 'full' },
  { path:  '**', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
