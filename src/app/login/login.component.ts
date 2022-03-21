import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  showError = false;

  constructor(private loginService : LoginService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  disabled(): boolean {
    return this.password === '' || this.email === '';
  }

  onLogin(): void {
    this.loginService.login(this.email,this.password)
      .subscribe({
        next: value => {this.tokenService.save(value.token); this.router.navigateByUrl('/main-page').then()},
        error: err => {this.showError=true; console.log(err)},
      });
  }

}
