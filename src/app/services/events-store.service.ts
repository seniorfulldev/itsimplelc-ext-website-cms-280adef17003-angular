import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root',
})
export class EventsStoreService extends ListStore<Event> {
  protected sortCompareFn(a: Event, b: Event): number {
    let dateA = new Date(a.startDate);
    let dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  }

  constructor(private api: ApiTenantService) {
    super();
    this.fetchData(); // .subscribe();
  }
  async fetchData() {
    try {
      const result = await this.api.getEvents().toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
