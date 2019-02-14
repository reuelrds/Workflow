import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent, pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  // {path: 'admin-panel', loadChildren: './panels/admin-panel/admin-panel.module#AdminPanelModule', canActivate: [AuthGuard]},
  // {path: 'client-panel', loadChildren: './panels/client-panel/client-panel.module#ClientPanelModule', canActivate: [AuthGuard]}
  {path: 'admin-panel', loadChildren: './panels/admin-panel/admin-panel.module#AdminPanelModule'},
  {path: 'client-panel', loadChildren: './panels/client-panel/client-panel.module#ClientPanelModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
