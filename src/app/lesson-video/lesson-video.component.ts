import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonService} from "../services/lesson.service";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-lesson-video',
  templateUrl: './lesson-video.component.html',
  styleUrls: ['./lesson-video.component.css']
})
export class LessonVideoComponent implements OnInit {

  lessonId : string  = "1";
  lesson = {title: '', text: ''};
  url: SafeResourceUrl | undefined;
  @ViewChild("modal") modal: ElementRef = {} as ElementRef;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private lessonService: LessonService,
              public sanitizer: DomSanitizer,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private tokenService: TokenService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || "1";

    this.lessonService.lessonById(this.lessonId).subscribe({
      next: value => {
        this.lesson = value;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.lesson.text);
      }
    });
  }

  onEnded() {
    this.modalService.open(this.modal);
  }

  onClose() {
    this.modalService.dismissAll();
    this.lessonService.markAsCompleted(this.tokenService.retrieveUserId(), this.lessonId).subscribe({
      next: value => this.router.navigateByUrl('practice')
    })
  }
}
