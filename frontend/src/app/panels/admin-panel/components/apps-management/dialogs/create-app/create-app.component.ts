import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit {
  templateTitle = 'Untitled';
  isAppDetailsFilled = false;
  isFormDesignCompleted = false;

  @ViewChild(MatStepper) stepper: MatStepper;

  app = {
    details: {
      name: '',
      shortDescription: '',
      longDescription: ''
    },
    formDesign: {}
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onUpdateDetaails(event) {
    if (event) {
      this.app.details = event;
      this.isAppDetailsFilled = true;
      console.log(event);
      console.log(this.app);
    }
  }

  updateFormDesign(event) {
    if (event) {
      this.app.formDesign = event;
      this.isFormDesignCompleted = true;
      console.log(event);
      console.log(this.app);
    }
  }

}
