import { Component, OnInit } from '@angular/core';
import { findIndex } from 'lodash-es';
import { tap } from 'rxjs/operators';
import { NewsStoreService } from 'src/app/services/news-store.service';

import { News } from '../../interfaces/news.interface';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  result: News[] = [];
  news$ = this.newsService.data$.pipe(
    tap(news => {
      this.news = news;
      this.result = news;
    })
  );

  constructor(private newsService: NewsStoreService) {
  }

  ngOnInit() {
  }

  onSearch(value) {
    if (value) {
      this.result = [];
      this.news.forEach((index: News) => {
        if (index.title.toLowerCase().indexOf(value.toLowerCase()) >= 0 || index.summary.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          this.result.push(index);
        }
      });
    } else {
      this.result = this.news;
    }
  }

  isVisible(news) {
    return findIndex(this.result, news) >= 0;
  }
  isNone(news) {
    if(findIndex(this.result, news) >= 0){
      return false;
    }else{
      return true;
    }
  }
}
