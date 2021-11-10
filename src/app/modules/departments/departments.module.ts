import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbedVideo } from 'ngx-embed-video';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmbedVideo.forRoot()
  ]
})
export class DepartmentsModule { }
