import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  state,
  transition,
  trigger,
  animate,
  style
} from '@angular/animations';

import { navItems } from './nav-items';

/**
 * Main nav component which is designed to be used across all pages.
 *
 */



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0,0,0)'
        })
      ),
      state(
        'out',
        style({
          transform: '*'
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})


export class NavComponent implements OnInit {
  isHomePage = false;
  menuState = 'out';
  toggleState = false;
  menuItems: any = {};

  @Input() userName: string;
  @Input() panel: string;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.router.url);

    if (this.router.url === '/' || this.router.url.includes('#')) {

      this.isHomePage = true;
      this.menuItems = navItems.homePage;

    } else if (this.router.url === '/auth/signup') {

      this.menuItems = navItems.signupPage;

    } else if (this.router.url === '/auth/login') {

      this.menuItems = navItems.loginPage;

    }
  }

  /**
   * Sets the menu and toggle state when the checkbox is checked
   * to hide or show nav menu when the viewport width is less than 48em
   */
  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    if (this.menuState === 'in') {
      this.toggleState = true;
    } else {
      this.toggleState = false;
    }
  }
}
