import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterContentChecked } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterContentChecked {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: DataTableDataSource;
  selection: SelectionModel<any>;

  /**
   * Input Data to be diaplayed
   */
  @Input() data: any[];

  /**
   * Columns displayed in the table. Columns IDs can be added, removed, or reordered.
   */
  @Input() displayedColumns: string[];

  // dataSubject: Observable<any[]>;

  initialSelection = [];
  allowMultiSelect = true;

  constructor() {}

  ngOnInit() {
    this.selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
  }

  ngAfterContentChecked() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    this.dataSource.data = this.data;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
