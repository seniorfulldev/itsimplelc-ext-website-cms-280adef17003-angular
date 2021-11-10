import { Component, OnInit, Input } from '@angular/core';
import { find, findIndex } from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventsStoreService } from 'src/app/services/events-store.service';
import { Event } from '../../../../interfaces/event.interface';

@Component({
  selector: 'events-filter',
  templateUrl: './events-filter.component.html',
  styleUrls: ['./events-filter.component.scss']
})
export class EventsFilterComponent implements OnInit {
  events: Event[] = [];
  result: Event[] = [];
  sub: Observable<any>;

  constructor(private eventsStore: EventsStoreService) {
    this.sub = this.eventsStore.sortedData$.pipe(
      tap((events) => {
        this.events = events;
        this.result = [...events];
      })
    );
  }

  ngOnInit() {
  }

  onValueChange(event) {
    let res = [];

    this.events.forEach((e) => {
      event.forEach((eve) => {
        let startDate = new Date(e.startDate);
        let endDate = new Date(e.endDate);

        let startDay = new Date(startDate.getFullYear() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getDate());
        let endDay = new Date(endDate.getFullYear() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getDate());

        if (startDay <= eve.date && eve.date <= endDay && !find(res, {'startDate': e.startDate})) {
          res.push(e);
        }
      });
    });

    if (res.length == 0) {
      res = this.events;
    }
    
    this.result = res;
  }

  onSearch(value) {
    if (value) {
      this.result = [];
      this.events.forEach((index: Event) => {
        if (index.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 || index.details.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          this.result.push(index);
        }
      });
    } else {
      this.result = this.events;
    }
  }
  isVisible(event) {
    return findIndex(this.result, event) >= 0;
  }
  isNone(event) {
    if(findIndex(this.result, event) >= 0){
      return false;
    }else{
      return true;
    }
  }
}
