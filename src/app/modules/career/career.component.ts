import { JobGeneralInfo } from './../../interfaces/jobGeneralInfo.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/interfaces/job.interface';
import { merge, Observable } from 'rxjs';
import { JobsStoreService } from 'src/app/services/jobs-store.service';
import { JobsInfoStoreService } from 'src/app/services/jobs-info-store.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  jobs: Job[];
  result: Job[];
  keyWords: string;
  jobDescription: JobGeneralInfo[];

  sub: Observable<any>

  constructor(private jobsStore: JobsStoreService, private jobInfoStore: JobsInfoStoreService) {
    this.sub = merge(
      this.jobsStore.data$.pipe(
        tap(jobs => {
          this.jobs = jobs;
          this.result = jobs;
        })),
        this.jobInfoStore.data$.pipe(
          tap(jobsInfo => {
            this.jobDescription = jobsInfo;
          }))
    );
    // this.jobs = this.route.snapshot.data['jobs'];
    // this.result = this.jobs;
    // this.jobDescription = this.route.snapshot.data['jobGeneralInfo'];
  }

  ngOnInit() {}

  onSearchByKeywords() {
    if (this.keyWords) {
      this.result = [];
      this.jobs.forEach((job: Job) => {
        if (job.title.toLowerCase().indexOf(this.keyWords.toLowerCase()) >= 0) {
          this.result.push(job);
        }
      });
    } else {
      this.result = this.jobs;
    }
  }

  onMailto(job: Job) {
    const subject = `New Career Application for ${job.title}`;
    const body =
    `Hello ${job.name}, %0D%0A Thank you for the opportunity to apply for the ${job.title} position. Please find attached my resume for your consideration.%0D%0A %0D%0A Thank you,`

    window.location.href = `mailto:${job.email}?subject=${subject}&body=${body}`;
  }

  clear() {
    this.keyWords = '';
    this.onSearchByKeywords();
  }
}
