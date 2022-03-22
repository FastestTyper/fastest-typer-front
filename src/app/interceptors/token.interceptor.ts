import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request = req;

    if (this.tokenService.exist()) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ this.tokenService.get() }`,
        }
      });
    }
    return next.handle(request);
  }
}
