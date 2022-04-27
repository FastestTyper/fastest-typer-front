import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-waiting-online',
  templateUrl: './waiting-online.component.html',
  styleUrls: ['./waiting-online.component.css']
})
export class WaitingOnlineComponent implements OnInit, OnDestroy {
  private client!: Client;
  private invitedUserId!: String;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnDestroy(): void {
        this.client.deactivate();
    }

  ngOnInit(): void {
    this.invitedUserId = this.route.snapshot.paramMap.get('invitedUserId') || "1";
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS(environment.wsUrl);
    };
    this.client.onConnect = (frame) => {
      this.client.subscribe('/topic/accepting' + this.invitedUserId,  (event) => {
        if(event.body === '"NO"') {
          this.router.navigateByUrl('/online/available').then();
        } else {
          this.router.navigateByUrl('/online/game/' + event.body).then();
        }
      });
    };
    this.client.activate();
  }

}
