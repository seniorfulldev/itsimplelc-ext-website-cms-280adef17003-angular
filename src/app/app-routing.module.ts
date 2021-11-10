import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { AuthGuard } from './guards/auth.guard';

import { IndexComponent } from './modules/index.component';

import { SettingsResolver } from './resolves/settings.resolve';
import { EventsResolver } from './resolves/events.resolve';
import { NewsResolver } from './resolves/news.resolve';
import { AlertsResolver } from './resolves/alerts.resolve';
import { ServiceGroupsResolver } from './resolves/group.resolve';
import { ServicesResolver } from './resolves/services.resolve';
import { DepartmentsResolver } from './resolves/departments.resolve';
import { PagesResolver } from './resolves/pages.resolve';
import { MenuResolver } from './resolves/menu.resolve';
import { HighlightsResolver } from './resolves/highlights.resolve';
import { PlacesResolver } from './resolves/places.resolve';
import { JobsResolver } from './resolves/jobs.resolve';
import { PrintComponent } from './modules/print/print.component';
import { CouncilMeetingResolver } from './resolves/councilMeeting.resolve';
import { environment } from 'src/environments/environment';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const tenantName = environment?.initTenant;

const routes: Routes = [
  {
    path: tenantName ? '' : ':city',
    component: IndexComponent,
    canActivate: [AuthGuard],
    resolve: {
      // events: EventsResolver,
      // news: NewsResolver,
      // alerts: AlertsResolver,
      settings: SettingsResolver,
      // groups: ServiceGroupsResolver,
      // services: ServicesResolver,
      // departments: DepartmentsResolver,
      pages: PagesResolver,
      menu: MenuResolver,
      // highlights: HighlightsResolver,
      // places: PlacesResolver,
      // jobs: JobsResolver
    },
    children: [
      {
        path: '',
        loadChildren: './modules/index.module#IndexModule',
      },
      {
        path: 'print/:id',
        loadChildren: './modules/print/print.module#PrintModule',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    EventsResolver,
    NewsResolver,
    AlertsResolver,
    SettingsResolver,
    ServiceGroupsResolver,
    ServicesResolver,
    DepartmentsResolver,
    PagesResolver,
    MenuResolver,
    HighlightsResolver,
    PlacesResolver,
    JobsResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
