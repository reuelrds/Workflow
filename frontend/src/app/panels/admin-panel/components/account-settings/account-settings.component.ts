import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HelperService } from '../../../../core/services/helper.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {


  accountSettings: FormGroup;
  holidaySettings: FormGroup;
  workDaySettings: FormGroup;

  dateFormats = [
    {id: '1', type: 'dd / mm / yyyy', hint: '31/12/2019'},
    {id: '2', type: 'mm / dd / yyyy', hint: '12/31/2019'},
    {id: '3', type: 'yyyy / mm / dd', hint: '2019/12/31'},
    {id: '4', type: 'Month d, Yr', hint: 'December 31 , 2019'},
  ];

  currencyFormats = [
    {id: '1', type: '&#8377;'},
    {id: '2', type: '&dollar;'},
    {id: '3', type: '&euro;'},
    {id: '4', type: '&pound'},
    {id: '5', type: '&yen'},
  ];

  languageFormats = [
    {id: '1', type: 'English'},
    {id: '2', type: 'français'},
    {id: '3', type: 'Deutsche'},
    {id: '4', type: '日本人'},
  ];

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  leaves = [
  ];

  selectedDate = this.dateFormats[0].id;
  companyName = 'Creative Engineers';

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.accountSettings = this.formBuilder.group({
      companyName: this.companyName,
      dateFormat: this.dateFormats[3],
      currency: this.currencyFormats[0],
      language: this.languageFormats[0]
    });

    this.holidaySettings = this.formBuilder.group({
      date: '',
      name: ''
    });

    this.workDaySettings = this.formBuilder.group({
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false
    });
    console.log(this.accountSettings);
    console.log(this.workDaySettings);
    console.log(this.holidaySettings);
    console.log(this.leaves.length);
  }

  onSubmitAccountSettings() {
    console.log(this.accountSettings);
    console.log('Its here');
  }

  onResetAccountSettings() {
    console.log('reesting');
    this.accountSettings.reset();
  }

  onSubmitWorkDays() {
    console.log('ce');
    console.log(this.workDaySettings);

  }

  onResetWorkDays() {
    this.workDaySettings.reset();
  }

  onSubmitHolidays() {
    console.log('ce');
    console.log(this.holidaySettings);

  }

  onResetHolidays() {
    this.holidaySettings.reset();
  }
}
