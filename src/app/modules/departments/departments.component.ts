import { Component, OnInit, Input } from '@angular/core';
import { Department } from '../../interfaces/department.interface';
import { EmbedVideoService } from 'ngx-embed-video';
import { DepartmentsStoreService } from 'src/app/services/departments-store.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[];
  department: Department;
  departs: Department;
  videoUrl;
  iframe_html: any;
  department$ = this.departmentsStore.data$.pipe(
    map((departments) => {
      return departments;
    })
  );
  departments$ = this.departmentsStore.data$;

  constructor(
    private embedService: EmbedVideoService,
    private departmentsStore: DepartmentsStoreService
  ) {
    // this.departments = this.route.snapshot.data['departments'];
    // this.department = this.departments[2];
  }

  ngOnInit() {}
}
