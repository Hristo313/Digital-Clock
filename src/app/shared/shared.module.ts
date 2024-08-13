import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayPeriodPipe } from './pipes/day-period.pipe';

@NgModule({
  declarations: [DayPeriodPipe],
  imports: [],
  exports: [
    CommonModule,
    DayPeriodPipe
  ]
})
export class SharedModule { }
