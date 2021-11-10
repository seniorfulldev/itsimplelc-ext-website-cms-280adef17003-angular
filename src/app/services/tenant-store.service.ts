import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings.interface';
import { Store } from '../shared/abstracts/store';

interface Tenant {
  name: string;
  settings: Settings;
}

@Injectable({
  providedIn: 'root'
})
export class TenantStoreService extends Store<Tenant> {
  async fetchData(): Promise<void> {
  }

  constructor() {
    super();
  }
}
