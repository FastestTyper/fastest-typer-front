import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OnlineAvaiablesService {

  constructor(private httpClient: HttpClient) { }

  available(userId: string): Observable<any> {
    return this.httpClient.post(environment.url + "/typer/online/" + userId + '/available', {});
  }

  notAvailable(userId: string): Observable<any> {
    return this.httpClient.post(environment.url + "/typer/online/" + userId + '/notAvailable', {});
  }

  availables(userId: string): Observable<any> {
    return this.httpClient.get(environment.url + "/typer/online/" + userId + '/availables');
  }

  invite(userId: string, invitedUserId: string): Observable<any> {
    return this.httpClient.post(environment.url + "/typer/online/" + userId + '/invite/' + invitedUserId, {});
  }

  accept(userId: string, invitingUserId: string, status: string): Observable<any> {
    return this.httpClient.post(environment.url + "/typer/online/" +userId + "/accept/" + invitingUserId, {status});
  }

  game(gameId: string): Observable<any> {
    return this.httpClient.get(environment.url + "/typer/online/game/" + gameId);
  }

  sendText(userId: string, text: string): Observable<any> {
    return this.httpClient.post(environment.url + "/typer/online/text/" + userId, {text});
  }
}
