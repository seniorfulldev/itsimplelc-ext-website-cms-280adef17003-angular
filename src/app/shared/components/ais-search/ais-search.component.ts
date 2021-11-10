import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { FormControl } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { TenantStoreService } from 'src/app/services/tenant-store.service';
import { tap } from 'rxjs/operators';

const searchClient = algoliasearch(environment.aisAppId, environment.aisApiKey);

const prefix = environment.prefix;

interface ObjFromAis {
  kind: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  objectID: string;
  _highlightResult: any;
}

@Component({
  selector: 'app-ais-search',
  templateUrl: './ais-search.component.html',
  styleUrls: ['./ais-search.component.scss'],
})
export class AisSearchComponent implements OnInit {
  cityName: string;
  index: any;
  searchedObjsOfIndex: ObjFromAis[];
  searchControl = new FormControl();

  searchKeyWords: string;

  linksList = {
    CityEvent: 'events',
    // Page: "about",
    CityNews: 'news',
    Department: 'departments',
    CityServiceContact: 'directory',
    CityPark: 'places',
    Author: 'council',
    OnlineService: 'services',
    CouncilMeeting: 'councilmeetings',
    Job: 'career',
    Page: 'pages',
  };
  // angular material icon
  kindIconList = {
    CityEvent: 'event',
    CityNews: 'message',
    // Directory
    CityServiceContact: 'contact_phone',
    CouncilMeeting: 'group',
    Page: 'pages',
    OnlineService: 'miscellaneous_services',
    CityRealtimeAlert: 'add_alert',
    CityPark: 'park',
    Department: 'groups',
    Job: 'work',
    Author: 'person',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tenantStore: TenantStoreService
  ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   this.cityName = paramMap.get('city');
    // });

    this.tenantStore.data$
      .pipe(
        tap((tenant) => {
          this.cityName = tenant.name;
          this.index = searchClient.initIndex(
            `${prefix}_${this.cityName}_items`
          );
          this.index.search('').then((results) => {
            this.searchedObjsOfIndex = results.hits;
          });
        })
      )
      .subscribe();

    this.searchControl.valueChanges.subscribe((value) => {
      if (value) {
        this.searchKeyWords = value.trim();
        this.index.search(value.trim()).then((results) => {
          this.searchedObjsOfIndex = results.hits;
        });
      }
    });
  }

  onClearInput() {
    this.searchControl.reset();
  }

  getObjContent(obj) {
    if (!obj.description || this.isHTML(obj.description)) {
      return obj.title;
    }
    return obj.title + '\n' + obj.description;
  }

  onDirectToPage(obj: ObjFromAis) {
    this.onClearInput();

    if (Object.keys(this.linksList).indexOf(obj.kind) === -1) {
      return;
    }

    let extras = {};
    let commands = environment?.initTenant ? [] : ['', this.cityName];

    if (
      obj.kind === 'CityServiceContact' ||
      obj.kind === 'OnlineService' ||
      obj.kind === 'CouncilMeeting'
    ) {
      commands = [...commands, this.linksList[obj.kind]];
      extras = { queryParams: { keyWords: this.searchKeyWords } };
    } else {
      commands = [...commands, this.linksList[obj.kind], obj.objectID];
    }
    this.router.navigate(commands, extras);
  }

  isHTML(str) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    const bool = Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    return bool;
  }
}
