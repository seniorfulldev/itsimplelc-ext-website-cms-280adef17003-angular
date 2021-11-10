import { JobGeneralInfoResolver } from './../resolves/jobGeneralInfo.resolve';
import { JobResolver } from './../resolves/job.resolve';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { PlacesComponent } from './places/places.component';
import { NewsComponent } from './news/news.component';
import { DirectoryComponent } from './directory/directory.component';
import { NewsDetailComponent } from './news/sub-pages/details/news-detail.component';
import { CouncilComponent } from './council/council.component';
import { AuthorComponent } from './council/sub-pages/author/author.component';
import { ReportsComponent } from './reports/reports.component';
import { ServicesComponent } from './services/services.component';
import { EventsFilterComponent } from './events/sub-pages/filter/events-filter.component';
import { EventDetailComponent } from './events/sub-pages/details/event-detail.component';
import { PopularComponent } from './popular/popular.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SubdepartComponent } from './departments/subdepart/subdepart.component';

import { PlacesResolver } from '../resolves/places.resolve';
import { ContactsResolver } from '../resolves/contacts.resolve';
import { AuthorsResolver } from '../resolves/authors.resolve';
import { PostsResolver } from '../resolves/posts.resolve';
import { AuthorPostsResolver } from '../resolves/author-posts.resolve';
import { DepartmentsResolver } from '../resolves/departments.resolve';
import { SettingsResolver } from '../resolves/settings.resolve';
import { AboutComponent } from './about/about.component';
import { CouncilmeetingsComponent } from './councilmeetings/councilmeetings.component';
import { NewsletterSignupPageComponent } from './newsletter-signup-page/newsletter-signup-page.component';
import { BoardsCommissionsComponent } from './boards-commissions/boards-commissions.component';
import { PostDetailComponent } from './council/sub-pages/author/post-detail/post-detail.component';
// import { PoliceComponent } from './police/police.component';
import { CareerComponent } from './career/career.component';
import { PagesComponent } from './pages/pages.component';
import { PagesResolver } from '../resolves/pages.resolve';
import { CouncilMeetingResolver } from '../resolves/councilMeeting.resolve';
import { CouncilMeetingGeneralInfoResolver } from '../resolves/councilMeetingGeneralInfo.resolve';
import { PlaceDetailComponent } from './places/details/place-detail.component';
import { CareerDetailComponent } from './career/component/career.detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/filter', component: EventsFilterComponent },
  { path: 'events/filter/:id', component: EventDetailComponent },
  { path: 'events/:id', component: EventDetailComponent },
  {
    path: 'places',
    component: PlacesComponent,
  },
  { path: 'places/:id', component: PlaceDetailComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  {
    path: 'directory',
    component: DirectoryComponent,
  },
  {
    path: 'council',
    component: CouncilComponent,
    resolve: { authors: AuthorsResolver, posts: PostsResolver }
  },
  {
    path: 'council/:id',
    component: AuthorComponent,
    resolve: { authors: AuthorsResolver, posts: AuthorPostsResolver }
  },
  {
    path: 'council/posts/:id',
    component: PostDetailComponent,
    resolve: { authors: AuthorsResolver, posts: PostsResolver }
  },
  {
    path: 'council/:councilId/posts/:id',
    component: PostDetailComponent,
    resolve: { authors: AuthorsResolver, posts: PostsResolver }
  },
  {
    path: 'reports',
    component: ReportsComponent,
    resolve: { setting: SettingsResolver }
  },
  { path: 'services', component: ServicesComponent },
  { path: 'popular', component: PopularComponent },
  {
    path: 'departments',
    component: DepartmentsComponent,
    resolve: { departments: DepartmentsResolver }
  },
  // { path: 'search', component: PoliceComponent },
  { path: 'departments/:id', component: SubdepartComponent },
  {
    path: 'about',
    component: AboutComponent,
    resolve: { setting: SettingsResolver }
  },
  {
    path: 'councilmeetings',
    component: CouncilmeetingsComponent,
    resolve: {
      councilMeetings: CouncilMeetingResolver,
      councilMeetingsGeneralInfo: CouncilMeetingGeneralInfoResolver
    }
  },
  { path: 'newsletter-signup-page', component: NewsletterSignupPageComponent },
  { path: 'boards-commissions', component: BoardsCommissionsComponent },
  {
    path: 'career',
    component: CareerComponent,
    // resolve: { jobs: JobResolver, jobGeneralInfo: JobGeneralInfoResolver }
  },
  { path: 'career/:id',
    component: CareerDetailComponent,
    // resolve: { jobs: JobResolver, jobGeneralInfo: JobGeneralInfoResolver }
  },
  {
    path: 'departments/:id/pages/:pageid',
    component: PagesComponent,
    // resolve: { pages: PagesResolver }
  },
  {
    path: 'pages/:pageid',
    component: PagesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    PlacesResolver,
    ContactsResolver,
    AuthorsResolver,
    PostsResolver,
    AuthorPostsResolver,
    DepartmentsResolver,
    PagesResolver,
    CouncilMeetingResolver,
    CouncilMeetingGeneralInfoResolver,
    JobResolver,
    JobGeneralInfoResolver,
  ],
})
export class IndexRoutingModule {}
