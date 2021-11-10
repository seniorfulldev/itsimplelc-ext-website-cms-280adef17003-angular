import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Alert } from '../interfaces/alert.interface';
import { Highlight } from '../interfaces/highlight.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class HighlightsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Highlight[]> {
    return this.apiService.getHighlights(route.paramMap.get('city'));
  }
}
