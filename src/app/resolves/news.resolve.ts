import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { News } from '../interfaces/news.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class NewsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<News[]> {
    return this.apiService.getNews(route.paramMap.get('city'));
  }
}