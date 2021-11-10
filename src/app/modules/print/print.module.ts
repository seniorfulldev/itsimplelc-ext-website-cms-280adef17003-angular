import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from '../../core/core.module';
import { PrintComponent } from './print.component';
import { PrintRoutingModule } from './print-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PrintComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    CoreModule,
    PrintRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class PrintModule {}
