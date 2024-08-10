import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DigitalClockComponent } from './digital-clock.component';
import { TIME_FORMAT_PATTERNS } from '../shared/helpers/constants';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalClockComponent]
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
    component.currentTimeFormat = 'hh:mm:ss tt';
    spyOn(component as any, 'setCurrentTime').and.callThrough();;
    const now = new Date();
    const twelveHours = now.getHours() % 12 || 12;
    const periodOfDay = now.getHours() < 12 ? TIME_FORMAT_PATTERNS.AM : TIME_FORMAT_PATTERNS.PM;
    const expectedTime = `${twelveHours.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} ${periodOfDay}`;
    expect(component.currentTime).toBe(expectedTime);
  });

  it('should stop updating time when component is destroyed', fakeAsync(() => {
    component.ngOnInit();
    tick(1000);
    component.ngOnDestroy();
    fixture.detectChanges();
    const timeBeforeDestruction = component.currentTime;
    tick(1000);
    fixture.detectChanges();
    expect(component.currentTime).toBe(timeBeforeDestruction);
  }));
});