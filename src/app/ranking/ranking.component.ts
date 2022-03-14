import {Component, OnInit, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";

export interface UserTable {
  name: string;
  points: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})

export class RankingComponent implements OnInit {

  ELEMENT_DATA: UserTable[] = [
    {name: 'Alia', points: 10000},
    {name: 'Troxi', points: 5000},
    {name: 'EscritorProf', points: 1},
    {name: 'Migue', points: 4999},
    {name: 'ElMaquinas', points: 2},
  ];

  ngOnInit(): void {
  }

}
