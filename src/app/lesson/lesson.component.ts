import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonService} from "../services/lesson.service";
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TokenService} from "../services/token.service";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

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
  lessonId : string  = "1";
  lesson = {title: '', text: ''};
  input : string = "";
  lastChar : string = "";
  processedText : string = "";
  htmlToAdd: any = "";
  preparse: string = "";
  win: boolean = false;
  started: boolean = false;
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  timer: any;
  totalTime = "00:00:00";
  @ViewChild("modal") modal: ElementRef = {} as ElementRef;

  quoted = new Map<string, string>([
    ["a", "á"],
    ["e", "é"],
    ["i", "í"],
    ["o", "ó"],
    ["u", "ú"],
    ["A", "Á"],
    ["E", "É"],
    ["I", "Í"],
    ["O", "Ó"],
    ["U", "Ú"]
  ]);

  vocals = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

  validCharacters = [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z',
    'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z',
    'á', 'é', 'í', 'ó', 'ú',
    ',', '.', '-', ';', '_', '?', '¿', '!', ' ',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') || "1";

    this.lessonService.lessonById(this.lessonId).subscribe({
      next: value => {
        this.lesson = value;
        this.preparse = this.preparseText(this.lesson.text);
        this.processText();
      }
    });
  }

  preparseText(text: string): string {
    let preparse = "";
    for(let i = 0; i < text.length; i++) {
      if(this.validCharacters.includes(text[i]) || this.vocals.includes(text[i])) {
        preparse += text[i];
      }
    }
    return preparse;
  }

  @HostListener('document:keydown', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if(this.win) return;
    if(!this.started) {
      this.started = true;
      this.tick();
      this.timer = setInterval(() => this.tick(), 1000);
    }
    let char = "";
    if(this.validCharacters.includes(event.key)) {
      char += event.key
      this.lastChar = char;
    }else if (event.code == 'Backspace') {
      this.input = this.input.slice(0, -1);
      char = '';
      this.lastChar = "Del";
    }else if(this.lastChar == "Quote" && this.vocals.includes(event.key)) {
      char += this.quoted.get(event.key);
      this.lastChar = char;
    }else if(this.vocals.includes(event.key)){
      char += event.key;
      this.lastChar = char;
    }else if(event.code == 'Quote') {
      this.lastChar = 'Quote';
    }
    this.input += char;
    this.processText();
  }

  processText() {
    let inputArr = this.input;
    let textArr = this.preparse;
    let html = "";
    let allCorrect = true;
    for(let i = 0; i < textArr.length; i++) {
      if(i < inputArr.length){
        if(inputArr[i] == textArr[i]){
          html += "<spam style='color: #1A5702; background-color: #BEF4B3'>" + textArr[i] + "</spam>"
        } else {
          html += "<spam style='color: #812006; background-color: #F4C1B3'>" + textArr[i] + "</spam>"
          allCorrect = false;
        }
      }else {
          html += "<spam style='color: black;'>" + textArr[i] + "</spam>"
        allCorrect = false;
      }
    }
    if(allCorrect) {
      this.win = true;
      clearInterval(this.timer);
      this.modalService.open(this.modal);
    }
    this.htmlToAdd = html;
  }

  onClose() {
    this.modalService.dismissAll();
    this.lessonService.markAsCompleted(this.tokenService.retrieveUserId(), this.lessonId).subscribe({
      next: value => this.router.navigateByUrl('practice')
    })
  }

  tick(){
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    this.totalTime = this.pad(this.hours, 2) + ":" + this.pad(this.minutes,2) + ":" + this.pad(this.seconds,2);
  }
  pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
