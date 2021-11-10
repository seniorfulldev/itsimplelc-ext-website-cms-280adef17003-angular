import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexModule } from './modules/index.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmbedVideoService } from 'ngx-embed-video';
import { PrintModule } from './modules/print/print.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    IndexModule,
    PrintModule,
  ],
  providers: [
    EmbedVideoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
