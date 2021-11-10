import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Group } from '../interfaces/group.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class ServiceGroupsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Group[]> {
    return this.apiService.getServiceGroups(route.paramMap.get('city'));
  }
}