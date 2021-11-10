import { Title } from '@angular/platform-browser';
import { CouncilMeetingsGeneralInfo } from './../../interfaces/councilMeetingGeneralInfo.interface';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { split } from 'lodash-es';
import { CouncilMeetings } from 'src/app/interfaces/councilMeeting.interface';

@Component({
  selector: 'print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  // public href: string = "";
  id: string[];
  city: string;
  params: string;
  twname: string;
  councilmeetings: CouncilMeetings[];
  councilmeetingsInfo: CouncilMeetingsGeneralInfo;
  cmData: CouncilMeetings[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {
    this.id = this.route.snapshot.paramMap.get('id').split('&');
    this.city = this.id.splice(0,1)[0];
    this.twname = this.id.splice(0,1)[0];
    this.councilmeetings = this.route.snapshot.data['councilmeetings'];
    this.councilmeetingsInfo = this.route.snapshot.data['councilmeetingsInfo'][0];

  }

  printWebsite() {
    window.print()
  }

  ngOnInit() {
    // console.log(this.councilmeetingsInfo)
    // this.href = window.location.href.split(this.router.url)[0];

    if(this.id.length > 0) {
      for(let i=0; i<this.id.length;i++) {
        if(this.councilmeetings) {
          this.councilmeetings.forEach((cm) => {
            if(cm.id == this.id[i]) {
              this.cmData.push(cm);
            }
          });
        }
      }
    }

    const currentTitle = this.title.getTitle();
    this.title.setTitle(currentTitle + ' - Print');
  }
}
