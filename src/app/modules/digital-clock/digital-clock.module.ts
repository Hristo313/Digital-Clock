import { NgModule } from '@angular/core';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { DigitalSegmentComponent } from './digital-clock/digital-segment/digital-segment.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DigitalClockComponent,
    DigitalSegmentComponent
  ],
  imports: [SharedModule],
  exports: [DigitalClockComponent]
})
export class DigitalClockModule { }
