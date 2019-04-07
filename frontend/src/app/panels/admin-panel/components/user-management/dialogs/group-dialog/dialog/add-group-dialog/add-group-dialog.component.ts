import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {

  addGroupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    let name = '';
    let groupId = '';

    if (this.data.group) {
      name = this.data.group.groupName;
      groupId = this.data.group.id;
    }
    this.addGroupForm = this.formBuilder.group({
      groupName: name,
      id: groupId
    });
  }
}
