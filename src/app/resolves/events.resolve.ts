import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Event } from '../interfaces/event.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class EventsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Event[]> {
    return this.apiService.getEvents(route.paramMap.get('city'));
  }
}