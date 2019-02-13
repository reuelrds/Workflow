import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule, MatDialogModule, MatButtonModule, MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
