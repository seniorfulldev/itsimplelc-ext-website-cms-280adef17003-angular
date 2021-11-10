import { CouncilMeetingsGeneralInfo } from './../interfaces/councilMeetingGeneralInfo.interface';
import { CouncilMeetings } from './../interfaces/councilMeeting.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Token } from '../interfaces/token.interface';
import { Event } from '../interfaces/event.interface';
import { News } from '../interfaces/news.interface';
import { Alert } from '../interfaces/alert.interface';
import { Settings } from '../interfaces/settings.interface';
import { Place } from '../interfaces/place.interface';
import { Contact } from '../interfaces/contact.interface';
import { Author } from '../interfaces/author.interface';
import { Post } from '../interfaces/post.interface';
import { SetupData } from '../interfaces/setup.interface';
import { Service } from '../interfaces/service.interface';
import { Group } from '../interfaces/group.interface';
import { Department } from '../interfaces/department.interface';
import { environment } from '../../environments/environment';
import { Page } from '../interfaces/page.interface';
import { Menu } from '../interfaces/menu.interface';
import { Highlight } from '../interfaces/highlight.interface';
import { of } from 'rxjs';
import { Job } from '../interfaces/job.interface';
import { JobGeneralInfo } from '../interfaces/jobGeneralInfo.interface';
import { TenantStoreService } from './tenant-store.service';
import { isEmpty } from 'lodash-es';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: Token;
  settings: Settings;

  constructor(private http: HttpClient, private tenant: TenantStoreService) {
    // const tenant = this.route.paramMap.get('city');
    // const tenant = this.route.params.subscribe(params => console.log(params));
    // console.log(`tenant: ${tenant}`);
  }

  isValidToken(): boolean {
    return !isEmpty(this.token);
  }

  getToken(): Observable<Token> {
    return this.http.get<Token>(`${apiUrl}/token`).pipe(
      map((tokenRes: Token) => {
        if (tokenRes && tokenRes.access_token) {
          tokenRes.expires_in += Math.round(new Date().valueOf() / 1000);
          this.token = tokenRes;
        }
        return tokenRes;
      })
    );
  }

  getEvents(cityName: string): Observable<Event[]> { 
    return this.http
      .get<Event[]>(`${apiUrl}/city/${cityName}/events`)
      .pipe(
        catchError(err => {
          console.log('error while getEvents');
          return of([]);
        })
      );
  }

  getNews(cityName: string): Observable<News[]> {
    return this.http
      .get<News[]>(`${apiUrl}/city/${cityName}/news`)
      .pipe(
        catchError(err => {
          console.log('error while getNews');
          return of([]);
        })
      );
  }

  getAlerts(cityName: string): Observable<Alert[]> {
    return this.http
      .get<Alert[]>(`${apiUrl}/city/${cityName}/realtime-alerts`)
      .pipe(
        catchError(err => {
          console.log('error while getAlerts');
          return of([]);
        })
      );
  }

  getSettings(cityName: string): Observable<Settings> {
    return this.http
      .get<Settings>(`${apiUrl}/city/${cityName}/profile`)
      .pipe(
        catchError(err => {
          console.log('error while getSettings');
          return of(null);
        })
      );
  }

  getPlaces(cityName: string): Observable<Place[]> {
    return this.http
      .get<Place[]>(`${apiUrl}/city/${cityName}/places`)
      .pipe(
        catchError(err => {
          console.log('error while getPlaces');
          return of([]);
        })
      );
  }

  getContacts(cityName: string): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(`${apiUrl}/city/${cityName}/contacts`)
      .pipe(
        catchError(err => {
          console.log('error while getContacts');
          return of([]);
        })
      );
  }

  getAuthors(cityName: string): Observable<Author[]> {
    return this.http
      .get<Author[]>(`${apiUrl}/city/${cityName}/authors`)
      .pipe(
        catchError(err => {
          console.log('error while getAuthors');
          return of([]);
        })
      );
  }

  getDepartments(cityName: string): Observable<Department[]> {
    return this.http
      .get<Department[]>(`${apiUrl}/city/${cityName}/departments`)
      .pipe(
        catchError(err => {
          console.log('error while getDepartments');
          return of([]);
        })
      );
  }

  getAllPosts(cityName: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${apiUrl}/city/${cityName}/posts`)
      .pipe(
        catchError(err => {
          console.log('error while getAllPosts');
          return of([]);
        })
      );
  }

  getPostsByAuthor(cityName: string, postId: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `${apiUrl}/city/${cityName}/author/${postId}/posts`
      )
      .pipe(
        catchError(err => {
          console.log('error while getPostsByAuthor');
          return of([]);
        })
      );
  }

  getSetupData(): Observable<SetupData[]> {
    return this.http.get<SetupData[]>(`${apiUrl}/setup-data`).pipe(
      catchError(err => {
        console.log('error while getSetupData');
        return of([]);
      })
    );
  }

  getAllServices(cityName: string): Observable<Service[]> {
    return this.http
      .get<Service[]>(`${apiUrl}/city/${cityName}/online-services`)
      .pipe(
        catchError(err => {
          console.log('error while getAllServices');
          return of([]);
        })
      );
  }

  getServiceGroups(cityName: string): Observable<Group[]> {
    return this.http
      .get<Group[]>(
        `${apiUrl}/city/${cityName}/online-service-groups`
      )
      .pipe(
        catchError(err => {
          console.log('error while getServiceGroups');
          return of([]);
        })
      );
  }

  getPages(cityName: string): Observable<Page[]> {
    return this.http
      .get<Page[]>(`${apiUrl}/city/${cityName}/pages`)
      .pipe(
        catchError(err => {
          console.log('error while getPages');
          return of([]);
        })
      );
  }

  getMenu(cityName: string): Observable<Menu[]> {
    return this.http
      .get<Menu[]>(`${apiUrl}/city/${cityName}/menus`)
      .pipe(
        catchError(err => {
          console.log('error while getMenu');
          return of([]);
        })
      );
  }

  getHighlights(cityName: string): Observable<Highlight[]> {
      return this.http
        .get<Highlight[]>(`${apiUrl}/city/${cityName}/highlights`)
        .pipe(
          catchError(err => {
            console.log('error while getHighlights');
            return of([]);
          })
        );
  }

  getCouncilMeetings(cityName: string): Observable<CouncilMeetings[]> {
    return this.http
      .get<CouncilMeetings[]>(
        `${apiUrl}/city/${cityName}/council-meetings`
      )
      .pipe(
        catchError(err => {
          console.log('error while getCouncilMeetings');
          return of([]);
        })
      );
  }

  getCouncilMeetingsGeneralInfo(
    cityName: string
  ): Observable<CouncilMeetingsGeneralInfo[]> {
    return this.http
      .get<CouncilMeetingsGeneralInfo[]>(
        `${apiUrl}/city/${cityName}/council-meeting-general-info`
      )
      .pipe(
        catchError(err => {
          console.log('error while getCouncilMeetingsGeneralInfo');
          return of([]);
        })
      );
  }

  getJobs(cityName: string): Observable<Job[]> {
      return this.http
        .get<Job[]>(`${apiUrl}/city/${cityName}/jobs`)
        .pipe(
          catchError(err => {
            console.log(err);
            console.log('error while getJobs');
            return of([]);
          })
        );
  }

  getJobGeneralInfo(
    cityName: string
  ): Observable<CouncilMeetingsGeneralInfo[]> {
      return this.http
        .get<JobGeneralInfo[]>(
          `${apiUrl}/city/${cityName}/job-general-info`
        )
        .pipe(
          catchError(err => {
            console.log('error while getJobGeneralInfo');
            return of([]);
          })
        );
  }
}
