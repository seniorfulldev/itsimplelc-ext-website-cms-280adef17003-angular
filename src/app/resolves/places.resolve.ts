import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Place } from '../interfaces/place.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class PlacesResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Place[]> {
    return this.apiService.getPlaces(route.paramMap.get('city'));
  }
}