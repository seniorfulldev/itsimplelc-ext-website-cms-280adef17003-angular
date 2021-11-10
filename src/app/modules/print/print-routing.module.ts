import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouncilMeetingResolver } from 'src/app/resolves/councilMeeting.resolve';
import { CouncilMeetingGeneralInfoResolver } from 'src/app/resolves/councilMeetingGeneralInfo.resolve';
import { PrintComponent } from './print.component';

const routes: Routes = [
  {
    path: '',
    component: PrintComponent,
    resolve: {
      councilmeetings: CouncilMeetingResolver,
      councilmeetingsInfo: CouncilMeetingGeneralInfoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
