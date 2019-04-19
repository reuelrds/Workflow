import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { MaterialModule } from './../../../../../../../../shared/material.module';
import { AddUserDialogComponent } from './add-user-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import * as fromUser from '../../store/user.reducers';
import * as UserAtions from '../../store/user.actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AddUserDialogComponent', () => {
  let component: AddUserDialogComponent;
  let fixture: ComponentFixture<AddUserDialogComponent>;
  let store: Store<fromUser.State>;
  const actions: Observable<any> = of(null);

  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [ AddUserDialogComponent],
      providers: [
        FormBuilder,
        provideMockStore({initialState}),
        provideMockActions(() => actions),
        provideMockStore({}),
        {provide: MAT_DIALOG_DATA, useValue: {
          users: of(null),
          departments: of(null),
          locations: of(null),
          groups: of(null)
        }}
      ],
    }).compileComponents();
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

  xit('should dispatch an action when the form is submitted', () => {

    const initialValue = {
      firstName: 'Test',
      lastName: 'Lmane',
      email: 'test@email.com',
      manager: '',
      department: '',
      location: '',
      group: ''
    };
    component.addUserForm.setValue(initialValue);
    component.onSubmitAddUser();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: UserAtions.ActionTypes.TryAddUser,
      payload: {
        firstName: initialValue.firstName,
        lastName: initialValue.lastName,
        email: initialValue.email
      }
    });
  });
});
