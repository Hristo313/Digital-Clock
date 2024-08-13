import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../src/app/shared/shared.module';
import { DigitalSegmentComponent } from './digital-segment/digital-segment.component';
import { DigitalClockComponent } from './digital-clock.component';

@NgModule({
  declarations: [
    DigitalClockComponent,
    DigitalSegmentComponent
  ],
  imports: [SharedModule],
  exports: [DigitalClockComponent]
})
export class DigitalClockModule { }