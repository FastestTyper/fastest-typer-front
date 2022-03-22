import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alias = '';
  email = '';
  password = '';
  showError = false;
  showRegister = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  disabled(): boolean {
    return this.alias === '' || this.password === '' || this.email === '';
  }

  onRegister(): void {
    this.loginService.register(this.email, this.alias,this.password)
      .subscribe({
        next: value => {this.showRegister=true; this.showError=false; console.log("ok")},
        error: err => {this.showError=true; console.log(err)},
      });
  }
}
