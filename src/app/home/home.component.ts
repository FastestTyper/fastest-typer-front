import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../services/token.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(private router : Router, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.tokenService.destroy();
  }

  onLogin(): void {
    this.router.navigateByUrl('/login').then();
  }

  onRegister(): void {
    this.router.navigateByUrl('/register').then();
  }

}
