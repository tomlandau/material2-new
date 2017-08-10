/**
 * ## The `md-table` provides a Material Design styled data-table that can be used to display rows of
 * data.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/table/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <div class="example-container mat-elevation-z8">
 * <md-table #table [dataSource]="dataSource">
 *
 *   <!--- Note that these columns can be defined in any order.
 *         The actual rendered columns are set as a property on the row definition" -->
 *
 *   <!-- ID Column -->
 *   <ng-container cdkColumnDef="userId">
 *     <md-header-cell *cdkHeaderCellDef> ID </md-header-cell>
 *     <md-cell *cdkCellDef="let row"> {{row.id}} </md-cell>
 *   </ng-container>
 *
 *   <!-- Progress Column -->
 *   <ng-container cdkColumnDef="progress">
 *     <md-header-cell *cdkHeaderCellDef> Progress </md-header-cell>
 *     <md-cell *cdkCellDef="let row"> {{row.progress}}% </md-cell>
 *   </ng-container>
 *
 *   <!-- Name Column -->
 *   <ng-container cdkColumnDef="userName">
 *     <md-header-cell *cdkHeaderCellDef> Name </md-header-cell>
 *     <md-cell *cdkCellDef="let row"> {{row.name}} </md-cell>
 *   </ng-container>
 *
 *   <!-- Color Column -->
 *   <ng-container cdkColumnDef="color">
 *     <md-header-cell *cdkHeaderCellDef>Color</md-header-cell>
 *     <md-cell *cdkCellDef="let row" [style.color]="row.color"> {{row.color}} </md-cell>
 *   </ng-container>
 *
 *   <md-header-row *cdkHeaderRowDef="displayedColumns"></md-header-row>
 *   <md-row *cdkRowDef="let row; columns: displayedColumns;"></md-row>
 * </md-table>
 * </div>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 * import {DataSource} from '@angular/cdk';
 * import {BehaviorSubject} from 'rxjs/BehaviorSubject';
 * import {Observable} from 'rxjs/Observable';
 * import 'rxjs/add/operator/startWith';
 * import 'rxjs/add/observable/merge';
 * import 'rxjs/add/operator/map';
 * 
 * \@Component({
 *   selector: 'table-basic-example',
 *   styleUrls: ['table-basic-example.css'],
 *   templateUrl: 'table-basic-example.html',
 * })
 * export class TableBasicExample {
 *   displayedColumns = ['userId', 'userName', 'progress', 'color'];
 *   exampleDatabase = new ExampleDatabase();
 *   dataSource: ExampleDataSource | null;
 * 
 *   ngOnInit() {
 *     this.dataSource = new ExampleDataSource(this.exampleDatabase);
 *   }
 * }
 * 
 * // Constants used to fill up our data base.
 * const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
 *   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
 * const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
 *   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
 *   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
 * 
 * export interface UserData {
 *   id: string;
 *   name: string;
 *   progress: string;
 *   color: string;
 * }
 * 
 * // An example database that the data source uses to retrieve data for the table.
 * export class ExampleDatabase {
 *   // Stream that emits whenever the data has been modified.
 *   dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
 *   get data(): UserData[] { return this.dataChange.value; }
 * 
 *   constructor() {
 *     // Fill up the database with 100 users.
 *     for (let i = 0; i < 100; i++) { this.addUser(); }
 *   }
 * 
 *   // Adds a new user to the database.
 *   addUser() {
 *     const copiedData = this.data.slice();
 *     copiedData.push(this.createNewUser());
 *     this.dataChange.next(copiedData);
 *   }
 * 
 *   // Builds and returns a new User.
 *   private createNewUser() {
 *     const name =
 *         NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
 *         NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
 * 
 *     return {
 *       id: (this.data.length + 1).toString(),
 *       name: name,
 *       progress: Math.round(Math.random() * 100).toString(),
 *       color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
 *     };
 *   }
 * }
 * 
 *
 *  // Data source to provide what data should be rendered in the table. Note that the data source
 *  // can retrieve its data in any way. In this case, the data source is provided a reference
 *  // to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 *  // the underlying data. Instead, it only needs to take the data and send the table exactly what
 *  // should be rendered.
 *
 * export class ExampleDataSource extends DataSource<any> {
 *   constructor(private _exampleDatabase: ExampleDatabase) {
 *     super();
 *   }
 * 
 *   // Connect function called by the table to retrieve one stream containing the data to render.
 *   connect(): Observable<UserData[]> {
 *     return this._exampleDatabase.dataChange;
 *   }
 * 
 *   disconnect() {}
 * }
 * ```
 * CSS
 * ```css
 * .example-container {
 *   display: flex;
 *   flex-direction: column;
 *   max-height: 500px;
 *   min-width: 300px;
 * }
 *
 * .example-header {
 *   min-height: 64px;
 *   display: flex;
 *   align-items: center;
 *   padding-left: 24px;
 *   font-size: 20px;
 * }
 *
 * .mat-table {
 *   overflow: auto;
 * }
 * ```
 * 
 * &nbsp;
 * # Overview
 * 
 * The `md-table` provides a Material Design styled data-table that can be used to display rows of
 * data.
 * 
 * This table builds on the foundation of the CDK data-table and uses a similar interface for its
 * data source input and template, except that its element selectors will be prefixed with `md-`
 * instead of `cdk-`.
 * 
 * Note that the column definition directives (`cdkColumnDef` and `cdkHeaderCellDef`) are still
 * prefixed with `cdk-`.
 * 
 * For more information on the interface and how it works, see the
 * [guide covering the CDK data-table](https://material.angular.io/guide/cdk-table).
 * 
 * &nbsp;
 * ## Features
 * 
 * The `<md-table>` itself only deals with the rendering of a table structure (rows and cells).
 * Additional features can be built on top of the table by adding behavior inside cell templates
 * (e.g., sort headers) or next to the table (e.g. a paginator). Interactions that affect the
 * rendered data (such as sorting and pagination) should be propagated through the table's data source.
 * 
 * &nbsp;
 * ### Pagination
 * 
 * The `<md-paginator>` adds a pagination UI that can be used in conjunction with the `<md-table>`. The
 * paginator emits events that can be used to trigger an update via the table's data source.
 * 
 * &nbsp;
 * ### Sorting
 * Use the `mdSort` directive and `<md-sort-header>` adds a sorting UI the table's column headers. The
 * sort headers emit events that can be used to trigger an update via the table's data source.
 * 
 * &nbsp;
 * ### Filtering
 * 
 * While Angular Material does not offer a specific component for filtering tabular data, the table's 
 * data source can be updated based on any custom filter UI. Any filtering pattern need only trigger
 * an update via the table's data source.
 * 
 * 
 * &nbsp;
 * ### Simple Table
 * 
 * In the near future, we will provide a simplified version of the data-table with an easy-to-use
 * interface, material styling, array input, and more out-of-the-box features (sorting, pagination,
 * and selection).
 * 
 * 
 * &nbsp;
 * # Directives
 * ## CdkTable
 * A data table that connects with a data source to retrieve data of type T and renders a header row and data rows. Updates the rows when new data is provided by the data source.
 * * Selector: `cdk-table`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() trackBy`           | Tracking function that will be used to check the differences in data changes. Used similarly to ngFor trackBy function. Optimize row operations by identifying a row based on its data relative to the function to know if a row should be added/removed/moved. Accepts a function that takes two parameters, index and item.
 * | `viewChange`                 | Stream containing the latest information on what rows are being displayed on screen. Can be used by the data source to as a heuristic of what data should be provided.
 * | `@Input() dataSource`        | Provides a stream containing the latest data array to render. Influenced by the table's stream of view window (what rows are currently on screen).
 * 
 * 
 * &nbsp;
 * ## CdkCellDef
 * Cell definition for a CDK table. Captures the template of a column's data row cell as well as cell-specific properties.
 * * Selector: `[cdkCellDef]`
 * 
 * &nbsp;
 * ## CdkHeaderCellDef
 * Header cell definition for a CDK table. Captures the template of a column's header cell and as well as cell-specific properties.
 * * Selector: `[cdkHeaderCellDef]`
 * 
 * &nbsp;
 * ## CdkColumnDef
 * Column definition for the CDK table. Defines a set of cells available for a table column.
 * * Selector: `[cdkColumnDef]`
 * 
 * Properties
 * | Name                             | Description             |
 * |--------------------------------- | ------------------------|
 * | `@Input('cdkColumnDef') name`     | Unique name for this column.
 * 
 * &nbsp;
 * ## CdkHeaderCell
 * Header cell template container that adds the right classes and role.
 * * Selector: `cdk-header-cell`
 * 
 * &nbsp;
 * ## CdkCell
 * Cell template container that adds the right classes and role.
 * * Selector: `cdk-cell`
 * 
 * &nbsp;
 * ## CdkHeaderRowDef
 * Header row definition for the CDK table. Captures the header row's template and other header properties such as the columns to display.
 * * Selector: `[cdkHeaderRowDef]`
 * 
 * &nbsp;
 * ## CdkRowDef
 * Data row definition for the CDK table. Captures the header row's template and other row properties such as the columns to display.
 * * Selector: `[cdkRowDef]`
 * 
 * &nbsp;
 * ## CdkHeaderRow
 * Header template container that contains the cell outlet. Adds the right class and role.
 * * Selector: `cdk-header-row`
 * 
 * &nbsp;
 * ## CdkRow
 * Data row template container that contains the cell outlet. Adds the right class and role.
 * * Selector: `cdk-row`
 * 
 * &nbsp;
 * ## MdHeaderCell
 * Header cell template container that adds the right classes and role.
 * * Selector: `md-header-cell`
 * 
 * &nbsp;
 * ## MdCell
 * Cell template container that adds the right classes and role.
 * * Selector: `md-cell`
 * 
 * &nbsp;
 * ## MdTable
 * Wrapper for the CdkTable with Material design styles.
 * * Selector: `md-table`
 * 
 * &nbsp;
 * ## MdHeaderRow
 * Header template container that contains the cell outlet. Adds the right class and role..
 * * Selector: `md-header-row`
 * 
 * &nbsp;
 * ## MdRow
 * Data row template container that contains the cell outlet. Adds the right class and role.
 * * Selector: `md-row`
 * 
 * &nbsp;
 * # Additional classes
 * ## DataSource
 * 
 * Methods
 * * `connect`: Connects a collection viewer (such as a data-table) to this data source.
 *    * Parameters
 *       * `collectionViewer` - CollectionViewer: The component that exposes a view over the data provided by this data source.
 *    * Returns
 *       * Observable<T[]>: Observable that emits a new value when the data changes.
 * * `disconnect`: Disconnects a collection viewer (such as a data-table) from this data source. Can be used to perform any clean-up or tear-down operations when a view is being destroyed.
 *    * Parameters
 *       * `collectionViewer` - CollectionViewer: The component that exposes a view over the data provided by this data source.
 * 
 * &nbsp;
 * ## BaseRowDef
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs for changes and notifying the table.
 * 
 * Properties
 * | Name                  | Description             |
 * |---------------------- | ------------------------|
 * | `columns`             | The columns to be displayed on this row.
 * | `columnsChange`       | Event stream that emits when changes are made to the columns.
 * 
 * @bit
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {MdTable} from './table';
import {CdkTableModule} from '@angular/cdk';
import {MdCell, MdHeaderCell} from './cell';
import {MdHeaderRow, MdRow} from './row';
import {CommonModule} from '@angular/common';
import {MdCommonModule} from '../core/common-behaviors/index';

export * from './cell';
export * from './table';
export * from './row';

@NgModule({
  imports: [CdkTableModule, CommonModule, MdCommonModule],
  exports: [MdTable, MdHeaderCell, MdCell, MdHeaderRow, MdRow],
  declarations: [MdTable, MdHeaderCell, MdCell, MdHeaderRow, MdRow],
})
export class MdTableModule {}
