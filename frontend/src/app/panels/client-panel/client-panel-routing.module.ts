import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientPanelComponent } from './components/client-panel.component';

const CLIENT_PANEL_ROUTES: Routes = [
  {path: '', component: ClientPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(CLIENT_PANEL_ROUTES)],
  exports: [RouterModule]
})
export class ClientPanelRoutingModule { }
