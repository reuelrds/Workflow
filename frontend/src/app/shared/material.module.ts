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
   MatIconModule,
   MatMenuModule} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
