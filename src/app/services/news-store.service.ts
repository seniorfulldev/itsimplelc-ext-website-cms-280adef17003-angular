import { Injectable } from '@angular/core';
import { News } from '../interfaces/news.interface';
import { ListStore } from '../shared/abstracts/list-store';
import { ApiTenantService } from './api-tenant.service';

@Injectable({
  providedIn: 'root',
})
export class NewsStoreService extends ListStore<News> {
  sortCompareFn(a: News, b: News): number {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  }
  constructor(private api: ApiTenantService) {
    super([]);
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    try {
      const result = await this.api.getNews().toPromise();
      this.setData(result);
      this.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }
}
