import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Alert } from 'src/app/interfaces/alert.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Settings } from 'src/app/interfaces/settings.interface';
import { ApiService } from 'src/app/services/api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { AlertsStoreService } from 'src/app/services/alerts-store.service';
import { Observable } from 'rxjs';
import { TenantStoreService } from 'src/app/services/tenant-store.service';

const WEATHER_API_KEY = 'ec6e0a16650046a398b153323201605';
interface WeatherInfo {
  temperature: string;
  tempIcon: string;
}

@Component({
  selector: 'app-top-staticbar',
  templateUrl: './top-staticbar.component.html',
  styleUrls: ['./top-staticbar.component.scss']
})
export class TopStaticbarComponent implements OnInit {

  @Input()
  // alerts: Alert[] = [];
  alerts$ = this.alertsStore.data$.pipe(
    tap((alerts) => {
      function filterByDate(item) {
        if (((new Date(item.createdDate)).getTime()/1000) > (Date.now()/1000 - 864000)) {
          return true
        }
        return false;
      }
      this.dispalerts = alerts.filter(filterByDate);
      // this.dispalerts = alerts.slice(0, 4);
  }));
  dispalerts: Alert[] = [];
  profile: Settings;

  temperature: String;
  tempicon: string;
  today: number = Date.now();
  // scroll = false;

  selectedLanguage: string;
  languages = [
    { name: 'English' },
    { name: 'Spanish' }
  ];

  tenant$ = this.tenantStore.data$;

  weather$ = this.tenantStore.data$.pipe(
    switchMap(tenant => {
      const {latitude, longitude} = tenant.settings.location;
      return this.getTempLatLng(latitude,longitude);
    }),
    map((data) => {
      let weather :WeatherInfo = {
        temperature: data?.current?.temp_f,
        tempIcon: data?.current.condition.icon,
      };
      return weather;
    })
  );

  constructor(private route: ActivatedRoute, private http: HttpClient, private tenantStore: TenantStoreService , private alertsStore: AlertsStoreService) {
    this.profile = this.route.snapshot.data['settings'];
    
    // google translate element
    var s = document.createElement('script');
    s.type = 'text/javascript';
    var code = 'function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: "en"}, "google_translate_element");}';
    try {
      s.appendChild(document.createTextNode(code));
      document.body.appendChild(s);
    } catch (e) {
      s.text = code;
      document.body.appendChild(s);
    }
    
    // google translate api
    var gt = document.createElement('script');
    gt.type = 'text/javascript';
    gt.async = true;
    gt.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(gt, s);

  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<img class="slick-prev" src="assets/images/prev-alert.svg"/>',
    nextArrow: '<img class="slick-next" src="assets/images/next-alert.svg"/>',
  };

  ngOnInit() {
    // let origin = this.profile.address.split(' ');
    // let zipcode;
    // origin.forEach((o, i) => {
    //   if(parseInt(o, 10)) {
    //     zipcode = parseInt(o, 10);
    //   }
    //   if(origin.length == i+1){
    //     this.getTemp(zipcode).subscribe(data => {
    //       this.temperature = data['current'].temp_f;
    //       this.tempicon = data['current'].condition.icon;
    //     });
    //   }
    // })

    // for (let i = 0; i < 5; i++) {
    //   if (this.alerts[i]) {
    //     this.dispalerts.push(this.alerts[i]);
    //   }
    // }

    setInterval(() => {
    // language option edit
    let translateItem = document.getElementById(':0.targetLanguage');
    if(translateItem) {
      let options = translateItem.children[0];
      for(let i=0 ; i<= options.childElementCount - 1; i++) {
        let optionValue = options.children[i];
        if(optionValue.textContent == 'Select Language' || optionValue.textContent == 'Spanish' || optionValue.textContent == 'English') {
        }else {
          optionValue.className = 'language-option-hide';
        }
      }
    }
    }, 200);
  }
  getTemp(z: String) {
    const weatherApiUrl = 'https://api.weatherapi.com/v1/current.json';
    return this.http.get(weatherApiUrl + '?key=' + WEATHER_API_KEY + '&q=' + z)
  }

  getTempLatLng(lat:string, lng:string){
    const weatherApiUrl = 'https://api.weatherapi.com/v1/current.json';
    return this.http.get<any>(`${weatherApiUrl}?key=${WEATHER_API_KEY}&q=${lat},${lng}`)
  }
  onLanguageChange(e) {
    this.selectedLanguage = e.name;
    let selectTag = document.getElementById(':0.targetLanguage').children[0];
    console.log(e.name);
    if(this.selectedLanguage == 'English') {
      for(let i=0 ; i<= selectTag.childElementCount - 1; i++) {
        let optionTag = selectTag.children[i];
        if(optionTag.getAttribute('value') == 'en') {
          console.log(optionTag);
        }
      }
    }
    else if(this.selectedLanguage == 'Spanish') {
      for(let i=0 ; i<= selectTag.childElementCount - 1; i++) {
        let optionTag = selectTag.children[i];
        if(optionTag.getAttribute('value') == 'es') {
          console.log(optionTag);
        }
      }
    }
    // selectTag.nodeValue = this.selectedLanguage;
  }

  // onScroll(e) {
  //   console.log(e);
  //   document.getElementById('top-staticbar').setAttribute('display', 'none');
  // }

  slickInit(e) {}

  breakpoint(e) {}

  afterChange(e) {}

  beforeChange(e) {}

}
