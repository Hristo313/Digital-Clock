import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-digital-segment',
  templateUrl: './digital-segment.component.html',
  styleUrl: './digital-segment.component.css'
})
export class DigitalSegmentComponent {
  @Input() digit: string = '';
  private segmentMap: { [key: string]: string[] } = {
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'd', 'e', 'g'],
    '3': ['a', 'b', 'c', 'd', 'g'],
    '4': ['b', 'c', 'f', 'g'],
    '5': ['a', 'c', 'd', 'f', 'g'],
    '6': ['a', 'c', 'd', 'e', 'f', 'g'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g']
  };

  public isSegmentActive(segment: string): boolean {
    return this.segmentMap[this.digit]?.includes(segment) || false;
  }
}