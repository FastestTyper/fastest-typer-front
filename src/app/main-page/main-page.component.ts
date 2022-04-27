import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onPractice(): void {
    this.router.navigateByUrl('/practice').then();
  }

  onPvP() {
    this.router.navigateByUrl('/online/available').then();
  }
}
