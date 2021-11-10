import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsStoreService extends ListStore<Contact> {

  constructor(private api: ApiTenantService) {
    super([]);
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getContacts()
      .toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
