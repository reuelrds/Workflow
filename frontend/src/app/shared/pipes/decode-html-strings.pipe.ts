import { Pipe, PipeTransform } from '@angular/core';

/**
 * Used to Display strings such as HTML Entities correctly
 */

@Pipe({
  name: 'decodeHtmlStrings'
})
export class DecodeHtmlStringsPipe implements PipeTransform {

  transform(value: string): any {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    console.log(tempElement.innerText);
    return tempElement.innerText;
  }

}
