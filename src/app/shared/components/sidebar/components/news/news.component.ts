import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../../../../interfaces/news.interface';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {
  @Input()
  news: News[] = [];
  dispnews: News[] = [];

  title: string;
  email: string;
  link: string;

  constructor() { }

  slideNewsConfig = {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true};

  ngOnInit() {
    console.log(this.news);
    this.news.sort((a, b) => {
      let dateA = new Date(b.date);
      let dateB = new Date(a.date);
      return dateA.getTime() - dateB.getTime();
    });
    for(let i=0; i<3; i++){
      if(this.news[i]){
        this.dispnews.push(this.news[i]);
      }
    }

    if (this.news.length > 0) {
      this.title = this.news[0].title;
      this.email = this.news[0].email;
      this.link = this.news[0].link;
    }
  }

  slickInit(e) {
    
  }
  
  breakpoint(e) {

  }
  
  afterChange(e) {
    if (this.news.length > 0) {
      this.title = this.news[e.currentSlide].title;
      this.email = this.news[e.currentSlide].email;
      this.link = this.news[e.currentSlide].link;
    }
  }
  
  beforeChange(e) {
  
  }
}
