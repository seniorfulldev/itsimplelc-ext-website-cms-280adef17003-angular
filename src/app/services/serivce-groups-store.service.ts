import { Injectable } from '@angular/core';
import { Group } from '../interfaces/group.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceGroupsStoreService extends ListStore<Group> {

  constructor(private api: ApiTenantService) {
    super();
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getServiceGroups()
      .toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
