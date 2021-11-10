import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class MenusStoreService extends ListStore<Menu> {

  constructor(private api: ApiTenantService) {
    super();
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getMenu()
      .toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
