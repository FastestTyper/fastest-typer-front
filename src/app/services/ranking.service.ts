import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private httpClient: HttpClient) { }

  ranking(): Observable<any> {
    return this.httpClient.get(environment.url + "/typer/ranking");
  }

  increase(userId: string): Observable<any> {
    return this.httpClient.put(environment.url + "/typer/ranking/" + userId + "/increase", {});
  }
}
