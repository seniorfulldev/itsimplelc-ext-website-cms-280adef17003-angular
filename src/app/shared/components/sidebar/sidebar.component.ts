import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event } from '../../../interfaces/event.interface';
import { News } from '../../../interfaces/news.interface';
import { Alert } from '../../../interfaces/alert.interface';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent {
  @Input()
  siderbarEvents: Event[] = [];
  @Input()
  news: News[] = [];
  @Input()
  alerts: Alert[] = [];

  constructor() {}

  ngOnInit() {
  }
}
