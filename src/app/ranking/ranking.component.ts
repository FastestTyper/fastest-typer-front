import {Component, OnInit, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {RankingService} from "../services/ranking.service";

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

  constructor(private rankingService: RankingService) {
  }

  ELEMENT_DATA: UserTable[] = [];

  ngOnInit(): void {
    this.rankingService.ranking()
      .subscribe(
        {
          next: value => {value.forEach((v: any) => {this.ELEMENT_DATA.push({name: v.alias, points: v.points})})}
        }
      )
  }

}
