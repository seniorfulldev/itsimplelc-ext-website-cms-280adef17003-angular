import { Component, OnInit, Input, Output, ChangeDetectionStrategy, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { findIndex, slice } from 'lodash-es';


import { Event } from '../../../../interfaces/event.interface';

const colors: any = {
  white: {
    primary: '#ffff00',
    secondary: '#000'
  }
};


@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
}) 
export class CalendarComponent implements OnInit {

  @Input()
  data: Event[];

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  @Output()
  valueChange = new EventEmitter();
  @Output()
  searchValue = new EventEmitter();

  selectedDays = [];
  city: string;

  constructor(private modal: NgbModal, private route: ActivatedRoute) {
    this.city = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit() {
    this.data.forEach((event) => {
      let temp: CalendarEvent = {
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        title: event.name,
        color: colors.white,
        allDay: true
      };

      this.events.push(temp);
    });
  }

  dayClicked(day: any): void {
    if (day.events.length == 0) {
      alert("No events are happening on the selected date.");
    }

    let selected = findIndex(this.selectedDays, {'date': day.date});

    if (selected >= 0) {
      this.selectedDays.splice(selected, 1);
      this.onFilter('filter');
    } else {
      if (day.events.length > 0) {
        this.selectedDays.push({'date': day.date});
        this.onFilter('filter');
      }
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

  onClear(event) {
    this.selectedDays = [];
    this.valueChange.emit(this.selectedDays);
  }

  onFilter(event) {
    console.log(this.selectedDays);
    this.valueChange.emit(this.selectedDays);
  }

  onSearch(e) {
    this.searchValue.emit(e);
  }

  onMouseEnter(e) {
    e.target.parentElement.parentElement.style.backgroundColor = '#c4c4c4';
  }
  onMouseLeave(e) {
    e.target.parentElement.parentElement.style.backgroundColor = '#ffffff';
  }
}
