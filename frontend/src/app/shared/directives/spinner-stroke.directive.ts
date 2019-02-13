import {
  Directive,
  ElementRef,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  AfterContentChecked,
  AfterViewChecked
} from '@angular/core';

/**
 * This Directive changes the stroke color for mat-spinner.
 *
 * @param {string} strokeColoe A Hexadecimal string representation of the required stroke color
 */
@Directive({
  selector: '[strokeColor]'
})
export class StrokeColorDirective
  implements OnInit, OnChanges, AfterViewChecked {
  element;

  @Input()
  strokeColor;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.element = this.el.nativeElement;
  }

  ngOnChanges() {}

  ngAfterViewChecked() {
    console.log(this.strokeColor);
    this.element.querySelector('circle').style.stroke = this.strokeColor;
  }
}
