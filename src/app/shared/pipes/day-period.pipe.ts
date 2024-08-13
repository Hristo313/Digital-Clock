import { Pipe, PipeTransform } from '@angular/core';
import { TIME_FORMAT_PATTERNS } from '../helpers/constants';

@Pipe({ name: 'dayPeriod' })
export class DayPeriodPipe implements PipeTransform {

  transform(input: Date): string {
    if (!input) return '';

    const hours = input.getHours();
    return hours < 12 ? TIME_FORMAT_PATTERNS.AM : TIME_FORMAT_PATTERNS.PM;
  }
}