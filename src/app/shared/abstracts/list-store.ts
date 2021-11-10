import { Injectable } from '@angular/core';
import { it } from 'date-fns/locale';
import { map, skip, skipWhile, takeUntil, takeWhile } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Store } from './store';

interface ItemWithId {
  id: string;
}
export abstract class ListStore<T extends ItemWithId> extends Store<T[]>  {
  protected sortCompareFn?(a: T, b: T): number;
  get sortedData$() {
    return this.data$.pipe(
      map((list) => {
        if (!this.sortCompareFn) return list;
        return list?.sort(this.sortCompareFn);
      })
    );
  }
  getItemById(id: string) {
    return this.data$.pipe(
      map((list) => {
        return list.find((i) => i.id === id);
      }),
     skipWhile((item) => !item),
    );
  }
}
