import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Settings } from '../interfaces/settings.interface';

import { Title } from '@angular/platform-browser';
import { TenantStoreService } from '../services/tenant-store.service';
import { environment } from 'src/environments/environment';
// import { Pages } from '../interfaces/pages.interface';

declare let gtag: Function;

const tenantName = environment.initTenant;
@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  settings: Settings;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private tenant: TenantStoreService
  ) {
    this.tenant.setData({
      name: tenantName || this.route.snapshot.params['city'],
      settings: this.route.snapshot.data['settings']
    });
    this.settings = this.route.snapshot.data['settings'];
    if (!tenantName) {
      this.title.setTitle(this.settings.viewShortName || '');
    }

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-114671378-11', {
          page_path: event.urlAfterRedirects
        });
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {
  }
}
