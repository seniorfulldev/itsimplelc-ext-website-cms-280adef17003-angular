import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Page } from '../interfaces/page.interface';

@Injectable()
export class PagesResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Page[]> {
    // return
    return this.apiService.getPages(route.paramMap.get('city'));
  }
}
