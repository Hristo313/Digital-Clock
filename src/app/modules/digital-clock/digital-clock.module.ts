import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { DigitalSegmentComponent } from './digital-clock/digital-segment/digital-segment.component';

@NgModule({
  declarations: [
    DigitalClockComponent,
    DigitalSegmentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DigitalClockComponent]
})
export class DigitalClockModule { }
