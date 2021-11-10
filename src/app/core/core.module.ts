import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent, MobileMenuComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    SlickCarouselModule,
    MatIconModule
  ],
  exports: [HeaderComponent, FooterComponent, MenuComponent]
})
export class CoreModule {}
