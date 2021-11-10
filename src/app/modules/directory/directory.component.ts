import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContactsStoreService } from 'src/app/services/contacts-store.service';

import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  contacts: Contact[] = [];
  result: Contact[] = [];

  sortDir: any = {
    name: 1,
    role: 1
  };

  sorted: any = {
    name: false,
    role: false
  }

  searchKeyWordsFromAis: string;

  sub: Observable<any>

  constructor(private route: ActivatedRoute, private contactsStore: ContactsStoreService) {
    this.sub = this.contactsStore.data$.pipe(
      tap(contacts => {
        this.contacts = contacts;
        this.result = [...contacts];
        this.onSearch(this.searchKeyWordsFromAis);
      })
      )
    }

    ngOnInit() {
      this.route.queryParamMap.subscribe(queryParams => {
        this.searchKeyWordsFromAis = queryParams.get('keyWords');
        if(this.contacts.length !== 0) {
        this.onSearch(this.searchKeyWordsFromAis);
      }
    });
  }

  onSearch(value) {
    if (value) {
      this.result = [];
      this.contacts.forEach((index: Contact) => {
        if (index.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 || index.role.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          this.result.push(index);
        }
      });
    } else {
      this.result = this.contacts;
    }
  }

  sortBy(event, field) {
    this.sortDir[field] = -this.sortDir[field];
    this.sorted[field] = true;
    this.result.sort((a, b) => {
      return a[field].toLowerCase() > b[field].toLowerCase()? -this.sortDir[field] : this.sortDir[field];
    });
  }

  isVisible(field, value) {
    return !this.sorted[field] || (this.sortDir[field] == value);
  }
}
