import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-text-field',
  templateUrl: './edit-text-field.component.html',
  styleUrls: ['./edit-text-field.component.scss']
})
export class EditTextFieldComponent implements OnInit {

  editTextField: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public fieldData: any
  ) { }

  ngOnInit() {
    console.log(this.fieldData);
    this.editTextField = this.formBuilder.group({
      name: this.fieldData.name,
      placeholder: this.fieldData.placeholder,
      isRequired: this.fieldData.isRequired
    });
  }

  onSubmit() {
    console.log(this.editTextField);
  }

}
