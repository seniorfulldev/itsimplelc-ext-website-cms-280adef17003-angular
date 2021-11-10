import { Component, OnInit, Input } from '@angular/core';
import { values } from 'lodash-es';
import { TenantStoreService } from 'src/app/services/tenant-store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'events-slider',
  templateUrl: './events-slider.component.html',
  styleUrls: ['./events-slider.component.scss']
})
export class EventsSliderComponent implements OnInit {
  @Input()
  featureImgs: any;
  @Input()
  title: string;
  logoUrl: string;

  newFeatureImgs: any = [];
  sub = this.tenant.data$.pipe(
    map(t => {
      return this.logoUrl = t.settings?.logoImgUrl;
  }));

  slidePageConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    prevArrow: '<img class="slick-prev" src="assets/images/left-btn.svg"/>',
    nextArrow: '<img class="slick-next" src="assets/images/right-btn.svg"/>',
  };

  constructor(private tenant: TenantStoreService) {
  }

  ngOnInit() {
    this.newFeatureImgs = values(this.featureImgs).filter(imgString => imgString !== '');
  }
}
