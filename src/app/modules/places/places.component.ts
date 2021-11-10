import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PlacesStoreService } from 'src/app/services/places-store.service';

import { Place } from '../../interfaces/place.interface';

@Component({
  selector: 'places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  result: Place[] = [];
  sub: Observable<any>;
  constructor(private placesStore: PlacesStoreService) {
    this.sub = this.placesStore.data$.pipe(
      tap((places) => {
        this.places = places;
        this.places?.sort((a, b) => a.name.localeCompare(b.name));
        this.result = [...places];
      })
    )
  }

  ngOnInit() {
  }

  onSearch(value) {
    if (value) {
      this.result = [];
      this.places.forEach((place: Place) => {
        if (place.name.toLowerCase().indexOf(value) >= 0) {
          this.result.push(place);
        }
      });
    } else {
      this.result = this.places;
    }
  }

  isVisible(place) {
    return findIndex(this.result, place) >= 0;
  }
  isNone(place) {
    if(findIndex(this.result, place) >= 0){
      return false;
    }else{
      return true;
    }
  }
}
