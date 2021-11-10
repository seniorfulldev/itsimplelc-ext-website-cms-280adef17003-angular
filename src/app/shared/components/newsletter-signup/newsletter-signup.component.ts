import { Component, Input, OnInit } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'newsletter-signup',
  templateUrl: './newsletter-signup.component.html',
  styleUrls: ['./newsletter-signup.component.scss']
})
export class NewsletterSignupComponent implements OnInit {

  profile: Settings;
  @Input() newsletter_Url: string = '';
  constructor(private route: ActivatedRoute) {
    this.profile = this.route.snapshot.data['settings'];
   }

  ngOnInit() {
  }
}
