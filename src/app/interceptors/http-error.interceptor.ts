import { Injectable } from '@angular/core';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpResponse,
 HttpErrorResponse
} from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public apiService: ApiService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        return throwError(errorMessage);
      })
    )
  }
}