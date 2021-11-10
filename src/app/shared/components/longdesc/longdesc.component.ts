import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'longdesc',
  templateUrl: './longdesc.component.html',
  styleUrls: ['./longdesc.component.scss']
})
export class LongDescComponent implements OnInit {
  @Input()
  longdesc: string = "";
  constructor() { }

  ngOnInit() {
  }

}