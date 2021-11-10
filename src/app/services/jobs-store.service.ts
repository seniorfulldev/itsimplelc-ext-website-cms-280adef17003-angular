import { Injectable } from '@angular/core';
import { Job } from '../interfaces/job.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class JobsStoreService extends ListStore<Job> {

  constructor(private api: ApiTenantService) {
    super();
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getJobs()
      .toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
