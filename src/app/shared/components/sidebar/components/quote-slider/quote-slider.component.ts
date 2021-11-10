import { Component, OnInit, Input } from '@angular/core';
import { WeekDay } from '@angular/common';

import { Alert } from '../../../../../interfaces/alert.interface';

@Component({
  selector: 'quote-slider',
  templateUrl: './quote-slider.component.html',
  styleUrls: ['./quote-slider.component.scss']
})
export class QuoteSliderComponent implements OnInit {
  @Input()
  alerts: Alert[] = [];
  dispalerts: Alert[] = [];

  constructor() {

  }
  
  slideConfig = {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true, autoplay: true, autoplaySpeed: 2000};
  
  today: number = Date.now();
  
  ngOnInit() {
    
    for(let i=0; i<5; i++){
      if(this.alerts[i]){
        this.dispalerts.push(this.alerts[i]);
      }
    }
  }
  
  slickInit(e) {
    
  }
  
  breakpoint(e) {

  }
  
  afterChange(e) {
    
  }
  
  beforeChange(e) {
  
  }

}
