import { Component, OnInit } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss'],
  animations: [
    trigger('slideIn', [
      state('false', style({
        transform: 'translate3d(100%, 0, 0)',
        opacity: 0,
        display: 'none'
      })),
      state('true', style({
        transform: 'translate3d(0,0,0)',
        // opacity: '100%'
      })),
      transition('false <=> true', animate('500ms ease-in-out')),
    ])
  ]
})
export class TableSearchComponent implements OnInit {

  searchBox: FormControl;
  isSearchBoxVisible = false;
  isSearchBoxIconVisible = true;

  constructor() { }

  ngOnInit() {
    this.searchBox = new FormControl('');
  }

  searchUsers() {
    console.log(this.searchBox.value);
  }

  showSearchBox() {
    this.isSearchBoxIconVisible = false;
    this.isSearchBoxVisible = true;
  }

  hideSearchBox() {
    this.isSearchBoxVisible = false;
    this.isSearchBoxIconVisible = true;
  }

}
