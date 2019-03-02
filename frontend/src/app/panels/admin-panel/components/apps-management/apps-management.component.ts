import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apps-management',
  templateUrl: './apps-management.component.html',
  styleUrls: ['./apps-management.component.scss']
})
export class AppsManagementComponent implements OnInit {

  categories = [
    'All',
    'Accounting & Finance',
    'Human Resources',
    'Sales',
    'Procurement',
    'Administration',
    'Management'
  ];

  selectedCategory = 'All';

  contents = [
    {category: 'Sales', data: 'Sales Works!'},
    {category: 'Management', data: 'Management Works!!'},
    {category: 'Human Resources', data: 'Management Works!!'},
  ];

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    console.log(event.target.innerText);
    this.selectedCategory = event.target.innerText;
  }

}
