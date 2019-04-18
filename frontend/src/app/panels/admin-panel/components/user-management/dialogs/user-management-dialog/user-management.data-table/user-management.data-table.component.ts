import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  Output,
  EventEmitter} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatPaginator,
  MatSort,
  MatTable } from '@angular/material';

import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { Group } from 'src/app/shared/models/group';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-user-management-data-table',
  templateUrl: './user-management.data-table.component.html',
  styleUrls: ['./user-management.data-table.component.scss']
})
export class UserManagementDataTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  selection: SelectionModel<any>;

  /**
   * Input Data to be diaplayed
   */
  @Input() users: Observable<User[]>;
  @Input() groups: Observable<Group[]>;
  @Input() departments: Observable<Department[]>;
  @Input() locations: Observable<Location[]>;

  /**
   * Columns displayed in the table. Columns IDs can be added, removed, or reordered.
   */
  @Input() displayedColumns: string[];

  @Output() updateManager = new EventEmitter();
  @Output() updateGroup = new EventEmitter();
  @Output() updateDepartment = new EventEmitter();
  @Output() updateLocation = new EventEmitter();

  dataSource: Observable<User[]>;

  initialSelection = [];
  allowMultiSelect = true;

  constructor() {}

  ngOnInit() {
    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
    // console.log(this.data);
  }

  ngOnChanges() {
    this.dataSource = this.users.pipe(
      map(result => this.getPagedData(result))
    );
    this.users.subscribe(result => this.paginator.length = result.length);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    let numRows: number;
    this.dataSource.subscribe(result => numRows = result.length);
    let test;
    this.dataSource.subscribe(result => test = JSON.stringify(result.sort()) === JSON.stringify(this.selection.selected.sort()));
    return (numSelected === numRows) && test;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.subscribe(result => result.forEach(row => this.selection.select(row)));
  }

  getSortedData(event) {

    if (!event.active || event.direction === '') {
      return;
    }

    this.dataSource = this.users.pipe(
      map(result => {
        result = result.sort((a, b) => {
          const isAsc = event.direction === 'asc';
          const colName = event.active;
          return this.compare(a[colName], b[colName], isAsc);
        });
        return this.getPagedData(result);
      })
    );
    this.isAllSelected();
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  pageEvent(event) {
    console.log(event);
    this.dataSource = this.users.pipe(
      map(result => this.getPagedData(result))
    );
    this.isAllSelected();
  }

  getPagedData(data) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    return data.slice(startIndex, endIndex);
  }

  onCheckboxToggle(event) {
    console.log(event);
  }

  selectRow(event, row) {
    console.log(event, row);
    if (event.checked) {
      console.log('few');
    }
  }

  onClick(row) {
    console.log(row);
  }

  onUpdateManager(userId, event) {
    console.log(event, userId);
    this.updateManager.emit({userId, managerId: event.value});
  }

  onUpdateGroup(userId, event) {
    console.log(event, userId);
    this.updateGroup.emit({userId, groupId: event.value});
  }

  onUpdateDepartment(userId, event) {
    console.log(event, userId);
    this.updateDepartment.emit({userId, departmentId: event.value});
  }

  onUpdateLocation(userId, event) {
    console.log(event, userId);
    this.updateLocation.emit({userId, locationId: event.value});
  }
}
