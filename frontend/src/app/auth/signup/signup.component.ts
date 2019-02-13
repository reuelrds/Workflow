import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  /**
   * @param { string } selectedForm The current active form
   */
  selectedForm = 'company';

  constructor() { }

  ngOnInit() {
  }

  /**
   * Used to Select Admin or User form
   */
  onClick(event) {
    console.log(event.target.innerText);
    if (event.target.innerText.toLowerCase() === 'employee') {
      this.selectedForm = 'employee';
    } else {
      this.selectedForm = 'company';
    }
  }

}
