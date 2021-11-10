import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Contact } from '../interfaces/contact.interface';

import { ApiService } from '../services/api.service';

@Injectable()
export class ContactsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Contact[]> {
    return this.apiService.getContacts(route.paramMap.get('city'));
  }
}