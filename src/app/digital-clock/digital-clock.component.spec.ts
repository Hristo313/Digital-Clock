import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DigitalClockComponent } from './digital-clock.component';
import { TIME_FORMAT_PATTERNS } from '../shared/helpers/constants';
import { DigitalSegmentComponent } from './digital-segment/digital-segment/digital-segment.component';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalClockComponent, DigitalSegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default time format as HH:mm:ss tt', () => {
    expect(component.currentTimeFormat).toBe(TIME_FORMAT_PATTERNS.DEFAULT_TIME_FORMAT);
  });

  it('should format time correctly with 12-hour format with AM/PM', () => {
    component.currentTimeFormat = 'hh:mm:ss tt'; // 12-hour format with AM/PM
    spyOn(component as any, 'updateCurrentTime').and.callThrough();
    fixture.detectChanges();
    
    const now = new Date();
    const twelveHours = now.getHours() % 12 || 12;
    const periodOfDay = now.getHours() < 12 ? TIME_FORMAT_PATTERNS.AM : TIME_FORMAT_PATTERNS.PM;
    
    const expectedHour = twelveHours.toString().padStart(2, '0');
    const expectedMinute = now.getMinutes().toString().padStart(2, '0');
    const expectedSecond = now.getSeconds().toString().padStart(2, '0');
    
    expect(component.firstHourDigit).toBe(expectedHour.charAt(0));
    expect(component.secondHourDigit).toBe(expectedHour.charAt(1));
    expect(component.firstMinuteDigit).toBe(expectedMinute.charAt(0));
    expect(component.secondMinuteDigit).toBe(expectedMinute.charAt(1));
    expect(component.firstSecondDigit).toBe(expectedSecond.charAt(0));
    expect(component.secondSecondDigit).toBe(expectedSecond.charAt(1));
    expect(component.periodOfDay).toBe(periodOfDay);
  });

  it('should stop updating time when component is destroyed', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();
    const timeBeforeDestruction = {
      hours: component.firstHourDigit + component.secondHourDigit,
      minutes: component.firstMinuteDigit + component.secondMinuteDigit,
      seconds: component.firstSecondDigit + component.secondSecondDigit
    };

    component.ngOnDestroy();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    
    const timeAfterDestruction = {
      hours: component.firstHourDigit + component.secondHourDigit,
      minutes: component.firstMinuteDigit + component.secondMinuteDigit,
      seconds: component.firstSecondDigit + component.secondSecondDigit
    };
    
    expect(timeAfterDestruction).toEqual(timeBeforeDestruction);
  }));
});