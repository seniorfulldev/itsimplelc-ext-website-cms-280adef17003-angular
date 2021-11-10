import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { News } from '../../../../interfaces/news.interface';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
}) 
export class NewsCardComponent implements OnInit {
  @Input()
  news: News;

  startDate: string;
  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    let date = new Date(this.news.date);
    this.startDate = this.datePipe.transform(date, "fullDate");
  }
}
