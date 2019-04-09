import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { startWith, map, filter, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {

  addGroupForm: FormGroup;
  filteredUsers: Observable<User[]>;
  groupMembers: User[] = [];

  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

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
      id: groupId,
      member: ''
    });

    console.log(this.data.users);
    this.filteredUsers = this.addGroupForm.get('member').valueChanges.pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : `${value.firstName} ${value.lastName}`),
      map(value => this._filter(value))
    );
  }

  onSubmit() {
    console.log(this.addGroupForm);
  }

  displayFn(user?: User): string | undefined {
    // console.log(user);
    return user ? `${user.firstName} ${user.lastName}` : undefined;
  }

  add(event: MatChipInputEvent ): void {
    // Add member only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add new member
      if ((value || '').trim()) {
        this.data.users.pipe(
          tap((users: User[]) => {
            const newGroupMember = users.find(user => `${user.firstName} ${user.lastName}` === value);
            this.groupMembers.push(newGroupMember);
          })
        );
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.addGroupForm.get('member').setValue('');
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.groupMembers.push(event.option.value);
    this.memberInput.nativeElement.value = '';
    this.addGroupForm.get('member').setValue('');
  }

  remove(member: User): void {
    const index = this.groupMembers.indexOf(member);

    if (index >= 0) {
      this.groupMembers.splice(index, 1);
    }
    console.log(this.groupMembers);
  }

  ed(event) {
    console.log(event);
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();
    // console.log(filterValue);
    let filteredUsers;
    this.data.users.pipe(
      map((users: User[]) => users.filter(user => {
        return `${user.firstName} ${user.lastName}`.toLowerCase().includes(filterValue);
      }))
    ).subscribe(res => filteredUsers = res);
    return filteredUsers;
  }
}
