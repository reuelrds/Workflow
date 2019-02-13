import { Directive, ElementRef, OnInit, Input, OnChanges } from '@angular/core';

/**
 * Reflects whether the form field is valid or invalid.
 *
 * It does this by changing the color of form input underline to red for invalid or primary-color for valid entry.
 *
 * @param {boolean} invalidUnderline A boolean vaue which tells us whether the input field is valid or not.
 */

@Directive({
  selector: '[invalidUnderline]'
})

export class InvalidUnderlineDirective implements OnChanges {

  elements = [];

  @Input() invalidUnderline: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.elements = Array.from(
      this.el.nativeElement.getElementsByTagName('path')
    );

    this.elements.forEach((element: HTMLElement, index) => {
      if (this.invalidUnderline) {
        element.style.stroke = '#f00';
      } else {
        if (index === 0) { element.style.stroke = '#000'; } else { element.style.stroke = '#008EA2'; }
      }
    });
  }
}
