import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Place } from '../../../interfaces/place.interface';
import { PlacesStoreService } from 'src/app/services/places-store.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})
export class PlaceDetailComponent implements OnInit {
  place: Place;

  place$ = this.placesStore
    .getItemById(this.route.snapshot.paramMap.get('id'))
    .pipe(
      map((place) => {
        if (place.link.split('http')[1] == undefined) {
          place.link = 'https://' + place.link;
        }
        // build google map string based on the address
        const addressArr = place.address.split(', ');
        addressArr[0] = addressArr[0].replace(/\s/g, '+');
        addressArr[1] = '+,' + addressArr[1];
        addressArr[2] = '+,' + addressArr[2];
        addressArr[3] = '+,' + addressArr[3] + '/';
        this.addressMapString =
          'https://www.google.com/maps/place/' + addressArr.join();
        return place;
      })
    );

  tooltipContent: string;
  isOver: boolean = false;

  addressMapString: string;

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private placesStore: PlacesStoreService
  ) {
    // let id = this.route.snapshot.paramMap.get('id');
   //  console.log(this.route.snapshot);
    // let places = this.route.snapshot.data['places'];

    // this.place = find(places, ['id', id]);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    // console.log(this.place);
    // if (this.place.link.split('http')[1] == undefined) {
    //   this.place.link = 'https://' + this.place.link;
    // }

    // // build google map string based on the address
    // const addressArr = this.place.address.split(', ');
    // addressArr[0] = addressArr[0].replace(/\s/g, '+');
    // addressArr[1] = '+,' + addressArr[1];
    // addressArr[2] = '+,' + addressArr[2];
    // addressArr[3] = '+,' + addressArr[3] + '/';
    // this.addressMapString =
    //   'https://www.google.com/maps/place/' + addressArr.join();
  }
}
