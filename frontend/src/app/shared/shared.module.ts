import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { FormUnderlineComponent } from './components/form-underline/form-underline.component';
import { InvalidUnderlineDirective } from './directives/invalid-underline.directive';
import { StrokeColorDirective } from './directives/spinner-stroke.directive';
import { CoreModule } from '../core/core.module';
import { TimesPipe } from './pipes/times.pipe';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from './material.module';
import { DecodeHtmlStringsPipe } from './pipes/decode-html-strings.pipe';
import { TableSearchComponent } from './components/table-search/table-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavComponent,
    FormUnderlineComponent,
    InvalidUnderlineDirective,
    StrokeColorDirective,
    TimesPipe,
    ErrorComponent,
    DecodeHtmlStringsPipe,
    TableSearchComponent
  ],
  exports: [
    NavComponent,
    FormUnderlineComponent,
    InvalidUnderlineDirective,
    StrokeColorDirective,
    TimesPipe,
    DecodeHtmlStringsPipe,
    TableSearchComponent
  ],
  entryComponents: [
    ErrorComponent
  ]
})
export class SharedModule { }
