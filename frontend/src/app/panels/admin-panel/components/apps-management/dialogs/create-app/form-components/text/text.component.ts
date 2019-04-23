import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() name;
  @Input() placeholder;
  @Input() isRequired;

  @Output() value = new EventEmitter();

  @ViewChild(MatInput) input: MatInput;

  constructor() { }

  ngOnInit() {
    console.log(this.placeholder);
    console.log(this.name);
    console.log(this.isRequired);
    console.log(this.input);
  }

}
