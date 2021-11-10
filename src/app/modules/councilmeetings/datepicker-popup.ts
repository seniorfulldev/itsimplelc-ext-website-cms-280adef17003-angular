import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter
} from "@angular/core";
import {
  NgbDatepicker,
  NgbInputDatepicker,
  NgbDateStruct,
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { NgModel } from "@angular/forms";

import { Subscription } from "rxjs";
import { CouncilmeetingsComponent } from "./councilmeetings.component";

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one &&
  two &&
  two.year === one.year &&
  two.month === one.month &&
  two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day < two.day
      : one.month < two.month
    : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day > two.day
      : one.month > two.month
    : one.year > two.year;

@Component({
  selector: "ngbd-datepicker-popup",
  templateUrl: "./datepicker-popup.html",
  styles: [
    `
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #e6e6e6;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: rgb(2, 117, 216);
        color: white;
      }
      .custom-day.faded {
        background-color: rgba(2, 117, 216, 0.5);
      }
    `
  ]
})
export class NgbdDatepickerPopup implements OnInit {
  startDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  minDate: NgbDateStruct;
  hoveredDate: NgbDateStruct;
  fromDate: any;
  toDate: any;
  model = "Search";
  private _subscription: Subscription;
  private _selectSubscription: Subscription;
  @ViewChild("d", { static: false }) input: NgbInputDatepicker;
  @ViewChild(NgModel, { static: false }) datePick: NgModel;
  @ViewChild("myRangeInput", { static: false }) myRangeInput: ElementRef;

  isHovered = date =>
    this.fromDate &&
    !this.toDate &&
    this.hoveredDate &&
    after(date, this.fromDate) &&
    before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  @Output()
  onEnter = new EventEmitter();
  constructor(
    element: ElementRef,
    private renderer: Renderer2,
    private _parserFormatter: NgbDateParserFormatter
  ) {}
  ngOnInit() {
    this.startDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.maxDate = {
      year: now.getFullYear() + 2,
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.minDate = {
      year: now.getFullYear() - 5,
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  }

  onDateSelection(date: NgbDateStruct) {
    let parsed = "";
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      // this.model = `${this.fromDate.year} - ${this.toDate.year}`;
      this.input.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate) {
      parsed += this._parserFormatter.format(this.fromDate);
    }
    if (this.toDate) {
      parsed += " - " + this._parserFormatter.format(this.toDate);
    }

    if (this.fromDate && this.toDate) {
      this.setDate(this.fromDate, this.toDate);
    }

    this.renderer.setProperty(this.myRangeInput.nativeElement, "value", parsed);
  }

  setDate(fd, td) {
    console.log(fd.year + "  .  " + td.year);
    CouncilmeetingsComponent.fromDate = fd;
    CouncilmeetingsComponent.toDate = td;
    this.fromDate = '';
    this.toDate = '';
    this.onEnter.emit();
  }
  onSearch() {
    if (this.fromDate && this.toDate) {
      this.setDate(this.fromDate, this.toDate);
    }
  }
}
