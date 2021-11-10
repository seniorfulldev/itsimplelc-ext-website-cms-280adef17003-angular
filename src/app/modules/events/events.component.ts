import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { EventsStoreService } from 'src/app/services/events-store.service';
import { TenantStoreService } from 'src/app/services/tenant-store.service';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventsList: Event[] = [];
  events$ = this.events.sortedData$;
  featureEventImgs$ = this.tenant.data$.pipe(
    map(tenant => {
    return tenant?.settings?.featureEventImgs || []
  }));
  disabled: boolean = false;
  clicked: boolean = false;

  constructor(private tenant: TenantStoreService, private events: EventsStoreService) {
  }

  navSlideConfig = {
    arrows: true,
    variableWidth: false,
    adaptiveHeight: false,
    infinite: false,
    swipeToSlide: true,
    edgeFriction: 0,
    slidesToShow: 4,
    prevArrow: '<img class="slick-prev" src="assets/images/left-btn.svg"/>',
    nextArrow: '<img class="slick-next" src="assets/images/right-btn.svg"/>',
  };

  ngOnInit() {
  }
  slickInit(e) {
  }
  
  breakpoint(e) {
  }
  
  afterChange(e) {
    this.clicked = false;
    this.disabled = false;
  }
  
  beforeChange(e) {
    this.clicked = false;
    this.disabled = false;
  }

  isDisabled() {
    return this.disabled;
  }

  onMouseDown(event) {
    this.clicked = true;
  }

  onMouseUp(event) {
    this.clicked = false;
    this.disabled = false;
  }

  onMouseMove(event) {
    if (!this.clicked) {
      this.disabled = false;
    }

    if (this.clicked && !this.disabled) {
      this.disabled = true;
    }
  }
}
