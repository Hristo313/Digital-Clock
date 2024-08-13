import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TIME_FORMAT_PATTERNS } from '../../../../src/app/shared/helpers/constants';

@Component({
  selector: 'lib-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrl: './digital-clock.component.css',
})
export class DigitalClockComponent implements OnInit, OnDestroy {
  @Input() currentTimeFormat: string = TIME_FORMAT_PATTERNS.DEFAULT_TIME_FORMAT;
  public timeDigits = {
    firstHourDigit: '',
    secondHourDigit: '',
    firstMinuteDigit: '',
    secondMinuteDigit: '',
    firstSecondDigit: '',
    secondSecondDigit: ''
  };
  public currentTime: Date = new Date();
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

    const formattedTime = this.formatTime(twelveHours, twentyFourHours, minutes, seconds);

    this.currentTime = now;
    this.showPeriodOfDay = this.currentTimeFormat.includes(TIME_FORMAT_PATTERNS.TWELVE_HOURS_WITHOUT_ZERO);

    this.updateTimeDigits(formattedTime);
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
      .replace(TIME_FORMAT_PATTERNS.SECONDS_WITHOUT_ZERO, seconds.toString())
      .replace(TIME_FORMAT_PATTERNS.PERIOD_OF_DAY, '');
  }

  private updateTimeDigits(formattedTime: string): void {
    const timeParts = formattedTime.split(':').map(part => part.trim());

    if (timeParts.length === 3) {
      this.showHourDecorations = true;
      this.setTimeDigitsFromParts(timeParts, true);
    } else if (timeParts.length === 2) {
      this.showHourDecorations = false;
      this.setTimeDigitsFromParts(timeParts, false);
    }
  }

  private setTimeDigitsFromParts(timeParts: string[], includeHours: boolean): void {
    const [hoursPart, minutesPart, secondsPart] = includeHours ? timeParts : ['', ...timeParts];
    
    this.timeDigits.firstHourDigit = hoursPart.length > 1 ? hoursPart.charAt(0) : '';
    this.timeDigits.secondHourDigit = hoursPart.length > 1 ? hoursPart.charAt(1) : hoursPart.charAt(0);
    
    this.timeDigits.firstMinuteDigit = minutesPart.length > 1 ? minutesPart.charAt(0) : '';
    this.timeDigits.secondMinuteDigit = minutesPart.length > 1 ? minutesPart.charAt(1) : minutesPart.charAt(0);
    
    this.timeDigits.firstSecondDigit = secondsPart.length > 1 ? secondsPart.charAt(0) : '';
    this.timeDigits.secondSecondDigit = secondsPart.length > 1 ? secondsPart.charAt(1) : secondsPart.charAt(0);
  }
}
