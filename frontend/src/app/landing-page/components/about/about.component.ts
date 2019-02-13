import { Component, OnInit } from '@angular/core';
import { AboutData } from './../../../shared/models/about-text';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  content: AboutData;

  constructor() {}

  ngOnInit() {
    this.content = {
      aboutText: [
        {
          iconClass: 'hand-drag1',
          title: 'Drag. Drog. Done',
          content:
            // tslint:disable-next-line:max-line-length
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima pariatur numquam accusamus est quaerat ! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, similique.'
        },
        {
          iconClass: 'dashboard',
          title: 'Amazing Dashboard',
          content:
            // tslint:disable-next-line:max-line-length
            'Lorem ipsum dolor, sit amet consees accusamus eveniet unde dolore eaque. Autem, ipsa dolorem dignissimos mollitia quod amet doloribus hic laudantium tenetur laborum non'
        }
      ],
      aboutComposition: [
        { imgPath: 'apps.png' },
        { imgPath: 'draganddrop.png' },
        { imgPath: 'reports.png' }
      ]
    };
  }
}
