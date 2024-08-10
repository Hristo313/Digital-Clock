import { Component } from '@angular/core';
import { INPUT_TIME_FORMATS, TIME_FORMAT_PATTERNS } from './shared/helpers/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title = 'Digital Clock';
  public selectedFormat: string = TIME_FORMAT_PATTERNS.DEFAULT_TIME_FORMAT;
  public formats = INPUT_TIME_FORMATS;
}