/**
 * ## The `mdSort` and `md-sort-header` are used, respectively, to add sorting state and display to tabular data.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/sort/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <table mdSort (mdSortChange)="sortData($event)">
 *   <tr>
 *     <th md-sort-header="name">Dessert (100g)</th>
 *     <th md-sort-header="calories">Calories</th>
 *     <th md-sort-header="fat">Fat (g)</th>
 *     <th md-sort-header="carbs">Carbs (g)</th>
 *     <th md-sort-header="protein">Protein (g)</th>
 *   </tr>
 *
 *   <tr *ngFor="let dessert of sortedData">
 *     <td>{{dessert.name}}</td>
 *     <td>{{dessert.calories}}</td>
 *     <td>{{dessert.fat}}</td>
 *     <td>{{dessert.carbs}}</td>
 *     <td>{{dessert.protein}}</td>
 *   </tr>
 * </table>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 * import {Sort} from '@angular/material';
 * 
 * 
 * \@Component({
 *   selector: 'sort-overview-example',
 *   templateUrl: 'sort-overview-example.html',
 *   styleUrls: ['sort-overview-example.css'],
 * })
 * export class SortOverviewExample {
 *   desserts = [
 *     {name: 'Frozen yogurt', calories: '159', fat: '6', carbs: '24', protein: '4'},
 *     {name: 'Ice cream sandwich', calories: '237', fat: '9', carbs: '37', protein: '4'},
 *     {name: 'Eclair', calories: '262', fat: '16', carbs: '24', protein: '6'},
 *     {name: 'Cupcake', calories: '305', fat: '4', carbs: '67', protein: '4'},
 *     {name: 'Gingerbread', calories: '356', fat: '16', carbs: '49', protein: '4'},
 *   ];
 * 
 *   sortedData;
 * 
 *   constructor() {
 *     this.sortedData = this.desserts.slice();
 *   }
 * 
 *   sortData(sort: Sort) {
 *     const data = this.desserts.slice();
 *     if (!sort.active || sort.direction == '') {
 *       this.sortedData = data;
 *       return;
 *     }
 * 
 *     this.sortedData = data.sort((a, b) => {
 *       let isAsc = sort.direction == 'asc';
 *       switch (sort.active) {
 *         case 'name': return compare(a.name, b.name, isAsc);
 *         case 'calories': return compare(+a.calories, +b.calories, isAsc);
 *         case 'fat': return compare(+a.fat, +b.fat, isAsc);
 *         case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
 *         case 'protein': return compare(+a.protein, +b.protein, isAsc);
 *         default: return 0;
 *       }
 *     });
 *   }
 * }
 * 
 * function compare(a, b, isAsc) {
 *   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
 * }
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Adding sort to table headers
 * 
 * To add sorting behavior and styling to a set of table headers, add the `<md-sort-header>` component
 * to each header and provide an `id` that will identify it. These headers should be contained within a
 * parent element with the `mdSort` directive, which will emit an `mdSortChange` event when the user
 *  triggers sorting on the header.
 * 
 * Users can trigger the sort header through a mouse click or keyboard action. When this happens, the
 * `mdSort` will emit an `mdSortChange` event that contains the ID of the header triggered and the
 * direction to sort (`asc` or `desc`).
 * 
 * &nbsp;
 * ### Changing the sort order
 * 
 * By default, a sort header starts its sorting at `asc` and then `desc`. Triggering the sort header
 * after `desc` will remove sorting.
 * 
 * To reverse the sort order for all headers, set the `mdSortStart` to `desc` on the `mdSort` 
 * directive. To reverse the order only for a specific header, set the `start` input only on the header 
 * instead.
 * 
 * To prevent the user from clearing the sort sort state from an already sorted column, set 
 * `mdSortDisableClear` to `true` on the `mdSort` to affect all headers, or set `disableClear` to 
 * `true` on a specific header.
 * 
 * &nbsp;
 * ### Using sort with the md-table
 * 
 * When used on an `md-table` header, it is not required to set an `md-sort-header` id on because
 * by default it will use the id of the column.
 * 
 * &nbsp;
 * # Services
 * ## MdSOrtHeaderIntl
 * To modify the labels and text displayed, create a new instance of MdSortHeaderIntl and include it in a custom provider.
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `sortButtonLabel`            | 
 * | `sortDescriptionLabel`       | A label to describe the current sort (visible only to screenreaders).
 * 
 * &nbsp;
 * # Directives
 * ## MdSortHeader
 * Applies sorting behavior (click to change sort) and styles to an element, including an arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent MdSort directive.
 * 
 * If used on header cells in a CdkTable, it will automatically default its id from its containing column definition.
 * * Selector: `[md-sort-header]`
 * 
 * Properties
 * | Name                            | Description             |
 * |-------------------------------- | ------------------------|
 * | `@Input('md-sort-header') id`   | ID of this sort header. If used within the context of a CdkColumnDef, this will default to the column's name.
 * | `@Input() arrowPosition`        | Sets the position of the arrow that displays when sorted.
 * | `@Input('start') start`         | Overrides the sort start value of the containing MdSort for this MdSortable.
 * | `@Input() disableClear`         | Overrides the disable clear value of the containing MdSort for this MdSortable.
 * 
 * 
 * ## MdSort
 * Container for MdSortables to manage the sort state and provide default sort parameters.
 * * Selector: `[mdSort]`
 * 
 * Properties
 * | Name                                        | Description             |
 * |-------------------------------------------- | ------------------------|
 * | `sortables`                                 | Collection of all registered sortables that this directive manages.
 * | `@Input('mdSortActive') active`             | The id of the most recently sorted MdSortable.
 * | `@Input('mdSortStart') start`               | The direction to set when an MdSortable is initially sorted. May be overriden by the MdSortable's sort start.
 * | `@Input('mdSortDirection') direction`       | The sort direction of the currently active MdSortable.
 * | `@Input('mdSortDisableClear') disableClear` | Whether to disable the user from clearing the sort by finishing the sort direction cycle. May be overriden by the MdSortable's disable clear input.
 * | `@Output() mdSortChange`                    | Event emitted when the user changes either the active sort or sort direction.
 * 
 * Methods
 * * `register`: Register function to be used by the contained MdSortables. Adds the MdSortable to the collection of MdSortables.
 *    * Parameters
 *       * `sortable` - MdSortable
 * * `deregister`: Unregister function to be used by the contained MdSortables. Removes the MdSortable from the collection of contained MdSortables.
 *    * Parameters
 *       * `sorable` - MdSortable
 * * `sort`: Sets the active sort id and determines the new sort direction..
 *    * Parameters
 *       * `sortable` - MdSortable
 * * `getNextSortDirection`: Returns the next sort direction of the active sortable, checking for potential overrides.
 *    * Parameters
 *       * `sortable` - MdSortable
 *    * Returns
 *       * SortDirection
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
import {MdSortHeader} from './sort-header';
import {MdSort} from './sort';
import {MdSortHeaderIntl} from './sort-header-intl';
import {CommonModule} from '@angular/common';

export * from './sort-direction';
export * from './sort-header';
export * from './sort-header-intl';
export * from './sort';

@NgModule({
  imports: [CommonModule],
  exports: [MdSort, MdSortHeader],
  declarations: [MdSort, MdSortHeader],
  providers: [MdSortHeaderIntl]
})
export class MdSortModule {}
