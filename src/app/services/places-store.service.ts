import { Injectable } from '@angular/core';
import { Place } from '../interfaces/place.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesStoreService extends ListStore<Place> {

  constructor(private api: ApiTenantService) {
    super([]);
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getPlaces()
      .toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
