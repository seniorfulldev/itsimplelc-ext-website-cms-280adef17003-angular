import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrls: ['./police.component.scss']
})
export class PoliceComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // console.log(this.filterNodeRef.nativeElement.style.paddingLeft);
  }
}
