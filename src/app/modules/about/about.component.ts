import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TenantStoreService } from 'src/app/services/tenant-store.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  setting: any;

  settings$ = this.tenantStore.data$.pipe(
    map(tenant => {
      return tenant?.settings;
    })
  );

  constructor( private route: ActivatedRoute, private tenantStore: TenantStoreService) {
    // this.setting = this.route.snapshot.data['setting'];
   }

  ngOnInit() {
  }

}
