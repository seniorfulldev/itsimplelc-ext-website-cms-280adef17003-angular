import { Injectable } from '@angular/core';
import { Job } from '../interfaces/job.interface';
import { JobGeneralInfo } from '../interfaces/jobGeneralInfo.interface';
import { Page } from '../interfaces/page.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class JobsInfoStoreService extends ListStore<JobGeneralInfo> {

  constructor(private api: ApiTenantService) {
    super();
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getJobGeneralInfo()
      .toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
