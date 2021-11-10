import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Menu } from '../interfaces/menu.interface';

@Injectable()
export class MenuResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Menu[]> {
    // return
    return this.apiService.getMenu(route.paramMap.get('city'));
  }
}