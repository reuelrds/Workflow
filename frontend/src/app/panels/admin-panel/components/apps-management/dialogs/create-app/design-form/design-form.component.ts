import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { map } from './component-to-string.map';
import { MatDialog } from '@angular/material';
import { EditTextFieldComponent } from '../form-components/text/edit-text-field/edit-text-field.component';

@Component({
  selector: 'app-design-form',
  templateUrl: './design-form.component.html',
  styleUrls: ['./design-form.component.scss']
})
export class DesignFormComponent implements OnInit {

  @Input() appDetails;
  @Output() newFormDesign = new EventEmitter();
  @ViewChild(CdkDrag) drag: CdkDragEnd;

  componentMap = map;

  elements = [
    {icon: 'title', name: 'Text'},
    {icon: 'format_align_left', name: 'Text Area'},
    {icon: 'plus_one', name: 'Number'},
    {icon: 'attach_money', name: 'Currency'},
    {icon: 'date_range', name: 'Date'},
    {icon: 'toggle_off', name: 'Yes/No'},
    {icon: 'keyboard_arrow_down', name: 'Dropdown'},
    {icon: 'check', name: 'Check Box'},
    {icon: 'code', name: 'Rich Text'},
  ];

  advelements = [
    {icon: 'attachment', name: 'Attachment'},
    {icon: 'search', name: 'Lookup'},
  ];

  sections = [
    {name: 'Untitled', hint: 'Here\'s some help text. Try to use it well', fields: [
      {type: 'Text', inputs: {name: 'untitled', placeholder: 'Untitled', isRequired: true}}
    ]}
  ];

  newSectionTemplate = {name: 'Untitled', hint: 'Here\'s some help text. Try to use it well', fields: []};

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  updateSectionNameValue(sectionIndex, event) {
    console.log(event);
    this.sections[sectionIndex].name = event.target.value;
    console.log(this.sections);
  }

  updateSectionHintValue(sectionIndex, event) {
    console.log(event);
    this.sections[sectionIndex].hint = event.target.value;
    // console.log(this.sections);
  }

  addNewSection() {
    this.sections.push(this.newSectionTemplate);
    console.log(this.sections);
  }

  drop(event) {
    console.log(event);
    const elementType = event.item.element.nativeElement.innerText.split('\n')[1];
    const sectionIndex = event.container.data;

    if (elementType === 'Text') {
      this.sections[sectionIndex].fields.push({
        type: 'Text',
        inputs: {
          name: 'untitled',
          placeholder: 'Untitled',
          isRequired: false
        }
      });
    }

    console.log(this.sections);
  }

  updateSectionData() {
    this.newFormDesign.emit(this.sections);
  }

  openEditFieldDialog(event, fieldType, sectionIndex, fieldIndex) {
    switch (fieldType) {
      case 'Text': {
        const diagRef = this.dialog.open(EditTextFieldComponent, {
          minHeight: 'min-content',
          minWidth: 'max-content',
          data: this.sections[sectionIndex].fields[fieldIndex].inputs
        });
        diagRef.afterClosed().subscribe(result => {
          console.log(result);
          this.sections[sectionIndex].fields[fieldIndex].inputs = result;
        });
        break;
      }
    }
  }

}
