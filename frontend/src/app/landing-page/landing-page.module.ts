import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HeroComponent } from './components/hero/hero.component';
import { LandingPageComponent } from './landing-page.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    HeroComponent,
    LandingPageComponent,
    NewsletterComponent,
    AboutComponent,
    FooterComponent,
    PricingComponent
  ],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: []
})
export class LandingPageModule {}
