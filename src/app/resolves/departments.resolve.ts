import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Department } from '../interfaces/department.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class DepartmentsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Department[]> {
    return this.apiService.getDepartments(route.paramMap.get('city'));
  }
}