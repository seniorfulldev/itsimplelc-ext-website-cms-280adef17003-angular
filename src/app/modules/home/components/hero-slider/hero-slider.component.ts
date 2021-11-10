import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss']
})
export class HeroSliderComponent implements OnInit {
  @Input()
  featureImgs: any;

  disabled: boolean = false;
  clicked: boolean = false;

  constructor(private router: Router) { }

  featuredImg: string;

  navSlideConfig = {
    arrows: true,
    variableWidth: false,
    adaptiveHeight: true,
    infinite: false,
    swipeToSlide: true,
    edgeFriction: 0,
    slidesToShow: 8,
    prevArrow: '<img class="slick-prev" src="assets/images/left-btn.svg"/>',
    nextArrow: '<img class="slick-next" src="assets/images/right-btn.svg"/>',
    responsive:[
      // {
      //   breakpoint: 2051,
      //   settings: {
      //     slidesToShow: 8,
      //   }
      // },
      // {
      //   breakpoint: 1901,
      //   settings: {
      //     slidesToShow: 8,
      //   }
      // },
      // {
      //   breakpoint: 1751,
      //   settings: {
      //     slidesToShow: 7
      //   }
      // },
      // {
      //   breakpoint: 1601,
      //   settings: {
      //     slidesToShow: 6
      //   }
      // },
      // {
      //   breakpoint: 1451,
      //   settings: {
      //     slidesToShow: 5
      //   }
      // },
      // {
      //   breakpoint: 1301,
      //   settings: {
      //     slidesToShow: 4
      //   }
      // },
      // {
      //   breakpoint: 1150,
      //   settings: {
      //     slidesToShow: 3
      //   }
      // },
      {
        breakpoint: 1041,
        settings: {
          slidesToShow: 4
        }
      },
      // {
      //   breakpoint: 751,
      //   settings: {
      //     slidesToShow: 4
      //   }
      // },
      // {
      //   breakpoint: 601,
      //   settings: {
      //     slidesToShow: 2
      //   }
      // },
      {
        breakpoint: 536,
        settings: {
          // arrows: false,
          slidesToShow: 2
        }
      }
    ]
  };

  ngOnInit() {
    let activeIndex = parseInt(localStorage.getItem("activeIndex"))? parseInt(localStorage.getItem("activeIndex")): 1;

    this.featuredImg = this.featureImgs[`img0${activeIndex}Url`];

    activeIndex++;

    if (activeIndex > 4) {
      activeIndex = 1;
    }

    localStorage.setItem("activeIndex", activeIndex.toString());
  }
  
  slickInit(e) {
  }
  
  breakpoint(e) {
  }
  
  afterChange(e) {
    this.clicked = false;
    this.disabled = false;
  }
  
  beforeChange(e) {
    this.clicked = false;
    this.disabled = false;
  }

  isDisabled() {
    return this.disabled;
  }

  onMouseDown(event) {
    this.clicked = true;
  }

  onMouseUp(event) {
    this.clicked = false;
    this.disabled = false;
  }

  onMouseMove(event) {
    if (!this.clicked) {
      this.disabled = false;
    }

    if (this.clicked && !this.disabled) {
      this.disabled = true;
    }
  }
}
