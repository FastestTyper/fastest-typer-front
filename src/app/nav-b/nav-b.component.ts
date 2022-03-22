import { Component, OnInit } from '@angular/core';
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-b',
  templateUrl: './nav-b.component.html',
  styleUrls: ['./nav-b.component.css']
})
export class NavBComponent implements OnInit {

  exist: boolean = false;

  constructor(public tokenService : TokenService, private router : Router) {
  }

  ngOnInit(): void {
    this.exist = this.tokenService.exist();
  }

  logOut(): void {
    this.tokenService.destroy();
    this.exist = this.tokenService.exist();
    this.router.navigateByUrl('/home');
  }

  onNavbar() {
    if(this.tokenService.exist()) {
      this.router.navigateByUrl('main-page');
    }else {
      this.router.navigateByUrl('/home');
    }
  }
}
