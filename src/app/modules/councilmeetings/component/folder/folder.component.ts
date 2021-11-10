import { Component, OnInit, Input } from '@angular/core';
import { CouncilmeetingsComponent } from '../../councilmeetings.component';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input() year: string;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit() {
  }
  // monthlistview(y) {
  //   CouncilmeetingsComponent.sellectedyear = y;
  // }

}
