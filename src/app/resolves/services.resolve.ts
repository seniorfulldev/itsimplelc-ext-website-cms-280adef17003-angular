import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Service } from '../interfaces/service.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class ServicesResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Service[]> {
    return this.apiService.getAllServices(route.paramMap.get('city'));
  }
}