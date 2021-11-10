import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Event } from '../../../../interfaces/event.interface';
import { EventsStoreService } from 'src/app/services/events-store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  // event: Event;
  event$: Observable<Event>
  tooltipContent: string;
  isOver = false;
  // startDay: string;
  startTimeString: string;
  endTimeString: string;
  displayDate: string;
  constructor(private datePipe: DatePipe, private route: ActivatedRoute, private router: Router, private events: EventsStoreService) {
    const id = this.route.snapshot.paramMap.get('id');
    // let events = this.route.snapshot.data['events'];
    // this.event = find(events, ['id', id]);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.event$ = this.events.getItemById(id).pipe(
      map((event) => {
        if (event.link.split('https://')[1] === undefined) {
          event.link = 'https://' + event.link;
        }
        const startTime = new Date(event.startDate);
        const endTime = new Date(event.endDate);
        // this.startDay =  this.datePipe.transform(startTime, "fullDate");
        const startDayString = this.datePipe.transform(startTime, 'MMMM d');
        const endDayString = this.datePipe.transform(endTime, 'MMMM d');
        this.startTimeString = this.datePipe.transform(startTime, 'shortTime');
        this.endTimeString = this.datePipe.transform(endTime, 'shortTime');
        if (startDayString !== endDayString) {
          this.startTimeString = `${startDayString}, ${this.startTimeString}`;
          this.endTimeString = `${endDayString}, ${this.endTimeString}`;
          this.displayDate = `${this.startTimeString} - ${this.endTimeString}`;
        } else {
          this.displayDate = `${startDayString}, ${this.startTimeString} - ${this.endTimeString}`;
        }
        return event;
      })
    );

  }

  ngOnInit() {
    // if(this.event.link.split('https://')[1] == undefined) {
    //     this.event.link = 'https://' + this.event.link;
    //   }
    // const startTime = new Date(this.event.startDate);
    // const endTime = new Date(this.event.endDate);

    // // this.startDay =  this.datePipe.transform(startTime, "fullDate");
    // const startDayString =  this.datePipe.transform(startTime, 'MMMM d');
    // const endDayString =  this.datePipe.transform(endTime, 'MMMM d');
    // this.startTimeString =  this.datePipe.transform(startTime, 'shortTime');
    // this.endTimeString =  this.datePipe.transform(endTime, 'shortTime');

    // if (startDayString != endDayString) {
    //   this.startTimeString = `${startDayString}, ${this.startTimeString}`;
    //   this.endTimeString = `${endDayString}, ${this.endTimeString}`;
    //   this.displayDate = `${this.startTimeString} - ${this.endTimeString}`;
    // }else {
    //   this.displayDate = `${startDayString}, ${this.startTimeString} - ${this.endTimeString}`;
    // }
  }
}
