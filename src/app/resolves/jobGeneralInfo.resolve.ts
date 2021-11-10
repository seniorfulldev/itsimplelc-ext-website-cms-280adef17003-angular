import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { JobGeneralInfo } from '../interfaces/jobGeneralInfo.interface';

import { ApiService } from "../services/api.service";

@Injectable()
export class JobGeneralInfoResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<JobGeneralInfo[]> {
    return this.apiService.getJobGeneralInfo(route.paramMap.get("city"));
  }
}
