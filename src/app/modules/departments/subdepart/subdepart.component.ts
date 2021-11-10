import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/interfaces/department.interface';
import { find } from 'lodash-es';
import { DepartmentsStoreService } from 'src/app/services/departments-store.service';
// import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'subdepart',
  templateUrl: './subdepart.component.html',
  styleUrls: ['./subdepart.component.scss']
})
export class SubdepartComponent implements OnInit {
  departments: Department[];
  department: Department;

  department$ = this.departmentsStore.getItemById(this.route.snapshot.paramMap.get('id'))
  // departs: Department;
  // videoUrl;
  iframe_html: any;
  constructor(private route: ActivatedRoute, private router: Router, private departmentsStore: DepartmentsStoreService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    // let departments = this.route.snapshot.data.departments;
    // let id = this.route.snapshot.paramMap.get('id');
    // departments.forEach( depart => {
    //   if(depart.title.toLowerCase().indexOf(id) >= 0 || depart.id.toLowerCase().indexOf(id) >= 0) {
    //     this.department = depart;
    //   }
    // })
    // this.department = find(departments, ['id', id]);
    // if(this.department.videoUrl) {
    //   this.iframe_html = this.embedService.embed(this.department.videoUrl,
    //     {
    //       query: { autoplay: 1, portrait: 0, color: '333' },
    //       attr: { width: 800, height: 400 }
    //     });
    // }
  }
}
