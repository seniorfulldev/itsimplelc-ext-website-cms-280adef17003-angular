import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Event } from '../../../../interfaces/event.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  background: string;
  @Input()
  title: string;
  @Input()
  popup: boolean = true;
  @Input()
  event: Event;

  isOver: boolean = false;
  startDay: string;
  startdate: string;
  startTimeString: string;
  endTimeString: string;
  displayDate: string;
  city: string;
  addressMapString: string;

  constructor(private datePipe: DatePipe, private route: ActivatedRoute) {
    this.city = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit() {
    if (this.popup) {
      if (this.event.link.split('https://')[1] == undefined) {
        this.event.link = 'https://' + this.event.link;
      }
      let startTime = new Date(this.event.startDate);
      let endTime = new Date(this.event.endDate);
      this.startdate = this.datePipe.transform(startTime, 'fullDate');

      // this.startDay =  this.datePipe.transform(startTime, "fullDate");
      let startDayString = this.datePipe.transform(startTime, 'MMMM d');
      let endDayString = this.datePipe.transform(endTime, 'MMMM d');
      this.startTimeString = this.datePipe.transform(startTime, 'shortTime');
      this.endTimeString = this.datePipe.transform(endTime, 'shortTime');

      if (startDayString != endDayString) {
        this.startTimeString = `${startDayString}, ${this.startTimeString}`;
        this.endTimeString = `${endDayString}, ${this.endTimeString}`;
        this.displayDate = `${this.startTimeString} - ${this.endTimeString}`;
      } else {
        this.displayDate = `${startDayString}, ${this.startTimeString} - ${this.endTimeString}`;
      } // build google map string based on the address
      const addressArr = this.event.placeAddress.split(', ');
      addressArr[0] = addressArr[0].replace(/\s/g, '+');
      addressArr[1] = '+,' + addressArr[1];
      addressArr[2] = '+,' + addressArr[2];
      addressArr[3] = '+,' + addressArr[3] + '/';
      this.addressMapString =
        'https://www.google.com/maps/place/' + addressArr.join();
    }
  }
  onOpenPhoneDialer(phone) {
    window.open('tel:' + phone);
  }
}
