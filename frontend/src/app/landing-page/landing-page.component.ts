import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  isLoaded = false;

  constructor() {}

  ngOnInit() {
    /**
     * Checks whether the page was already loaded.
     * This prevents loader from dispaying forever when navigated back to Landing Page
     */
    this.isLoaded = sessionStorage.getItem('isLoaded') === 'true' ? true : false;
  }

  /**
   * Saves that the page was lodedd to the session storage.
   */
  onLoad() {
    this.isLoaded = true;
    console.log(this.isLoaded);
    sessionStorage.setItem('isLoaded', 'true');
  }
}
