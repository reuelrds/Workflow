import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fill-form-details',
  templateUrl: './fill-form-details.component.html',
  styleUrls: ['./fill-form-details.component.scss']
})
export class FillFormDetailsComponent implements OnInit {

  @Input() appDetails;
  @Output() newAppDetails = new EventEmitter();

  addDetails: FormGroup;
  maxAppNameLength = 15;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.addDetails = this.formBuilder.group({
      name: [this.appDetails.name, [Validators.required, Validators.maxLength(this.maxAppNameLength)]],
      shortDescription: [this.appDetails.shortDescription, Validators.required],
      longDescription: this.appDetails.longDescription
    });

  }

  onSubmit() {
    console.log(this.addDetails);
    if (this.addDetails.valid) {
      this.newAppDetails.emit(this.addDetails.value);
    }
  }
}
