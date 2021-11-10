import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Token } from '../interfaces/token.interface';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public apiService: ApiService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:Token = this.apiService.token;
    
    if (token && token.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}