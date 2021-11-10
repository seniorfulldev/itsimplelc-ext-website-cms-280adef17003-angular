import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/interfaces/news.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newscard',
  templateUrl: './newscard.component.html',
  styleUrls: ['./newscard.component.scss']
})
export class NewscardComponent implements OnInit {
  @Input()
  news: News;
  startDate: string;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    let date = new Date(this.news.date);
    // console.log(this.news);

    this.startDate = this.datePipe.transform(date, "fullDate");
  }

}
