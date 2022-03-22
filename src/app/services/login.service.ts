import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  register(email: string, alias:string, password:string): Observable<any> {
    return this.httpClient.post(environment.url + "/typer/register", {email, alias, password});
  }

  login(user: string, pass: string): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + window.btoa(user + ':' + pass));

    return this.httpClient.post(environment.url + '/typer/login', {}, {headers});
  }
}
