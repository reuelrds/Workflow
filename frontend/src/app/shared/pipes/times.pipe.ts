import { Pipe, PipeTransform } from '@angular/core';


/**
 * Times Pipe is used to generate an array for ngFor to iterate over.
 *
 * This is used when we have to generate elements a specific number of times
 * using ngFor and we do not have an iterable for ngFor to iterate over.
 *
 *
 * @example
 *
 * usage:
 * <div *ngFor="let x of 3| times" class="repeat foo{{ x }}"> bar {{ x }}</div>
 *
 * output:
 *
 * <div class="repeat foo1">bar 1</div>
 * <div class="repeat foo2">bar 2</div>
 * <div class="repeat foo3">bar 3</div>
 */

@Pipe({
  name: 'times'
})

export class TimesPipe implements PipeTransform {

  /**
   *
   * Generates an array of numbers
   *
   * @param {number | string} value length of desired array
   * @returns An Array of numbers starting from 0 to input value
   */
  transform(value: number | string): any {
    console.log('REGEGErfe' + value);
    if (!value) {
      return value;
    } else if (typeof value !== 'number') {
      throw new Error ('Invalid Input: Expected a \'number\'. Got a \'string\'');
    } else if (value < 0) {
      throw new Error ('Invalid Input: Expected value to be greater than or equal to 1');
    } else {
    const iterable = [];
    for (let index = 1; index <= value; index++) {
      iterable.push(index);

    }
    console.log('vferfe' + iterable);
    return iterable;
  }
  }

}
