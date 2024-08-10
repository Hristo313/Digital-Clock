import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { INPUT_TIME_FORMATS, TIME_FORMAT_PATTERNS } from './shared/helpers/constants';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, DigitalClockComponent],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct default title', () => {
    expect(component.title).toBe('Digital Clock');
  });

  it('should have the default selected format set correctly', () => {
    expect(component.selectedFormat).toBe(TIME_FORMAT_PATTERNS.DEFAULT_TIME_FORMAT);
  });

  it('should initialize formats correctly', () => {
    expect(component.formats).toEqual(INPUT_TIME_FORMATS);
  });
});