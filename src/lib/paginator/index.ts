/**
 * ## `<md-paginator>` provides navigation for paged information, typically used with a table.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/paginator/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-paginator [length]="100"
 *               [pageSize]="10"
 *               [pageSizeOptions]="[5, 10, 25, 100]">
 * </md-paginator>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 *
 * \@Component({
 *   selector: 'paginator-overview-example',
 *   templateUrl: 'paginator-overview-example.html',
 * })
 * export class PaginatorOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Basic use
 * Each paginator instance requires:
 * * The number of items per page (default set to 50)
 * * The total number of items being paged
 * 
 * The current page index defaults to 0, but can be explicitly set via pageIndex.
 * 
 * When the user interacts with the paginator, a `PageEvent` will be fired that can be used to update
 * any associated data view.
 * 
 * &nbsp;
 * ## Page size options
 * The paginator displays a dropdown of page sizes for the user to choose from. The options for this
 * dropdown can be set via `pageSizeOptions`
 * 
 * The current pageSize will always appear in the dropdown, even if it is not included in pageSizeOptions.
 * 
 * &nbsp;
 * ## Internationalization
 * The labels for the paginator can be customized by providing your own instance of `MdPaginatorIntl`.
 * This will allow you to change the following:
 *  1. The label for the length of each page.
 *  2. The range text displayed to the user.
 *  3. The tooltip messages on the navigation buttons.
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdPaginator
 * Component to provide navigation between paged information. Displays the size of the current page, user-selectable options to change that size, what items are being shown, and navigational button to go to the previous or next page.
 * * Selector: `md-paginator`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() pageIndex`         | The zero-based page index of the displayed list of items. Defaulted to 0.
 * | `@Input() length`            | The length of the total number of items that are being paginated. Defaulted to 0.
 * | `@Input() pageSize`          | Number of items to display on a page. By default set to 50.
 * | `@Input() pageSizeOptions`   | The set of provided page size options to display to the user.
 * | `@Output() page`             | Event emitted when the paginator changes the page size or page index.
 * 
 * Methods
 * * `nextPage`: Advances to the next page if it exists.
 * * `previousPage`: Move back to the previous page if it exists.
 * * `hasPreviousPage`: Whether there is a previous page.
 * * `hasNextPage`: Whether there is a next page.
 * 
 * &nbsp;
 * # Additional classes
 * ## PageEvent
 * Change event object that is emitted when the user selects a different page size or navigates to another page.
 * 
 * Properties
 * | Name                | Description             |
 * |-------------------- | ------------------------|
 * | `pageIndex`         | The current page index.
 * | `pageSize`          | The current page size
 * | `length`            | The current total number of items being paged
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
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdButtonModule} from '../button/index';
import {MdSelectModule} from '../select/index';
import {MdPaginator} from './paginator';
import {MdPaginatorIntl} from './paginator-intl';
import {MdTooltipModule} from '../tooltip/index';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdSelectModule,
    MdTooltipModule,
  ],
  exports: [MdPaginator],
  declarations: [MdPaginator],
  providers: [MdPaginatorIntl],
})
export class MdPaginatorModule {}


export * from './paginator';
export * from './paginator-intl';
