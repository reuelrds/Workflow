import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { UserManagementDialogComponent } from './user-management-dialog.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as fromUser from '../../store/users/user.reducers';
import * as UserAtions from '../../store/users/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { Observable, of } from 'rxjs';



const initialValue = {
  firstName: 'Test',
  lastName: 'Lmane',
  email: 'test@email.com',
  manager: '',
  department: '',
  location: ''
};

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({value: initialValue})
    };
  }

  close() {}
}

describe('UserManagementDialogComponent', () => {
  let component: UserManagementDialogComponent;
  let fixture: ComponentFixture<UserManagementDialogComponent>;

  let store: Store<fromUser.State>;
  let dialog: MatDialogMock;

  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ UserManagementDialogComponent ],
      providers: [{provide: MatDialog, useClass: MatDialogMock}, provideMockStore({initialState})]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementDialogComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    dialog = TestBed.get(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action when the form is submitted', () => {

    spyOn(dialog, 'open').and.callThrough();
    component.openAddUserDialog();
    dialog.close();
    component.addUserDialog.afterClosed().subscribe(result => {
      console.log(result);
      expect(result.value).toEqual(initialValue);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: UserAtions.ActionTypes.TryAddUser,
        payload: result.value
      });
    });
  });
});
