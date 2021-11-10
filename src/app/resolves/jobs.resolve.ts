import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job.interface';
import { ApiService } from '../services/api.service';

@Injectable()
export class JobsResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Job[]> {
    return this.apiService.getJobs(route.paramMap.get('city'));
  }
}