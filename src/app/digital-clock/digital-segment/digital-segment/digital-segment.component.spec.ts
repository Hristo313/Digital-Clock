import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalSegmentComponent } from './digital-segment.component';
import { By } from '@angular/platform-browser';

describe('DigitalSegmentComponent', () => {
  let component: DigitalSegmentComponent;
  let fixture: ComponentFixture<DigitalSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalSegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate correct segments for digit 0', () => {
    component.digit = '0';
    fixture.detectChanges();
    const activeSegments = ['a', 'b', 'c', 'd', 'e', 'f'];
    activeSegments.forEach(segment => {
      const segmentElement = fixture.debugElement.query(By.css(`use.segment.${segment}`));
      expect(segmentElement).toBeTruthy();
      expect(segmentElement.nativeElement.classList).toContain('active');
    });
  });

  it('should not activate any segments for an invalid digit', () => {
    component.digit = 'invalid';
    fixture.detectChanges();
    const allSegments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    allSegments.forEach(segment => {
      const segmentElement = fixture.debugElement.query(By.css(`use.segment.${segment}`));
      expect(segmentElement).toBeTruthy();
      expect(segmentElement.nativeElement.classList).not.toContain('active');
    });
  });
});