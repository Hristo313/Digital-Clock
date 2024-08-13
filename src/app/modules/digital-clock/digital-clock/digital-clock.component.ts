import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TIME_FORMAT_PATTERNS } from '../../../shared/helpers/constants';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrl: './digital-clock.component.css',
})
export class DigitalClockComponent implements OnInit, OnDestroy {
  @Input() currentTimeFormat: string = TIME_FORMAT_PATTERNS.DEFAULT_TIME_FORMAT;
  public firstHourDigit: string = '';
  public secondHourDigit: string = '';
  public firstMinuteDigit: string = '';
  public secondMinuteDigit: string = '';
  public firstSecondDigit: string = '';
  public secondSecondDigit: string = '';
  public periodOfDay: string = '';
  public showPeriodOfDay: boolean = false;
  public showHourDecorations: boolean = false;
  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.updateCurrentTime();
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCurrentTime());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateCurrentTime(): void {
    const now = new Date();
    const twentyFourHours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const twelveHours = twentyFourHours % 12 || 12;

    let formattedTime = this.formatTime(twelveHours, twentyFourHours, minutes, seconds);
    formattedTime = this.handlePeriodOfDay(formattedTime);

    this.assignTimeValues(formattedTime);
  }
  
  private formatTime(twelveHours: number, twentyFourHours: number, minutes: number, seconds: number): string {
    const formatCurrentTime = (number: number, length: number) => number.toString().padStart(length, '0');
  
    return this.currentTimeFormat
      .replace(TIME_FORMAT_PATTERNS.TWELVE_HOURS_WITH_ZERO, formatCurrentTime(twelveHours, 2))
      .replace(TIME_FORMAT_PATTERNS.TWELVE_HOURS_WITHOUT_ZERO, twelveHours.toString())
      .replace(TIME_FORMAT_PATTERNS.TWENTY_FOUR_HOURS_WITH_ZERO, formatCurrentTime(twentyFourHours, 2))
      .replace(TIME_FORMAT_PATTERNS.TWENTY_FOUR_HOURS_WITHOUT_ZERO, twentyFourHours.toString())
      .replace(TIME_FORMAT_PATTERNS.MINUTES_WITH_ZERO, formatCurrentTime(minutes, 2))
      .replace(TIME_FORMAT_PATTERNS.MINUTES_WITHOUT_ZERO, minutes.toString())
      .replace(TIME_FORMAT_PATTERNS.SECONDS_WITH_ZERO, formatCurrentTime(seconds, 2))
      .replace(TIME_FORMAT_PATTERNS.SECONDS_WITHOUT_ZERO, seconds.toString());
  }

  // Skip AM/PM when we don't have 12-hours formats
  private handlePeriodOfDay(formattedTime: string): string {
    if (!this.currentTimeFormat.includes(TIME_FORMAT_PATTERNS.TWELVE_HOURS_WITHOUT_ZERO)) {
      this.showPeriodOfDay = false;
      return formattedTime.replace(TIME_FORMAT_PATTERNS.PERIOD_OF_DAY, '');
    } else {
      this.showPeriodOfDay = true;
      const isAM = new Date().getHours() < 12;
      this.periodOfDay = isAM ? TIME_FORMAT_PATTERNS.AM : TIME_FORMAT_PATTERNS.PM;
      return formattedTime.replace(TIME_FORMAT_PATTERNS.PERIOD_OF_DAY, this.periodOfDay);
    }
  }

  private assignTimeValues(formattedTime: string): void {
    const timeParts = formattedTime.split(':').map(part => part.trim());
  
    if (timeParts.length === 3) {
      this.showHourDecorations = true;
      const [hoursPart, minutesPart, secondsPart] = timeParts;
      this.firstHourDigit = hoursPart.length > 1 ? hoursPart.charAt(0) : '';
      this.secondHourDigit = hoursPart.length > 1 ? hoursPart.charAt(1) : hoursPart.charAt(0);
      this.firstMinuteDigit = minutesPart.length > 1 ? minutesPart.charAt(0) : '';
      this.secondMinuteDigit = minutesPart.length > 1 ? minutesPart.charAt(1) : minutesPart.charAt(0);
  
      const splittedSecondsPart = secondsPart.split(' ');
      this.firstSecondDigit = splittedSecondsPart[0].length > 1 ? splittedSecondsPart[0].charAt(0) : '';
      this.secondSecondDigit = splittedSecondsPart[0].length > 1 ? splittedSecondsPart[0].charAt(1) : splittedSecondsPart[0].charAt(0);
    } else if (timeParts.length === 2) {
      this.showHourDecorations = false;
      const [minutesPart, secondsPart] = timeParts;
      this.firstHourDigit = '';
      this.secondHourDigit = '';
      this.firstMinuteDigit = minutesPart.length > 1 ? minutesPart.charAt(0) : '';
      this.secondMinuteDigit = minutesPart.length > 1 ? minutesPart.charAt(1) : minutesPart.charAt(0);
      this.firstSecondDigit = secondsPart.length > 1 ? secondsPart.charAt(0) : '';
      this.secondSecondDigit = secondsPart.length > 1 ? secondsPart.charAt(1) : secondsPart.charAt(0);
    }
  }
}