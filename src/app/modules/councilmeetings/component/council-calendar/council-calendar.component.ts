import { Component, OnInit, Input, Output, ChangeDetectionStrategy, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { findIndex, slice } from 'lodash-es';
import { Meetings } from 'src/app/interfaces/meetings.interface';


@Component({
  selector: 'council-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './council-calendar.component.html',
  styleUrls: ['./council-calendar.component.scss']
})
export class CouncilCalendarComponent implements OnInit {

  @Input()
  data = [{
    id: '123123123',
    meetingDate: '2019-11-03T00:00:55.000Z',
    details: ''
  },
  {
    id: '1223423423',
    meetingDate: '2019-11-11T00:00:55.000Z',
    details: ''
  },
  {
    id: '122342123',
    meetingDate: '2019-11-17T00:00:55.000Z',
    details: ''
  },
  {
    id: '1231234223',
    meetingDate: '2019-11-24T00:00:55.000Z',
    details: ''
  },
  {
    id: '1223423123',
    meetingDate: '2019-11-30T00:00:55.000Z',
    details: ''
  },
  {
    id: '1223423123',
    meetingDate: '2019-12-03T00:00:55.000Z',
    details: ''
  },
  {
    id: '1223423123',
    meetingDate: '2019-10-25T00:00:55.000Z',
    details: ''
  }
];
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();
  meetings: CalendarEvent[] = [];

  @Output()
  valueChange = new EventEmitter();

  selectedDays = [];
  city: string;

  constructor(private modal: NgbModal, private route: ActivatedRoute) {
    this.city = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit() {
    this.data.forEach((event) => {
      let temp: CalendarEvent = {
        start: new Date(event.meetingDate),
        end: new Date(event.meetingDate),
        title: event.details,
        allDay: true
      };
      this.meetings.push(temp);
    });
  }

  dayClicked(day: any): void {
    if (day.meetings.length == 0) {
      alert('No meetings are happening on the selected date.');
    }
  }

  isSelected(day) {
    if (findIndex(this.selectedDays, {'date': day.date}) >= 0) {
      return true;
    }

    return false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

}
