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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule
  ],
  declarations: [
    NavComponent,
    FormUnderlineComponent,
    InvalidUnderlineDirective,
    StrokeColorDirective,
    TimesPipe,
    ErrorComponent,
    DecodeHtmlStringsPipe
  ],
  exports: [
    NavComponent,
    FormUnderlineComponent,
    InvalidUnderlineDirective,
    StrokeColorDirective,
    TimesPipe,
    DecodeHtmlStringsPipe
  ],
  entryComponents: [
    ErrorComponent
  ]
})
export class SharedModule { }
