import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Settings } from '../interfaces/settings.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class SettingsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Settings> {
    const tenant = environment.initTenant || route.paramMap.get('city');
    return this.apiService.getSettings(tenant);
  }
}
