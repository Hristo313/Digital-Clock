import { NgModule } from '@angular/core';
import { DigitalClockComponent } from './digital-clock.component';
import { CommonModule } from '@angular/common';
import { DayPeriodPipe } from '../shared/pipes/day-period.pipe';
import { DigitalSegmentComponent } from './digital-segment/digital-segment.component';

@NgModule({
  declarations: [
    DigitalClockComponent,
    DigitalSegmentComponent,
    DayPeriodPipe
  ],
  imports: [CommonModule],
  exports: [DigitalClockComponent]
})
export class DigitalClockModule { }