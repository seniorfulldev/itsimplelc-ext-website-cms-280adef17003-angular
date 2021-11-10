import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbPopoverModule, NgbModule, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { IndexRoutingModule } from './index-routing.module';

import { HeroSliderComponent } from './home/components/hero-slider/hero-slider.component';
import { CardComponent } from './events/components/card/card.component';
import { CalendarComponent } from './events/components/calendar/calendar.component';
import { EventsFilterComponent } from './events/sub-pages/filter/events-filter.component';
import { EventsSliderComponent } from './events/components/events-slider/events-slider.component';
import { EventDetailComponent } from './events/sub-pages/details/event-detail.component';
import { PlaceCardComponent } from './places/components/place-card/place-card.component';
import { NewsCardComponent } from './news/components/news-card/news-card.component';
import { NewsDetailComponent } from './news/sub-pages/details/news-detail.component';
import { CouncilSliderComponent } from './council/components/council-slider/council-slider.component';
import { CouncilCardComponent } from './council/components/council-card/council-card.component';
import { AuthorComponent } from './council/sub-pages/author/author.component';
import { AuthorCardComponent } from './council/components/author-card/author-card.component';

import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { PlacesComponent } from './places/places.component';
import { NewsComponent } from './news/news.component';
import { DirectoryComponent } from './directory/directory.component';
import { CouncilComponent } from './council/council.component';
import { ReportsComponent } from './reports/reports.component';
import { ServicesComponent } from './services/services.component';
import { PopularComponent } from './popular/popular.component';
import { DepartmentsComponent } from './departments/departments.component';
import { IndexComponent } from './index.component';

import { AboutComponent } from './about/about.component';
import { DescriptionCardComponent } from './about/component/description-card/description-card.component';
import { SubdepartComponent } from './departments/subdepart/subdepart.component';
import { CouncilmeetingsComponent } from './councilmeetings/councilmeetings.component';
import { FolderComponent } from './councilmeetings/component/folder/folder.component';
import { CouncilCalendarComponent } from './councilmeetings/component/council-calendar/council-calendar.component';
import { NewsletterSignupPageComponent } from './newsletter-signup-page/newsletter-signup-page.component';
import { SafePipe } from '../pipe/safe.pipe';
import { BoardsCommissionsComponent } from './boards-commissions/boards-commissions.component';
import { PostDetailComponent } from './council/sub-pages/author/post-detail/post-detail.component';
import { NewscardComponent } from './home/components/newscard/newscard.component';
import { PoliceComponent } from './police/police.component';
import { CareerComponent } from './career/career.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgbdDatepickerPopup } from './councilmeetings/datepicker-popup';
import { NgbDateFRParserFormatter } from './councilmeetings/ngb-date-fr-parser-formatter';
import { NgbUTCStringAdapter } from './councilmeetings/ngb-UTC-string-adapter';
import { PagesComponent } from './pages/pages.component';
import { PlaceDetailComponent } from './places/details/place-detail.component';
import { CareerDetailComponent } from './career/component/career.detail.component';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
// import { NgbDateFRParserFormatter } from './councilmeetings/ngb-date-fr-parser-formatter';
// import { NgbUTCStringAdapter } from './councilmeetings/ngb-UTC-string-adapter';


@NgModule({
  declarations: [
    HeroSliderComponent,
    HomeComponent,
    EventsComponent,
    IndexComponent,
    CardComponent,
    EventsSliderComponent,
    EventsFilterComponent,
    EventDetailComponent,
    CalendarComponent,
    PlacesComponent,
    PlaceDetailComponent,
    PlaceCardComponent,
    NewsComponent,
    NewsCardComponent,
    DirectoryComponent,
    NewsDetailComponent,
    CouncilComponent,
    CouncilSliderComponent,
    CouncilCardComponent,
    AuthorComponent,
    AuthorCardComponent,
    ReportsComponent,
    ServicesComponent,
    PopularComponent,
    DepartmentsComponent,
    AboutComponent,
    DescriptionCardComponent,
    SubdepartComponent,
    CouncilmeetingsComponent,
    FolderComponent,
    CouncilCalendarComponent,
    NewsletterSignupPageComponent,
    SafePipe,
    BoardsCommissionsComponent,
    PostDetailComponent,
    NewscardComponent,
    PoliceComponent,
    CareerComponent,
    NgbdDatepickerPopup,
    PagesComponent,
    CareerDetailComponent,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    CommonModule,
    IndexRoutingModule,
    SharedModule,
    CoreModule,
    SlickCarouselModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    // AgmCoreModule.forRoot({
    // }),
    NgbPopoverModule,
    MatRadioModule,
    MatSelectModule,
    NgbModule
  ],
  providers: [
    DatePipe,
    {
      provide: NgbDateParserFormatter,
      useClass: NgbDateFRParserFormatter
    },
    {
        provide: NgbDateAdapter,
        useClass: NgbUTCStringAdapter
    },
  ]
})
export class IndexModule { }
