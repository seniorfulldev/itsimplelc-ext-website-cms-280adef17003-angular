import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
  @ViewChild('dropdown', {static:false}) dropdown:ElementRef;

  @Input()
  options: any;

  @Input()
  placeholder: string;

  @Output()
  currentSelectionChange = new EventEmitter<object>();

  _currentSelection: any;

  get currentSelection() {
    return this._currentSelection;
  }

  @Input()
  set currentSelection(value) {
    this._currentSelection =
      value === '' || value === null || value === undefined
        ? { name: this.placeholder }
        : value;
  }

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.currentSelection = { name: this.placeholder };
  }

  setCurrentSelection(option) {
    this.currentSelection = option;
    this.currentSelectionChange.emit(option);
    this.renderer.removeClass(this.dropdown.nativeElement, 'show');
  }

  addNewData() { }
}
