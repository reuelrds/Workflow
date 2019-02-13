import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel.component';

const ADMIN_PANEL_ROTUES: Routes = [
  {path: '', component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_PANEL_ROTUES)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
