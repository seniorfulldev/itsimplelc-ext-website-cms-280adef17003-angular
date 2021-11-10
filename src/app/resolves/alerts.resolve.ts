import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Alert } from '../interfaces/alert.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class AlertsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Alert[]> {
    return this.apiService.getAlerts(route.paramMap.get('city'));
  }
}