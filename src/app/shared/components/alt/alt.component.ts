import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alt',
  templateUrl: './alt.component.html',
  styleUrls: ['./alt.component.scss']
})
export class AltComponent implements OnInit {
  @Input()
  text: string = "";
  constructor() { }

  ngOnInit() {
  }

}