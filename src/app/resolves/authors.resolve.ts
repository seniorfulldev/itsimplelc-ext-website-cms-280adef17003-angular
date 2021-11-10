import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Author } from '../interfaces/author.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class AuthorsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Author[]> {
    return this.apiService.getAuthors(route.paramMap.get('city'));
  }
}