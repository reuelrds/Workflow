import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit {

  templateTitle = 'Untitled';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  app = {
    details: {
      name: '',
      shortDescription: '',
      longDescription: ''
    }
  };

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onUpdateDetaails(event) {
    if (event) {
      this.app.details = event;
      console.log(event);
      console.log(this.app);
    }
  }

}
