import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { v4 as uuid } from "uuid";
import { CustomUploadComponent } from "src/app/shared/components/custom-upload/custom-upload.component";
import { ApiService } from "../../services/api.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { GgMapComponent } from 'src/app/shared/components/gg-map/gg-map.component';

@Component({
  selector: "reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
// @Injectable()
export class ReportsComponent implements OnInit {
  city: string;
  name: string;
  email: string;
  phonenum: number;
  category = '';
  cat = new FormControl();
  cat1 = new FormControl();
  @Input()
   value: any

  categories = [
    {
      name: "Road Hazards",
      details: [
        {
          name: "Cracks"
        },
        {
          name: "Damaged Bridge"
        },
        {
          name: "Dead Animal"
        },
        {
          name: "Debris on Road"
        },
        {
          name: "Hazardous Construction"
        },
        {
          name: "Ice/Freezing"
        },
        {
          name: "Pothole"
        },
        {
          name: "Eye-sight blocking Vegetation "
        },
        {
          name: "Water Runoff/Flood"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Traffic Issues",
      details: [
        {
          name: "Bus Stop Location"
        },
        {
          name: "Cross Walk Signal"
        },
        {
          name: "Damaged Sign"
        },
        {
          name: "Dangerous Intersection"
        },
        {
          name: "Repaint Street Markings"
        },
        {
          name: "Traffic Congestion"
        },
        {
          name: "Traffic Light Timing"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Street Lights",
      details: [
        {
          name: "More Lights Needed"
        },
        {
          name: "Light is Outage"
        },
        {
          name: "Light is Flickering"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Violation",
      details: [
        {
          name: "Abounded Building"
        },
        {
          name: "Abounded Car"
        },
        {
          name: "Graffiti"
        },
        {
          name: "Noise too loud"
        },
        {
          name: "Permit violation"
        },
        {
          name: "Signage placement"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Trash Removal",
      details: [
        {
          name: "Dislocated"
        },
        {
          name: "Overflowing"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Water and Rain",
      details: [
        {
          name: "Drain Clogged"
        },
        {
          name: "Standing Water"
        },
        {
          name: "Sewage"
        },
        {
          name: "Water Leak"
        },
        {
          name: "Water Runoff"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Pedestrian",
      details: [
        {
          name: "ADA incompliance"
        },
        {
          name: "Bus Stop Unsafe"
        },
        {
          name: "Crosswalk Issue"
        },
        {
          name: "Lights Insufficient"
        },
        {
          name: "Sidewalk Repair"
        },
        {
          name: "Traffic Danger"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Public Parks & Facilities",
      details: [
        {
          name: "Parking Issue"
        },
        {
          name: "Playground Concern"
        },
        {
          name: "Pond/Fountain Issue"
        },
        {
          name: "Toilets Issue"
        },
        {
          name: "Trail Issue"
        },
        {
          name: "Trash Overflow"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Safety (non-emergency)",
      details: [
        {
          name: "Fire Hazard"
        },
        {
          name: "School Zone Speeding"
        },
        {
          name: "Suspicious Activity"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {
      name: "Miscellaneous",
      details: [
        {
          name: "Irregular Smell Odor"
        },
        {
          name: "Mosquito Control"
        },
        {
          name: "Parking Issue"
        },
        {
          name: "Pest Control Rodents"
        },
        {
          name: "Other (use text box)"
        }
      ]
    },
    {name: "Other (use text box)"}
  ];

  title: any = {
    details: []
  };
  description: any;
  @Input() imageId: String;
  @Input() imageUrl: String;
  form: FormGroup;
  @Input() latitude: any;
  @Input() longitude: any;
  // @Input() location: any = {
  //   lat: this.latitude,
  //   lng: this.longitude
  // };
  // reportdata to post
  reportData: any;
  @Input() address: any;
  @ViewChild(GgMapComponent, { static: false }) mapData;
  @ViewChild(CustomUploadComponent, { static: false }) uploadreference;

  token: any;
  is_imageId: boolean;
  sending_alert = false;
  submit_state = false;
  empty_report = false;
  isSending = false;
  _currentSelection = "";

  settings: any;
  cityHallLat: string;
  cityHallLng: string;
  tb: any;
  selectionTip = false;

  currentSelectionChange = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    public apiService: ApiService,
    private route: ActivatedRoute,
    formbuilder: FormBuilder
  ) {
    this.city = this.route.snapshot.paramMap.get("city");
    this.form = formbuilder.group({
      textBox: [""],
      userName: [""],
      userEmail: [""],
      userPhone: [""]
    });
  }
  ngOnInit() {
    this.settings = this.route.snapshot.data["settings"];
    this.http.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.settings.address}.json?access_token=${environment.mapBoxApiKey}`
      ).subscribe((data: any) => {
        console.log("qc-map", data);
        this.cityHallLat = data.features[0].center[1];
        this.cityHallLng = data.features[0].center[0];
    });
    this.tb = document.getElementById('textBox');
    this.tb.setAttribute('disabled', 'disabled');
  }

  onCategoryChange(event) {
    if (event.name) {
      this.selectionTip = false;
      if (event.name.toLowerCase().indexOf('other') >= 0) {
        this.tb.removeAttribute('disabled');
        this.tb.style.backgroundColor = '#ffffff';
        this.tb.value = '';
        this.title = '';
        this.description = '';
      } else {
        this.tb.value = event.name;
        this.tb.style.backgroundColor = '#e1e1e1';
        this.tb.setAttribute('disabled', 'disabled');
        this.title = event; // issue category
      }
    }
  }
  onCategorydetailsChange(event) {
    console.log(event);

    if (event.length>0) {
      if (event[event.length-1].name.toLowerCase().indexOf('other') >= 0) {
        this.tb.removeAttribute('disabled');
        this.tb.style.backgroundColor = '#ffffff';
        this.tb.value = '';
        if (event.length > 1) {
          this.cat1.setValue([]);
          setTimeout(() => {
            this.cat1.setValue([this.title.details[this.title.details.length - 1]]);
          }, 100);
        }
      } else {
        let detailselecttions ='';
        if(event.length>0) {
          event.forEach((ev)=> {
            detailselecttions = detailselecttions + ', ' + ev.name;
          });
        }
        this.tb.value = this.title.name + detailselecttions;
        this.tb.style.backgroundColor = '#e1e1e1';
        this.tb.setAttribute('disabled', 'disabled');
      }
    } else {
      this.tb.style.backgroundColor = '#e1e1e1';
      this.tb.setAttribute('disabled', 'disabled');
      this.tb.value = this.title.name;
    }
  }

  onTrashClick() {
    this.cat.setValue(this.categories[4]);
    this.onCategoryChange(this.categories[4]);
    this.cat1.setValue([this.title.details[0]]);
    this.onCategorydetailsChange([this.title.details[0]]);
  }
  onPotholeClick() {
    this.cat.setValue(this.categories[0]);
    this.onCategoryChange(this.categories[0]);
    this.cat1.setValue([this.title.details[6]]);
    this.onCategorydetailsChange([this.title.details[6]]);
  }
  onLightClick() {
    this.cat.setValue(this.categories[2]);
    this.onCategoryChange(this.categories[2]);
    this.cat1.setValue([this.title.details[1]]);
    this.onCategorydetailsChange([this.title.details[1]]);
  }
  openedChange(e) {
    if(this.title.details.length == 0) {
      this.selectionTip = true;
    } else {
      this.selectionTip = false;
    }
  }
  issue_report(e) {
    this.submit_state = false;
    // console.log(this.uploadreference.imagePath);
    if (this.uploadreference.imagePath) {
      // console.log(this.uploadreference.imageId);
      if (this.uploadreference.imageId) {
        this.is_imageId = true;
      } else {
        alert(
          "Please wait a moment for uploading your image on our server and click Submit button again."
        );
        this.is_imageId = false;
      }
    } else {
      this.is_imageId = true;
    }
    if (this.is_imageId == true) {
      this.reportData = {
        userName: String,
        userEmail: String,
        userPhone: String,
        category: String,
        title: String,
        address: String,
        location: {
          lat: Number,
          lng: Number,
        },
        description: String,
        imageUrl: String,
        imageId: String,
      };
      // token
      this.token = this.apiService.token.access_token;
      // input data
      this.reportData.reportDetails = this.tb.value;
      this.reportData.userName = this.form.value.userName;
      this.reportData.userEmail = this.form.value.userEmail;
      this.reportData.userPhone = this.form.value.userPhone;
      // this.reportData.category = this.category;
      this.reportData.category = this.cat?.value?.name;
      this.reportData.title = this.cat?.value?.name;
      // this.reportData.description = this.description;
      // if (!this.reportData.title && !this.reportData.description) {
      this.reportData.description = this.tb.value;
      // }
      this.reportData.imageUrl = this.uploadreference.imageUrl;
      this.reportData.imageId = this.uploadreference.imageId;
      // get the map data
      console.log(this.mapData);
      this.reportData.address = this.mapData.address;
      this.reportData.location = this.mapData.location;
      // console.log(uuid()); // my uuid
      console.log(this.reportData);
      // If reportdata is empty or missing information
      if (
        !this.reportData.userName ||
        !this.reportData.userEmail ||
        !this.reportData.userPhone ||
        !this.reportData.imageId ||
        !this.reportData.address ||
        !this.reportData.description
      ) {
        this.empty_report = true;
      } else {
        this.empty_report = false;
        this.isSending = true;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          'ITs-Device-ID': uuid(),
          'Content-Type': 'application/json',
        });
        const options = { headers };
        // console.log(this.reportData);
        return this.http
          .post(
            `${environment.reportUrl}/city/${this.city}/consumer`,
            this.reportData,
            options
          )
          .subscribe(
            (res) => {
              // console.log(res);
              this.isSending = false; //success submit
              this.submit_state = true; //success submit
              this.form.setValue({
                textBox: '',
                userName: '',
                userEmail: '',
                userPhone: '',
              }); //form date initialize
              this.cat.setValue('');
              this.cat1.setValue([]);
              this.uploadreference.imgURL = '';
            },
            (err) => {
              console.log(err.message);
            }
          );
      }
    }
  }
}
