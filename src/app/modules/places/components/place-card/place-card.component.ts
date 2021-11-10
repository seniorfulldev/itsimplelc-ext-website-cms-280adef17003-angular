import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';  

import { Place } from '../../../../interfaces/place.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
}) 
export class PlaceCardComponent implements OnInit {
  @Input()
  place: Place;
  city: string;

  constructor(private datePipe: DatePipe, private route: ActivatedRoute) {
    this.city = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit() {
  }
}
