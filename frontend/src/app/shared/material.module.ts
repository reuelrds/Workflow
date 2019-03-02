import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule,
   MatDialogModule,
   MatButtonModule,
   MatToolbarModule,
   MatTabsModule,
   MatCardModule,
   MatSelectModule,
   MatFormFieldModule,
   MatInputModule,
   MatSlideToggleModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatSidenavModule,
   MatDividerModule,
   MatRippleModule,
   MatExpansionModule,
   MatIconModule} from '@angular/material';

@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatRippleModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
