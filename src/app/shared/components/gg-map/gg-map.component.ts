import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Settings } from 'src/app/interfaces/settings.interface';

const googleApiKey = 'AIzaSyC7Adq8h3EjRTbU89oJPoKtn7kRkiIsims';

const options: google.maps.MapOptions = {
  streetViewControl: false,
  clickableIcons: false,
  disableDoubleClickZoom: true,
  scrollwheel: false,
  // draggable: false
};

@Component({
  selector: 'app-gg-map',
  templateUrl: './gg-map.component.html',
  styleUrls: ['./gg-map.component.scss'],
})
export class GgMapComponent implements OnInit, AfterViewInit {
  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  apiLoaded: Observable<boolean>;
  options = options;
  profile: Settings;
  center: google.maps.LatLngLiteral;
  geocoder: google.maps.Geocoder;
  zoom = 12;
  @Input() address: string = '';
  @Input() location: google.maps.LatLngLiteral;
  autocomplete: google.maps.places.Autocomplete;

  constructor(httpClient: HttpClient, private route: ActivatedRoute) {
    this.profile = this.route.snapshot.data['settings'];
    const position = {
      lat: +this.profile?.location.latitude,
      lng: +this.profile?.location.longitude,
    };
    this.center = position;
    this.apiLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`,
        'callback'
      )
      .pipe(
        map(() => {
          console.log('maps loaded');
          this.geocoder = new google.maps.Geocoder();
          this.autocomplete = new google.maps.places.Autocomplete(
            this.searchElementRef.nativeElement,
            {
              types: ['address'],
              bounds: new google.maps.LatLngBounds(position),
            }
          );
          this.autocomplete.addListener('place_changed', () => {
            let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            const position = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            this.updateMapMarker(position);
          });
          return true;
        }),
        catchError((error) => {
          console.log('maps did not loaded:');
          console.log(error);
          return of(false);
        })
      );
  }

  mapClick(event: google.maps.MouseEvent | google.maps.IconMouseEvent) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    this.updateMapMarker(position);
    this.updateByMapSetAddress(position);
  }

  setUserCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((userPosition) => {
        const position = {
          lat: userPosition.coords.latitude,
          lng: userPosition.coords.longitude,
        };
        this.updateMapMarker(position);
        this.updateByMapSetAddress(position);
      });
    }
  }
  updateMapMarker(position: google.maps.LatLngLiteral) {
    this.center = position;
    this.location = position;
    this.zoom = 15;
  }

  clear() {
    this.location = null;
    this.center = {
      lat: +this.profile?.location.latitude,
      lng: +this.profile?.location.longitude,
    };
    this.address = '';
  }
  updateByMapSetAddress(position: google.maps.LatLngLiteral) {
    this.getAddress(position).then((address) => {
      console.log(address);
      this.address = address;
    });
  }
  private getAddress(position: google.maps.LatLngLiteral) {
    return new Promise<string>((resolve, reject) => {
      this.geocoder.geocode({ location: position }, (results, status) => {
        if (status !== 'OK') {
          window.alert(`Geocoder failed due to: ${status}`);
          reject(`Geocoder failed due to: ${status}`);
          return;
        }
        if (!results[0]) {
          window.alert('No results found');
          reject('No results found');
          return;
        }
        // this.zoom = 12;
        // console.log(results[0].formatted_address);
        // console.log(this.address);
        resolve(results[0].formatted_address);
      });
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
