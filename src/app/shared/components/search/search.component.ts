import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input()
  placeholder: string = "How can we help?";
  @Output()
  onEnter = new EventEmitter();
  @Input() search: string;

  constructor() { }

  ngOnInit() {
    this.onEnter.emit(this.search)
  }

}
