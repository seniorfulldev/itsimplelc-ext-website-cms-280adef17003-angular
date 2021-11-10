import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { GoogleMapsModule } from '@angular/google-maps';

import { AltComponent } from './components/alt/alt.component';
import { LongDescComponent } from './components/longdesc/longdesc.component';
import { AdaImageComponent } from './components/ada-image/ada-image.component';
import { ClockComponent } from './components/clock/clock.component';
import { QuoteSliderComponent } from './components/sidebar/components/quote-slider/quote-slider.component';
import { NewsComponent } from './components/sidebar/components/news/news.component';
import { EventComponent } from './components/sidebar/components/event/event.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { AdaBannerComponent } from './components/ada-banner/ada-banner.component';
import { SearchComponent } from './components/search/search.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { CustomUploadComponent } from './components/custom-upload/custom-upload.component';

import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { PatternDirective } from './directives/pattern.directive';
import { PhoneMaskDirective } from './directives/phone.directive';
import { NewsletterSignupComponent } from './components/newsletter-signup/newsletter-signup.component';
import { PoliceSidebarComponent } from './components/police-sidebar/police-sidebar.component';
import { RouterModule } from '@angular/router';
import { TopStaticbarComponent } from './components/top-staticbar/top-staticbar.component';
import { CustomMenuComponent } from './components/custom-menu/custom-menu.component';
import { AisSearchComponent } from '../shared/components/ais-search/ais-search.component';
import { GgMapComponent } from './components/gg-map/gg-map.component';

@NgModule({
  declarations: [
    AltComponent,
    LongDescComponent,
    AdaImageComponent,
    ClockComponent,
    NewsComponent,
    EventComponent,
    QuoteSliderComponent,
    SideBarComponent,
    AdaBannerComponent,
    SearchComponent,
    CustomDropdownComponent,
    CustomUploadComponent,
    NewsletterSignupComponent,

    StripHtmlPipe,
    SafeHtmlPipe,

    PatternDirective,
    PhoneMaskDirective,
    PoliceSidebarComponent,
    TopStaticbarComponent,
    CustomMenuComponent,
    AisSearchComponent,
    GgMapComponent,
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    NgbModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    RouterModule,
  ],
  exports: [
    AdaImageComponent,
    ClockComponent,
    SideBarComponent,
    AdaBannerComponent,
    SearchComponent,
    CustomDropdownComponent,
    CustomUploadComponent,
    NewsletterSignupComponent,
    TopStaticbarComponent,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,

    StripHtmlPipe,
    SafeHtmlPipe,
    GgMapComponent,
    PatternDirective,
    PhoneMaskDirective,
    PoliceSidebarComponent,
    CustomMenuComponent,
    AisSearchComponent,
  ],
})
export class SharedModule {}
