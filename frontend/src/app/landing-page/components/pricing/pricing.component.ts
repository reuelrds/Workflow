import { Component, OnInit } from '@angular/core';
import { PricingData } from '../../../shared/models/pricing-text';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  plans: PricingData[];

  constructor() {}

  ngOnInit() {
    this.plans = [
      {
        heading: 'Lite',
        subHeading:
          'Our basic version for teams that are just getting started.',
        details: [
          'Unlimited tasks, projects, and conversations',
          'Up to 15 team members',
          'Basic Search'
        ],
        price: 'Free'
      },
      {
        heading: 'Premium',
        subHeading: 'Powerful enough to run your entire business.',
        details: [
          'No team member limit',
          'Advanced search & reporting',
          'Admin controls',
          'Priority support'
        ],
        price: '$600'
      },
      {
        heading: 'Enterprise',
        subHeading: 'All the power of Premium, plus more control and support.',
        details: [
          'Manage team members with advanced admin controls like service accounts and SAML.',
          'Get specialized help from our customer success team, plus same day support to ensure you’re successful.',
          'Get early access to Portfolios to help track the status of important projects'
        ],
        price: '$1350'
      }
    ];
  }
}
