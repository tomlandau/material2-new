/**
 * ## `md-grid-list` is a two-dimensional list view that arranges cells into grid-based layout.
 * 
 * See Material Design spec [here](https://www.google.com/design/spec/components/grid-lists.html).
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/grid-list/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-grid-list cols="2" rowHeight="2:1">
 *   <md-grid-tile>1</md-grid-tile>
 *   <md-grid-tile>2</md-grid-tile>
 *   <md-grid-tile>3</md-grid-tile>
 *   <md-grid-tile>4</md-grid-tile>
 * </md-grid-list>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'grid-list-overview-example',
 *   styleUrls: ['grid-list-overview-example.css'],
 *   templateUrl: 'grid-list-overview-example.html',
 * })
 * export class GridListOverviewExample {}
 * ```
 * 
 * CSS
 * ```css
 * md-grid-tile {
 *   background: lightblue;
 * }
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Setting the number of columns
 * 
 * An `md-grid-list` must specify a `cols` attribute which sets the number of columns in the grid. The
 * number of rows will be automatically determined based on the number of columns and the number of
 * items.
 * 
 * &nbsp;
 * ## Setting the row height
 * 
 * The height of the rows in a grid list can be set via the `rowHeight` attribute. Row height for the
 * list can be calculated in three ways:
 *                                                                                 
 * 1. **Fixed height**: The height can be in `px`, `em`, or `rem`.  If no units are specified, `px` 
 * units are assumed (e.g. `100px`, `5em`, `250`).
 *         
 * 2. **Ratio**: This ratio is column-width:row-height, and must be passed in with a colon, not a
 * decimal (e.g. `4:3`).
 *         
 * 3. **Fit**:  Setting `rowHeight` to `fit` This mode automatically divides the available height by
 * the number of rows.  Please note the height of the grid-list or its container must be set.  
 * 
 * If `rowHeight` is not specified, it defaults to a `1:1` ratio of width:height. 
 * 
 * &nbsp;
 * ## Setting the gutter size
 * 
 * The gutter size can be set to any `px`, `em`, or `rem` value with the `gutterSize` property.  If no 
 * units are specified, `px` units are assumed. By default the gutter size is `1px`.
 * 
 * &nbsp;
 * ## Adding tiles that span multiple rows or columns
 * 
 * It is possible to set the rowspan and colspan of each `md-grid-tile` individually, using the
 * `rowspan` and `colspan` properties. If not set, they both default to `1`. The `colspan` must not
 * exceed the number of `cols` in the `md-grid-list`. There is no such restriction on the `rowspan`
 * however, more rows will simply be added for it the tile to fill.
 * 
 * &nbsp;
 * ## Tile headers and footers
 * 
 * A header and footer can be added to an `md-grid-tile` using the `md-grid-tile-header` and
 * `md-grid-tile-footer` elements respectively.
 * 
 * &nbsp;
 * # Directives
 * ## MdGridTile
 * * Selector: `md-grid-tile`
 * 
 * Properties
 * | Name                        | Description             |
 * |---------------------------- | ------------------------|
 * | `@Input() rowspan`          | Whether the ripple effect should be disabled on the list-items or not. This flag only has an effect for `md-nav-list` components.
 * | `@Input() colspan`          | Amount of columns that the grid tile takes up.
 * 
 * 
 * &nbsp;
 * ## MdGridList
 * * Selector: `md-grid-list`
 * 
 * Properties
 * | Name                   | Description             |
 * |----------------------- | ------------------------|
 * | `@Input() cols`        | Amount of columns in the grid list.
 * | `@Input() gutterSize`  | Size of the grid list's gutter in pixels.
 * | `@Input() rowHeight`   | Set internal representation of row height from the user-provided value.
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
import {MdLineModule} from '../core/line/line';
import {MdCommonModule} from '../core/common-behaviors/index';
import {
  MdGridTile, MdGridTileText, MdGridTileFooterCssMatStyler,
  MdGridTileHeaderCssMatStyler, MdGridAvatarCssMatStyler
} from './grid-tile';
import {MdGridList} from './grid-list';


@NgModule({
  imports: [MdLineModule, MdCommonModule],
  exports: [
    MdGridList,
    MdGridTile,
    MdGridTileText,
    MdLineModule,
    MdCommonModule,
    MdGridTileHeaderCssMatStyler,
    MdGridTileFooterCssMatStyler,
    MdGridAvatarCssMatStyler
  ],
  declarations: [
    MdGridList,
    MdGridTile,
    MdGridTileText,
    MdGridTileHeaderCssMatStyler,
    MdGridTileFooterCssMatStyler,
    MdGridAvatarCssMatStyler
  ],
})
export class MdGridListModule {}


export * from './grid-list';
export {MdGridTile} from './grid-tile';
