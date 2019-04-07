import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.component.html',
  styleUrls: ['./add-location-dialog.component.scss']
})
export class AddLocationDialogComponent implements OnInit {

  addLocationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    let name = '';
    let headId = '';
    let locationId = '';

    if (this.data.location) {
      name = this.data.location.locationName;
      headId = this.data.location.locationHead;
      locationId = this.data.location.id;
    }
    this.addLocationForm = this.formBuilder.group({
      locationName: name,
      locationHead: headId,
      id: locationId
    });
  }
}
