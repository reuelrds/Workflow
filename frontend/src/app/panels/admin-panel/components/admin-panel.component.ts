import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { Admin } from '../../../shared/models/admin';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  admin: Admin = {name: '' , email: ''};


  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit() {
    this.adminService.getAdminData().subscribe(res => {
      console.log(res);
      this.admin = res;
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
