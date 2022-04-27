import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TokenService} from "../services/token.service";
import {OnlineAvaiablesService} from "../services/online-avaiables.service";
import {Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

export interface OnlineUser {
  id: string,
  email: string;
  alias: string;
  points: number;
}

@Component({
  selector: 'app-online-availables',
  templateUrl: './online-availables.component.html',
  styleUrls: ['./online-availables.component.css']
})
export class OnlineAvailablesComponent implements OnInit, OnDestroy {
  Users: OnlineUser[] = [];
  private client!: Client;
  private userId!: string;
  @ViewChild("modal") modal: ElementRef = {} as ElementRef;
  invitingUser!: OnlineUser;

  constructor(private tokenService: TokenService,
              private onlineAvaiablesService: OnlineAvaiablesService,
              config: NgbModalConfig,
              private modalService: NgbModal,
              private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
    this.userId = this.tokenService.retrieveUserId();
    this.onlineAvaiablesService.available(this.userId).subscribe();
    this.retrieveOnlineUsers();
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS(environment.wsUrl);
    };
    this.client.onConnect = (frame) => {
      this.client.subscribe('/topic/availables',  (event) => {
        this.retrieveOnlineUsers();
      });
      this.client.subscribe('/topic/invitation' + this.userId,  (event) => {
        const jsonUser = JSON.parse(event.body);
        this.invitingUser = {id: jsonUser.id, email: jsonUser.email, alias: jsonUser.alias, points: jsonUser.points}
        this.modalService.open(this.modal);
      });
    };
    this.client.activate();

  }

  ngOnDestroy(): void {
    this.onlineAvaiablesService.notAvailable(this.userId)
      .subscribe();
  }

  onInvite(id: string) {
    this.onlineAvaiablesService.invite(this.userId, id).subscribe();
    this.router.navigateByUrl('online/waiting/' + id).then();
  }

  retrieveOnlineUsers() {
    this.Users = [];
    this.onlineAvaiablesService.availables(this.userId)
      .subscribe(
        {
          next: value => {value.forEach((v: any) => {this.Users.push({id: v.id, email: v.email, alias: v.alias, points: v.points})})}
        }
      )
  }

  onClose() {
    this.onlineAvaiablesService.accept(this.userId, this.invitingUser.id, "NO").subscribe();
    this.modalService.dismissAll();
  }

  onAccept() {
    this.modalService.dismissAll();
    this.onlineAvaiablesService.accept(this.userId, this.invitingUser.id, "YES").subscribe(
      value => this.router.navigateByUrl('/online/game/' + value.gameId).then()
    );
  }
}
