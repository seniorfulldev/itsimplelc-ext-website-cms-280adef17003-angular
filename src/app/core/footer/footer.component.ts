import { Component, OnInit, Input } from '@angular/core';
import { Settings } from '../../interfaces/settings.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input()
  settings: Settings;
  newsletterUrl: string;
  city: string;

  socialLinks: any;
  constructor(private route: ActivatedRoute) {
    this.city = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit() {
    this.socialLinks = this.settings.social;
    this.newsletterUrl = this.settings.newsletterUrl;
  }

}
