import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

import { ApiService } from "../services/api.service";
import { CouncilMeetingsGeneralInfo } from './../interfaces/councilMeetingGeneralInfo.interface';

@Injectable()
export class CouncilMeetingGeneralInfoResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CouncilMeetingsGeneralInfo[]> {
    let city: string;
    if(route.paramMap.get("city")) {
      city = route.paramMap.get("city")
    } else {
      city = route.paramMap.get("id")?.split('&')[0] || environment.initTenant;
    }
    return this.apiService.getCouncilMeetingsGeneralInfo(city);
    // return this.apiService.getCouncilMeetingsGeneralInfo(route.paramMap.get("city"));
  }
}
