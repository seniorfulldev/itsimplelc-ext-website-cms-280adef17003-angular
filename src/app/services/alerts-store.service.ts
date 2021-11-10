import { Injectable } from '@angular/core';
import { Alert } from '../interfaces/alert.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root',
})
export class AlertsStoreService extends ListStore<Alert> {
  // sortCompareFn(a: Alert, b: Alert): number {
  //   let dateA = new Date(a.createdDate);
  //   let dateB = new Date(b.createdDate);
  //   return dateB.getTime() - dateA.getTime();
  // }
  constructor(private api: ApiTenantService) {
    super();
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getAlerts().toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
