import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  groupBy,
  forEach,
  filter,
  sortBy,
  map,
  includes,
  find,
} from 'lodash-es';

import { Service } from '../../interfaces/service.interface';
import { Group } from '../../interfaces/group.interface';
import { ServicesStoreService } from 'src/app/services/services-store.service';
import { ServiceGroupsStoreService } from 'src/app/services/serivce-groups-store.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services: Service[];
  groups: Group[];
  result: any = [];
  search: string;
  searchKeyWordsFromAis: string;
  sub: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private servicesStore: ServicesStoreService,
    private serviceGroupStore: ServiceGroupsStoreService
  ) {
    const _this = this;
    let groupResult = [];
    this.sub = this.serviceGroupStore.data$.pipe(
      switchMap((groups) => {
        this.groups = groups;
        return this.servicesStore.data$;
      }),
      tap((services) => {
        this.services = services;
        forEach(this.services, function (value) {
          let groups = filter(_this.groups, function (group) {
            return includes(value.groupIds, group.id);
          });
          // groups are filtered service group based on service groupIds
          forEach(groups, function (group) {
              let temp = JSON.parse(JSON.stringify(value));
              temp['groupTitle'] = group.title;
              groupResult.push(temp);
          });
        });
        groupResult = groupBy(groupResult, 'groupTitle');
        map(groupResult, function (item, key) {
          let sortedItem = sortBy(item, 'title');
          _this.result[key] = sortedItem;
        });
      })
    )
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.searchKeyWordsFromAis = queryParams.get('keyWords');
    });
  }

  onSearch(value) {
    this.search = value;
  }

  isVisible(service) {
    if (!this.search) {
      return true;
    }

    return service.title.toLowerCase().includes(this.search.toLowerCase());
  }

  isVisibleGroup(group) {
    return (
      filter(group.value, (service) => {
        return this.isVisible(service);
      }).length > 0
    );
  }
}
