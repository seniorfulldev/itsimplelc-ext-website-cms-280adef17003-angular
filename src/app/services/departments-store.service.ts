import { Injectable } from '@angular/core';
import { Department } from '../interfaces/department.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsStoreService extends ListStore<Department> {

  protected sortCompareFn(a: Department, b: Department): number {
    const titleA = a?.title || '';
    const titleB = b?.title || '';
    return titleA.localeCompare(titleB);
  }

  constructor(private api: ApiTenantService) {
    super();
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getDepartments()
      .toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
