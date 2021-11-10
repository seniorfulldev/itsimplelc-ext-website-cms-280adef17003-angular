import { Component, OnInit, Input } from '@angular/core';

import { Author } from '../../../../interfaces/author.interface';

@Component({
  selector: 'council-slider',
  templateUrl: './council-slider.component.html',
  styleUrls: ['./council-slider.component.scss']
})
export class CouncilSliderComponent implements OnInit {
  @Input()
  authors: Author[];

  authorGroups: any = [];
  authorMobileGroups: any = [];
  constructor() { }

  councilSlideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false
  };

  ngOnInit() {
    let authorsTemp = JSON.parse(JSON.stringify(this.authors));
    let authorsMobileTemp = JSON.parse(JSON.stringify(this.authors));

    while(authorsTemp.length) {
      this.authorGroups.push(authorsTemp.splice(0, 12));
    }

    while(authorsMobileTemp.length) {
      this.authorMobileGroups.push(authorsMobileTemp.splice(0, 9));
    }
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {

  }
  
  beforeChange(e) {

  }

}
