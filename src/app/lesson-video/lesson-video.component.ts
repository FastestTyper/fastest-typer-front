import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonService} from "../services/lesson.service";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-lesson-video',
  templateUrl: './lesson-video.component.html',
  styleUrls: ['./lesson-video.component.css']
})
export class LessonVideoComponent implements OnInit {

  lessonId : string  = "1";
  lesson = {title: '', text: ''};
  url: SafeResourceUrl | undefined;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private lessonService: LessonService,
              public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || "1";

    this.lessonService.lessonById(this.lessonId).subscribe({
      next: value => {
        this.lesson = value;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.lesson.text);
      }
    });
  }

}
