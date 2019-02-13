import { Component, OnInit } from '@angular/core';
import { FooterLink } from '../../../shared/models/footer-text';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  links: FooterLink[];

  constructor() { }

  ngOnInit() {
    this.links = [
      {path: '#', text: 'Company'},
      {path: '#', text: 'Contact Us'},
      {path: '#', text: 'Carrers'},
      {path: '#', text: 'Privacy Policy'},
      {path: '#', text: 'Terms'},
    ];
  }

}
