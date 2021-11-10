import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../../../../interfaces/event.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [DatePipe]
})

export class EventComponent implements OnInit {
  @Input()
  siderbarEvents: Event[] = [];
  // todayEvents: Event[] = [];
  disptodayEvents: Event[] = [];
  // today = new Date();

  constructor(private datePipe: DatePipe) { }

  slideConfig = {slidesToShow: 1, slidesToScroll: 1, arrows: false};

  ngOnInit() {
    // this.siderbarEvents.forEach(event => {
    //   if(event.startDate.split('T')[0] == this.datePipe.transform(this.today, 'yyyy-MM-dd')){
    //     this.todayEvents.push(event);
    //   }
    // })
    this.siderbarEvents.sort((a, b) => {
      let dateA = new Date(a.startDate);
      let dateB = new Date(b.startDate);
      return dateA.getTime() - dateB.getTime();
    });
    for(let i=0; i<3; i++){
      if(this.siderbarEvents[i]){
        this.disptodayEvents.push(this.siderbarEvents[i]);
      }
    }
  }
}
