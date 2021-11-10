import { Component, OnInit, Input } from '@angular/core';
import { LongDescComponent } from '../longdesc/longdesc.component';
import { AltComponent } from '../alt/alt.component';

@Component({
  selector: 'ada-banner',
  templateUrl: './ada-banner.component.html',
  styleUrls: ['./ada-banner.component.scss']
})
export class AdaBannerComponent implements OnInit {
  @Input()
  background:string = "";
  @Input()
  alt:string = "";
  @Input()
  longdesc:string = "";
  @Input()
  title:string = "";
  @Input()
  style:string = "center";

  constructor() { 
  }

  ngOnInit() {
  }

}