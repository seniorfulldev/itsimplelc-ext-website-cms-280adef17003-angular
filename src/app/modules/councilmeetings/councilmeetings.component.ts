import { CouncilMeetingsGeneralInfo } from './../../interfaces/councilMeetingGeneralInfo.interface';
import { CouncilMeetings } from './../../interfaces/councilMeeting.interface';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TenantStoreService } from 'src/app/services/tenant-store.service';
import { tap } from 'rxjs/operators';
import { CouncilMeetingsStoreService } from 'src/app/services/council-meetings-store.service';
import { merge, Observable } from 'rxjs';
import { CouncilMeetingsGeneralInfoStoreService } from 'src/app/services/council-meetings-info-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-councilmeetings',
  templateUrl: './councilmeetings.component.html',
  styleUrls: ['./councilmeetings.component.scss'],
})
export class CouncilmeetingsComponent implements OnInit {
  city: string;
  twname: any;
  @Input()
  static fromDate: string;
  @Input()
  static toDate: string;
  year: string;
  councilMeetings: CouncilMeetings[];
  councilMeetingsGeneralInfo: CouncilMeetingsGeneralInfo[] = [];
  councilMeetingsGeneralInfo$ = this.cmGeneralInfoStore.data$;
  councilMeetingsByYear: {};
  councilMeetingsByYear_years = [];
  // councilMeetingsByYear_values = [];
  filteredCouncilMeetings: CouncilMeetings[] = [];
  dataSource: MatTableDataSource<CouncilMeetings>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [
    'title',
    'date',
    'agenda',
    'documents',
    'minutes',
    'recording',
  ];

  keyWords: string;
  isDate: boolean;
  selectedYear: string[] = [];
  currentYear = new Date().getFullYear();
  sub: Observable<any>
  noData: string;


  constructor(
    private route: ActivatedRoute,
    private elements: ElementRef,
    private router: Router,
    private tenant: TenantStoreService,
    private councilMeetingsStore: CouncilMeetingsStoreService,
    private cmGeneralInfoStore: CouncilMeetingsGeneralInfoStoreService
  ) {
    // this.years = {};
    this.councilMeetingsByYear = {};
    for (let year = this.currentYear - 6; year <= this.currentYear; year++) {
      // this.years[year] = new Date(`${year}-01-01`);
      this.councilMeetingsByYear[year] = [];
    }
    const sub1 = tenant.data$.pipe(
      tap((tenant) => {
        this.city = tenant.name;
        this.twname = tenant.settings;
      })
    );
    const sub2 = councilMeetingsStore.data$.pipe(
      tap((councilMeetings) => {
        this.councilMeetings = councilMeetings;

        this.councilMeetings.forEach((councilMeeting) => {
          const councilMeetingYear = new Date(
            councilMeeting?.date
          ).getFullYear();
          if (
            councilMeetingYear > this.currentYear - 7 &&
            councilMeetingYear <= this.currentYear
          ) {
            this.councilMeetingsByYear[councilMeetingYear]?.push(
              councilMeeting
            );
          }
        });
        this.councilMeetingsByYear_years = Object.keys(
          this.councilMeetingsByYear
        ).reverse();
        this.year = this.currentYear.toString();
        this.selectedYear.push(this.year);
        this.filteredCouncilMeetings = this.councilMeetingsByYear[this.year];
        this.onShowFilteredCouncilMeetings(
          this.councilMeetingsByYear[this.year]
        );
      })
    );
    this.sub = merge(sub1, sub2);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.keyWords = queryParams.get('keyWords');
    });
  }

  onFilterCouncilMeetingsByYear(year) {
    this.selectedYear = [];
    this.filteredCouncilMeetings = this.councilMeetingsByYear[year];
    if (this.filteredCouncilMeetings.length === 0) {
      this.dataSource = new MatTableDataSource([]);
      this.noData = 'No items published for this year';
    } else {
      this.noData = '';
      this.onShowFilteredCouncilMeetings(this.filteredCouncilMeetings);
    }
    // this.selectedYear = year;
    this.selectedYear.push(year);
    this.year = year;
  }

  onSearchByDate() {
    this.selectedYear = [];
    const fDate = CouncilmeetingsComponent.fromDate;
    const tDate = CouncilmeetingsComponent.toDate;
    const fy = fDate['year'];
    const fm = fDate['month'];
    const fd = fDate['day'];
    const ty = tDate['year'];
    const tm = tDate['month'];
    const td = tDate['day'];

    const fDateTimestamp = new Date(`${fy}-${fm}-${fd}`).getTime();
    const tDateTimestamp = new Date(`${ty}-${tm}-${td}`).getTime();

    this.filteredCouncilMeetings = this.councilMeetings.filter(
      (councilMeeting) => {
        const countcilMeetingTimestamp = new Date(
          councilMeeting.date
        ).getTime();
        return (
          countcilMeetingTimestamp >= fDateTimestamp &&
          countcilMeetingTimestamp <= tDateTimestamp
        );
      }
    );

    this.onShowFilteredCouncilMeetings(this.filteredCouncilMeetings);

    this.year = `${fm}/${fd}/${fy} to ${tm}/${td}/${ty}`;
    for (let i = +fy; i <= +ty; i++) {
      this.selectedYear.push(i.toString());
    }
    this.isDate = true;
  }

  clearSearchDate() {
    this.elements.nativeElement.querySelector('.form-control').value = '';
    CouncilmeetingsComponent.fromDate = '';
    CouncilmeetingsComponent.toDate = '';
    this.onFilterCouncilMeetingsByYear(this.currentYear.toString());
    this.isDate = false;
  }

  onSearchByKeywords() {
    let meetingDateArr = [];
    this.selectedYear = [];
    this.filteredCouncilMeetings = this.councilMeetings.filter((meeting) => {
      return meeting.title
        .toLocaleLowerCase()
        .includes(this.keyWords.trim().toLocaleLowerCase());
    });

    meetingDateArr = this.filteredCouncilMeetings.map((meeting) => {
      return new Date(meeting.date).getFullYear();
    });
    this.selectedYear = this.yearArrFromKeywordsSearch(meetingDateArr);

    this.onShowFilteredCouncilMeetings(this.filteredCouncilMeetings);
    // this.keyWords ='';
  }

  clearSearchKeyword() {
    this.keyWords = '';
    this.onSearchByKeywords();
  }

  yearArrFromKeywordsSearch(yearArr) {
    const filteredArr = [];
    yearArr.map((year) => {
      if (filteredArr.indexOf(year) === -1) {
        filteredArr.push(year);
      }
    });
    filteredArr.sort((a, b) => a - b);
    return filteredArr.map((year) => year.toString());
  }

  onShowFilteredCouncilMeetings(councilMeetings: CouncilMeetings[]) {
    this.dataSource = new MatTableDataSource(councilMeetings);
    this.dataSource.sort = this.sort;
    this.sort.sort({ id: 'date', start: 'desc', disableClear: false });
    if(this.dataSource.filteredData.length == 0) {
      this.noData = 'No items published for this year';
    } else {
      this.noData = '';
    }
  }

  clearCalendar(e) {
    setTimeout(() => {
      if (
        e.target.tagName != 'INPUT' &&
        e.target.tagName != 'SPAN' &&
        e.target.tagName != 'OPTION'
      ) {
        if (this.elements.nativeElement.querySelector('ngb-datepicker')) {
          if (
            e.target.parentNode?.className &&
            e.target.parentNode?.className.indexOf('ngb') != 0 &&
            e.target?.className.indexOf('ngb') != 0
          ) {
            this.elements.nativeElement
              .querySelector('.input-group')
              .children[0].click();
          }
        }
      }
    }, 300);
  }

  printTable() {
    if (this.dataSource.filteredData.length > 0) {
      this.dataSource.filteredData;
      let cmids = '';
      if (this.dataSource.filteredData) {
        this.dataSource.filteredData.forEach((cm) => {
          cmids = cmids + '&' + cm.id;
        });
      }

      const id = this.city + '&' + this.twname.viewShortName + cmids;
      const url = this.router.serializeUrl(
        // this.router.createUrlTree([`${this.city}/print/${id}`])
        this.router.createUrlTree(
          environment.initTenant
            ? [`print/${id}`]
            : [`${this.city}/print/${id}`]
        )
      );

      window.open(url, '_blank');
    } else {
      alert('No Table Data!');
    }
  }
}
