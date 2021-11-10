import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'lodash-es';
import { Settings } from '../../interfaces/settings.interface';
import { ApiService } from 'src/app/services/api.service';
import { EventsStoreService } from 'src/app/services/events-store.service';
import { NewsStoreService } from 'src/app/services/news-store.service';
import { AlertsStoreService } from 'src/app/services/alerts-store.service';
import { HighlightsStoreService } from 'src/app/services/highlights-store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  settings: Settings;
  // siderbarEvents: Event[] = [];
  siderbarEvents$ = this.events.sortedData$;
  // news: News[] = [];
  news$ = this.news.sortedData$;
  // alerts: Alert[] = [];
  featureImgs: any = [];
  // highlights: Highlights[] = [];
  highlights$ = this.highlights.data$;
  isValidCity: boolean = true;

  //For card slider
  eventsCount: number;
  snFStart: number;
  snFEnd: number;
  snSStart: number;
  snSEnd: number;
  tenant: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private events: EventsStoreService,
    private news: NewsStoreService,
    private highlights: HighlightsStoreService,
  ) {
    this.settings = this.route.snapshot.data['settings'] || [];
    this.tenant = this.settings.viewShortName;
    // this.siderbarEvents = this.route.snapshot.data['events'] || [];
    // this.news = this.route.snapshot.data['news'] || [];
    // this.alerts = this.route.snapshot.data['alerts'] || [];
    // this.highlights = this.route.snapshot.data['highlights'] || [];

    this.isValidCity = !isEmpty(this.settings);

    // this.news.sort((a, b) => {
    //   let dateA = new Date(a.date);
    //   let dateB = new Date(b.date);

    //   return dateB.getTime() - dateA.getTime();
    // })
    if (!isEmpty(this.settings)) {
      this.featureImgs = this.settings.featureImgs;
    }
  }

  ngOnInit() {

    this.siderbarEvents$.subscribe(result => {this.eventsCount = result.length;});
    if(window.innerWidth > 800) {
      this.snFStart = 0;
      this.snFEnd = 3;
      this.snSStart = 3;
      this.snSEnd = 7;
    }else {
      this.snFStart = 0;
      this.snFEnd = 1;
      this.snSStart = 1;
      this.snSEnd = 3;
    }
  }
  onSliderTotal() {
    if (this.snSEnd < this.eventsCount) {
      this.snFStart += 1;
      this.snFEnd += 1;
      this.snSStart += 1;
      this.snSEnd += 1;
    }
  }
  onSlider() {
    if (this.snSEnd < this.eventsCount) {
      this.snSStart += 1;
      this.snSEnd += 1;
    }
  }
}
