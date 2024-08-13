import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TIME_FORMAT_PATTERNS } from '../../../../src/app/shared/helpers/constants';
import { DigitalClockComponent } from './digital-clock.component';
import { DigitalSegmentComponent } from './digital-segment/digital-segment.component';
import { SharedModule } from '../../../../src/app/shared/shared.module';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalClockComponent, DigitalSegmentComponent],
      imports: [SharedModule]
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
    
    const expectedHour = twelveHours.toString().padStart(2, '0');
    const expectedMinute = now.getMinutes().toString().padStart(2, '0');
    const expectedSecond = now.getSeconds().toString().padStart(2, '0');
    
    expect(component.timeDigits.firstHourDigit).toBe(expectedHour.charAt(0));
    expect(component.timeDigits.secondHourDigit).toBe(expectedHour.charAt(1));
    expect(component.timeDigits.firstMinuteDigit).toBe(expectedMinute.charAt(0));
    expect(component.timeDigits.secondMinuteDigit).toBe(expectedMinute.charAt(1));
    expect(component.timeDigits.firstSecondDigit).toBe(expectedSecond.charAt(0));
    expect(component.timeDigits.secondSecondDigit).toBe(expectedSecond.charAt(1));
  });

  it('should stop updating time when component is destroyed', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    fixture.detectChanges();
    const timeBeforeDestruction = {
      hours: component.timeDigits.firstHourDigit + component.timeDigits.secondHourDigit,
      minutes: component.timeDigits.firstMinuteDigit + component.timeDigits.secondMinuteDigit,
      seconds: component.timeDigits.firstSecondDigit + component.timeDigits.secondSecondDigit
    };

    component.ngOnDestroy();
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    
    const timeAfterDestruction = {
      hours: component.timeDigits.firstHourDigit + component.timeDigits.secondHourDigit,
      minutes: component.timeDigits.firstMinuteDigit + component.timeDigits.secondMinuteDigit,
      seconds: component.timeDigits.firstSecondDigit + component.timeDigits.secondSecondDigit
    };
    
    expect(timeAfterDestruction).toEqual(timeBeforeDestruction);
  }));
});
