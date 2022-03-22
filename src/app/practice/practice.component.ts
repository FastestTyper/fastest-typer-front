import {Component, OnInit} from '@angular/core';
import {LessonService} from "../services/lesson.service";
import {Router} from "@angular/router";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  lessons : Array<any> = [];

  constructor(private router: Router,
              private lessonService: LessonService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.lessonService.lessonsByUser(this.tokenService.retrieveUserId()).subscribe({
      next: value => this.lessons = value
    })
  }

  onPlay(id: string) {
    this.router.navigateByUrl('/lesson/' + id).then();
  }
}
