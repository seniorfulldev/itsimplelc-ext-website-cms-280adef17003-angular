import { CouncilMeetingsGeneralInfo } from './../interfaces/councilMeetingGeneralInfo.interface';
import { CouncilMeetings } from './../interfaces/councilMeeting.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { isEmpty } from 'lodash-es';

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

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiTenantService {
  token: Token;
  settings: Settings;

  get tenant$(): Observable<string> {
      return this.tenantStore.data$.pipe(
          map(tenant => 
              tenant.name,
          ),
          take(1),
      )
  }

  constructor(private http: HttpClient, private tenantStore: TenantStoreService) {}

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

  getEvents(): Observable<Event[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Event[]>(`${apiUrl}/city/${tenant}/events`);
      }),
      catchError((err) => {
        console.log('error while getEvents');
        return of([]);
      })
    );
  }

  getNews(): Observable<News[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<News[]>(`${apiUrl}/city/${tenant}/news`);
      }),
      catchError((err) => {
        console.log('error while getNews');
        return of([]);
      })
    );
  }

  getAlerts(): Observable<Alert[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Alert[]>(
          `${apiUrl}/city/${tenant}/realtime-alerts`
        );
      }),
      catchError((err) => {
        console.log('error while getNews');
        return of([]);
      })
    );
  }

  getSettings(): Observable<Settings> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Settings>(
          `${apiUrl}/city/${tenant}/profile`
        );
      }),
      catchError((err) => {
        console.log('error while getNews');
        return of(null);
      })
    );
  }

  getPlaces(): Observable<Place[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Place[]>(`${apiUrl}/city/${tenant}/places`);
      }),
      catchError((err) => {
        console.log('error while getNews');
        return of([]);
      })
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Contact[]>(
          `${apiUrl}/city/${tenant}/contacts`
        );
      }),
      catchError((err) => {
        console.log('error while getNews');
        return of([]);
      })
    );
  }

  getAuthors(): Observable<Author[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Author[]>(
          `${apiUrl}/city/${tenant}/authors`
        );
      }),
      catchError((err) => {
        console.log('error while getNews');
        return of([]);
      })
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Department[]>(
          `${apiUrl}/city/${tenant}/departments`
        );
      }),
      catchError((err) => {
        console.log('error while getDepartments');
        return of([]);
      })
    );
  }

  getAllPosts(): Observable<Post[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Post[]>(`${apiUrl}/city/${tenant}/posts`);
      }),
      catchError((err) => {
        console.log('error while getAllPosts');
        return of([]);
      })
    );
  }

  getPostsByAuthor(postId: string): Observable<Post[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Post[]>(
          `${apiUrl}/city/${tenant}/author/${postId}/posts`
        );
      }),
      catchError((err) => {
        console.log('error while getPostsByAuthor');
        return of([]);
      })
    );
  }

  getSetupData(): Observable<SetupData[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<SetupData[]>(`${apiUrl}/setup-data`).pipe(
          catchError((err) => {
            console.log('error while getSetupData');
            return of([]);
          })
        );
      })
    );
  }

  getAllServices(): Observable<Service[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Service[]>(
          `${apiUrl}/city/${tenant}/online-services`
        );
      }),
      catchError((err) => {
        console.log('error while getAllServices');
        return of([]);
      })
    );
  }

  getServiceGroups(): Observable<Group[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Group[]>(
          `${apiUrl}/city/${tenant}/online-service-groups`
        );
      }),
      catchError((err) => {
        console.log('error while getServiceGroups');
        return of([]);
      })
    );
  }

  getPages(): Observable<Page[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Page[]>(`${apiUrl}/city/${tenant}/pages`);
      }),
      catchError((err) => {
        console.log('error while getPages');
        return of([]);
      })
    );
  }

  getMenu(): Observable<Menu[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Menu[]>(`${apiUrl}/city/${tenant}/menus`);
      }),
      catchError((err) => {
        console.log('error while getMenu');
        return of([]);
      })
    );
  }

  getHighlights(): Observable<Highlight[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Highlight[]>(
          `${apiUrl}/city/${tenant}/highlights`
        );
      }),
      catchError((err) => {
        console.log('error while getHighlights');
        return of([]);
      })
    );
  }

  getCouncilMeetings(): Observable<CouncilMeetings[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<CouncilMeetings[]>(
          `${apiUrl}/city/${tenant}/council-meetings`
        );
      }),
      catchError((err) => {
        console.log('error while getCouncilMeetings');
        return of([]);
      })
    );
  }

  getCouncilMeetingsGeneralInfo(): Observable<CouncilMeetingsGeneralInfo[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<CouncilMeetingsGeneralInfo[]>(
          `${apiUrl}/city/${tenant}/council-meeting-general-info`
        );
      }),
      catchError((err) => {
        console.log('error while getCouncilMeetingsGeneralInfo');
        return of([]);
      })
    );
  }

  getJobs(): Observable<Job[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<Job[]>(`${apiUrl}/city/${tenant}/jobs`);
      }),
      catchError((err) => {
        console.log(err);
        console.log('error while getJobs');
        return of([]);
      })
    );
  }

  getJobGeneralInfo(): Observable<CouncilMeetingsGeneralInfo[]> {
    return this.tenant$.pipe(
      switchMap((tenant) => {
        return this.http.get<JobGeneralInfo[]>(
          `${apiUrl}/city/${tenant}/job-general-info`
        );
      }),
      catchError((err) => {
        console.log('error while getJobGeneralInfo');
        return of([]);
      })
    );
  }
}
