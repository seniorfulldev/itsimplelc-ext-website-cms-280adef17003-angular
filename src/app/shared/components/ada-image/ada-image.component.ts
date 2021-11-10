import { Component, OnInit, Input } from '@angular/core';
import { LongDescComponent } from '../longdesc/longdesc.component';
import { AltComponent } from '../alt/alt.component';

@Component({
  selector: 'ada-image',
  templateUrl: './ada-image.component.html',
  styleUrls: ['./ada-image.component.scss']
})
export class AdaImageComponent implements OnInit {
  @Input()
  src:string = "";
  @Input()
  alt:string = "";
  @Input()
  fit:string = "cover";
  @Input()
  longdesc:string = "";
  type:string;
  image: boolean = false;
  video: boolean = false;

  constructor() { }
  
  ngOnInit() {
  }
  
  getimgSrc(src) {
    let type = src.substr(src.lastIndexOf('.') + 1);
    if(type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif' || type == 'svg') {
      return true;
    } else {
      return false;
    }
  }
  getvideoSrc(src) {
    let type = src.substr(src.lastIndexOf('.') + 1);
    if(type == 'mp4') {
      return true;
    } else {
      return false;
    }
  }
}