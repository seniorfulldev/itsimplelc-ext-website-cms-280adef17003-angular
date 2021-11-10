import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { News } from '../../../../interfaces/news.interface';
import { NewsStoreService } from 'src/app/services/news-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  data: News;

  data$ = this.news.getItemById(
    this.route.snapshot.paramMap.get('id'))
    .pipe(
      tap((newsItem => {
        this.startDate = this.datePipe.transform(newsItem.date, 'fullDate');
      }))
  );

  startDate: string;
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private news: NewsStoreService,
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {}
}
