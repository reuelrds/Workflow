import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from './../../../../../../../../shared/material.module';
import { AddUserDialogComponent } from './add-user-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import * as fromUser from '../../../../../../store/users/user.reducers';
import * as UserAtions from '../../../../../../store/users/user.actions';

describe('AddUserDialogComponent', () => {
  let component: AddUserDialogComponent;
  let fixture: ComponentFixture<AddUserDialogComponent>;
  let store: Store<fromUser.State>;

  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [ AddUserDialogComponent],
      providers: [FormBuilder, provideMockStore({initialState})]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action when the form is submitted', () => {

    const initialValue = {
      firstName: 'Test',
      lastName: 'Lmane',
      email: 'test@email.com',
      manager: '',
      department: '',
      location: ''
    };
    component.addUserForm.setValue(initialValue);
    component.onSubmitAddUser();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: UserAtions.ActionTypes.TryAddUser,
      payload: initialValue
    });
  });
});
