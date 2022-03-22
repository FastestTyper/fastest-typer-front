import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private httpClient: HttpClient) { }

  lessonsByUser(userId: string): Observable<any> {
    return this.httpClient.get(environment.url + '/typer/' + userId + '/lesson')
  }

  lessonById(lessonId: string): Observable<any> {
    return this.httpClient.get(environment.url + '/typer/lesson/' + lessonId)
  }

  markAsCompleted(userId: string, lessonId: string) : Observable<any> {
    return this.httpClient.post(environment.url + '/typer/' + userId + '/lesson/' + lessonId + '/completed', {})
  }
}
