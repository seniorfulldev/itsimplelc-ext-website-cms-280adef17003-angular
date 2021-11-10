import { JobGeneralInfo } from './../../../interfaces/jobGeneralInfo.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job.interface';
import { merge, Observable } from 'rxjs';
import { JobsStoreService } from 'src/app/services/jobs-store.service';
import { JobsInfoStoreService } from 'src/app/services/jobs-info-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-career.detail',
  templateUrl: './career.detail.component.html',
  styleUrls: ['./career.detail.component.scss'],
})
export class CareerDetailComponent implements OnInit {
  job: Job;
  generalInfo: JobGeneralInfo[];

  jobSlideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    dots: true,
    autoplay: false,
    // prevArrow: '<img class="slick-prev" src="assets/images/left-btn.svg"/>',
    // nextArrow: '<img class="slick-next" src="assets/images/right-btn.svg"/>',
  };
  sub: Observable<any>
    constructor(
    private jobsStore: JobsStoreService,
    private jobInfoStore: JobsInfoStoreService,
    private route: ActivatedRoute
  ) {

    this.sub = merge(
      this.jobsStore.getItemById(this.route.snapshot.paramMap.get('id')).pipe(
        tap((job) => {
          this.job = job;
        })
      ),
      this.jobInfoStore.data$.pipe(
        tap((jobsInfo) => {
          this.generalInfo = jobsInfo;
        })
      )
    );
  }

  ngOnInit() {
  }
  onSubmit() {
    console.log('submit');
    const subject = `New Career Application for ${this.job.title}`;
    const body = `Hello ${this.job.name}, %0D%0A Thank you for the opportunity to apply for the ${this.job.title} position. Please find attached my resume for your consideration.%0D%0A %0D%0A Thank you,`;

    window.location.href = `mailto:${this.job.email}?subject=${subject}&body=${body}`;
  }
}
