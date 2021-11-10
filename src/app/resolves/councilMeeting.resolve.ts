import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService } from "../services/api.service";
import { CouncilMeetings } from "../interfaces/councilMeeting.interface";
import { environment } from 'src/environments/environment';

@Injectable()
export class CouncilMeetingResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CouncilMeetings[]> {
    let city: string;
    if(route.paramMap.get("city")) {
      city = route.paramMap.get("city")
    } else {
      city = route.paramMap.get("id")?.split('&')[0] || environment.initTenant;
    }
    return this.apiService.getCouncilMeetings(city);
    // return this.apiService.getCouncilMeetings(route.paramMap.get("city"));
  }
}
