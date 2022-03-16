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
    {name: 'Migue', points: 4999},
    {name: 'ElMaquinas', points: 20},
    {name: 'EscritorProf', points: 10},
    {name: 'alguien', points: 2},
    {name: 'yo', points: 2},
    {name: 'tu', points: 2},
    {name: 'algunaPersona', points: 2},
    {name: 'Persona', points: 2},
  ];

  ngOnInit(): void {
  }

}
