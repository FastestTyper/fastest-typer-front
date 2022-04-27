import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../services/token.service";
import {OnlineAvaiablesService} from "../services/online-avaiables.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Client} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {environment} from "../../environments/environment";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-online-game',
  templateUrl: './online-game.component.html',
  styleUrls: ['./online-game.component.css']
})
export class OnlineGameComponent implements OnInit {
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

  private userId!: string;
  private otherUserId!: string;
  private gameId!: string;
  private text!: string;
  totalTime = "00:00:00";
  htmlToAdd: any = "";
  preparse: string = "";
  input : string = "";
  lastChar : string = "";
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  win: boolean = false;
  timer: any;
  started: boolean = false;
  otherText: string = "";
  private client!: Client;
  @ViewChild("modalWin") modalWin: ElementRef = {} as ElementRef;
  @ViewChild("modalLose") modalLose: ElementRef = {} as ElementRef;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private tokenService: TokenService,
              private onlineService: OnlineAvaiablesService,
              public sanitizer: DomSanitizer,
              config: NgbModalConfig,
              private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userId = this.tokenService.retrieveUserId();
    this.gameId = this.route.snapshot.paramMap.get('gameId') || "1";
    this.onlineService.game(this.gameId).subscribe(
      value => {
        this.text = value.text;
        if(this.userId == value.userId) {
          this.otherUserId = value.invitingUserId;
        }
        else {
          this.otherUserId = value.userId;
        }
        this.client = new Client();
        this.client.webSocketFactory = () => {
          return new SockJS(environment.wsUrl);
        };
        this.client.onConnect = (frame) => {
          this.client.subscribe('/topic/game' + this.otherUserId,  (event) => {
            this.otherText = event.body;
          });
          this.client.subscribe('/topic/win' + this.gameId + this.otherUserId,  (event) => {
            this.modalService.open(this.modalLose);
          });
        };
        this.client.activate();
        this.preparse = this.preparseText(this.text);
        this.processText();
      }
    )
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
    if(char === " ") {
      this.onlineService.sendText(this.userId, this.input).subscribe();
    }
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
          html += "<spam style='color: #1A5702; background-color: #BEF4B3; font-size: 20px;'>" + textArr[i] + "</spam>"
        } else {
          html += "<spam style='color: #812006; background-color: #F4C1B3; font-size: 20px;'>" + textArr[i] + "</spam>"
          allCorrect = false;
        }
      }else {
        html += "<spam style='color: black; font-size: 20px;'>" + textArr[i] + "</spam>"
        allCorrect = false;
      }
    }
    if(allCorrect) {
      this.onlineService.sendText(this.userId, this.input).subscribe();
      this.win = true;
      clearInterval(this.timer);
      this.onlineService.sendWin(this.userId, this.gameId).subscribe(
        value => this.modalService.open(this.modalWin)
      );
    }
    this.htmlToAdd = html;
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

  onCloseWin() {
    this.modalService.dismissAll();
    this.router.navigateByUrl("/online/available").then();
  }

  onCloseLose() {
    this.modalService.dismissAll();
    this.router.navigateByUrl("/online/available").then();
  }
}
