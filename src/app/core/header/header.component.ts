import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../interfaces/service.interface';
import { Settings } from 'src/app/interfaces/settings.interface';
import { Page } from 'src/app/interfaces/page.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { ServicesStoreService } from 'src/app/services/services-store.service';
import { map, switchMap } from 'rxjs/operators';
import { TenantStoreService } from 'src/app/services/tenant-store.service';
import { MenusStoreService } from 'src/app/services/menus-store.service';
import { PagesStoreService } from 'src/app/services/pages-store.service';
import { DepartmentsStoreService } from 'src/app/services/departments-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  logo: string = 'http://placehold.it/350x150/000000';
  services$ = this.servicesStore.data$.pipe(
    map((services) => {
      if (this.askServices && this.payServices && this.services?.length)
        return services;
      this.askServices = [];
      this.payServices = [];
      services.forEach((service) => {
        if (service.type === 'ask') {
          this.askServices.push(service);
        } else if (service.type === 'pay') {
          this.payServices.push(service);
        }
      });
      this.payServices?.sort((a, b) => a.title.localeCompare(b.title));
      this.askServices?.sort((a, b) => a.title.localeCompare(b.title));
      return services;
    })
  );
  services: Service[];
  city: string;
  payServices: Service[];
  askServices: Service[];

  constructor(
    private route: ActivatedRoute,
    private servicesStore: ServicesStoreService

  ) {
    this.city = this.route.snapshot.paramMap.get('city') || '';
    // google custom search

    // var cx = '007445572474295316230:pkndee92-u0';
    // var gcse = document.createElement('script');
    // gcse.type = 'text/javascript';
    // gcse.async = true;
    // gcse.src =
    //   (document.location.protocol == 'https:' ? 'https:' : 'http:') +
    //   '//www.google.com/cse/cse.js?cx=' +
    //   cx;
    // var s = document.getElementsByTagName('script')[0];
    // s.parentNode.insertBefore(gcse, s);

    // google translate
  }

  ngOnInit() {
  }
}
