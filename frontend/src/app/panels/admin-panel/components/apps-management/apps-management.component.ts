import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateAppComponent } from './dialogs/create-app/create-app.component';

@Component({
  selector: 'app-apps-management',
  templateUrl: './apps-management.component.html',
  styleUrls: ['./apps-management.component.scss', './apps-management-theme.component.scss']
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

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onClick(event) {
    console.log(event.target.innerText);
    this.selectedCategory = event.target.innerText;
  }

  onCreateNewApp() {
    this.dialog.open(CreateAppComponent, {
      width: '80vw',
      height: '85vh',
    });
  }
}
