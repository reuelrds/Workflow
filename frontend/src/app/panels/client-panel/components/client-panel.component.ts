import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../../shared/models/user';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

import * as fromApp from './../../../store/app.reducers';
import * as AuthActions from './../../../auth/store/auth.actions';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.scss']
})
export class ClientPanelComponent implements OnInit {

  user: User = {firstName: '', lastName: '' , email: ''};


  constructor(private userService: UserService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

  onLogout() {
    this.store.dispatch({
      type: AuthActions.ActionTypes.Logout
    });
  }

}
