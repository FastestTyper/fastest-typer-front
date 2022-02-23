import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
}
