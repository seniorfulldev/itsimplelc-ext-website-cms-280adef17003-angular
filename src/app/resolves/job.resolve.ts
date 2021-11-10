
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from "../services/api.service";
import { Job } from "../interfaces/job.interface";

@Injectable()
export class JobResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Job[]> {
    return this.apiService.getJobs(route.paramMap.get("city"));
  }
}
