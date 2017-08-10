/**
 * ## `<md-sidenav>` is a panel that can be placed next to or above some primary content. A sidenav is typically used for navigation, but can contain any content.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/sidenav/examples)
 * 
 * &nbsp;
 * ## Basic example:
 * HTML
 * ```html
 * <md-sidenav-container class="example-container">
 * <md-sidenav #sidenav class="example-sidenav">
 *   Jolly good!
 * </md-sidenav>
 *
 * <div class="example-sidenav-content">
 *   <button type="button" md-button (click)="sidenav.open()">
 *     Open sidenav
 *   </button>
 * </div>
 *
 * </md-sidenav-container>
 * ```
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'sidenav-overview-example',
 *   templateUrl: 'sidenav-overview-example.html',
 *   styleUrls: ['sidenav-overview-example.css'],
 * })
 * export class SidenavOverviewExample {}
 * ```
 * CSS
 * ```css
 * .example-container {
 *  width: 500px;
 *   height: 300px;
 *   border: 1px solid rgba(0, 0, 0, 0.5);
 * }
 *
 * .example-sidenav-content {
 *   display: flex;
 *   height: 100%;
 *   align-items: center;
 *   justify-content: center;
 * }
 *
 * .example-sidenav {
 *   padding: 20px;
 * }
 * ```
 * 
 * &nbsp;
 * # Overview
 * The sidenav and its associated content live inside of an `<md-sidenav-container>`:
 * ```html
 * <md-sidenav-container>
 *   <md-sidenav>
 *     <!-- sidenav content -->
 *   </md-sidenav>
 * 
 *   <!-- primary content -->
 * </md-sidenav-container>
 * ```
 * 
 * A sidenav container may contain one or two `<md-sidenav>` elements. When there are two 
 * `<md-sidenav>` elements, each must be placed on a different side of the container.
 * See the section on positioning below.
 * 
 * &nbsp;
 * ## Sidenav mode
 * The sidenav can render in one of three different ways based on the `mode` property.
 * 
 * | Mode | Description                                                                               |
 * |------|-------------------------------------------------------------------------------------------|
 * | over | Sidenav floats _over_ the primary content, which is covered by a backdrop                 |
 * | push | Sidenav _pushes_ the primary content out of its way, also covering it with a backdrop     |
 * | side | Sidenav appears _side-by-side_ with the primary content                                   |
 * 
 * Using the `side` mode on mobile devices can affect the performance and is also not recommended by the
 * [Material Design specification](https://material.io/guidelines/patterns/navigation-drawer.html#navigation-drawer-behavior).
 * 
 * &nbsp;
 * ## Positioning the sidenav
 * The `align` property determines whether the sidenav appears at the `"start"` or `"end"` of the
 * container. This is affected by the current text direction ("ltr" or "rtl"). By default, the sidenav
 * appears at the start of the container.
 * 
 * &nbsp;
 * ## Sizing the sidenav
 * The `<md-sidenav>` will, by default, fit the size of its content. The width can be explicitly set
 * via CSS:
 * 
 * ```css
 * md-sidenav {
 *   width: 200px;
 * }
 * ```
 * 
 * Try to avoid percent based width as `resize` events are not (yet) supported.
 * 
 * For a fullscreen sidenav, the recommended approach is set up the DOM such that the
 * `<md-sidenav-container>` can naturally take up the full space:
 * 
 * ```html
 * <app>
 *   <md-sidenav-container>
 *     <md-sidenav mode="side" opened="true">Drawer content</md-sidenav>
 *     <div class="my-content">Main content</div>
 *   </md-sidenav-container>
 * </app>
 * ```
 * ```css
 * html, body, material-app, md-sidenav-container, .my-content {
 *   margin: 0;
 *   width: 100%;
 *   height: 100%;
 * }
 * ```
 * 
 * &nbsp;
 * ## FABs inside sidenav
 * For a sidenav with a FAB (or other floating element), the recommended approach is to place the FAB
 * outside of the scrollable region and absolutely position it.
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdSidenav
 * This component corresponds to the drawer of the sidenav.
 * * Selector: `md-sidenav`
 * 
 * Properties
 * | Name                                | Description             |
 * |------------------------------------ | ------------------------|
 * | `@Input() align`                          | Direction which the sidenav is aligned in.
 * | `@Input() mode`                           | Mode of the sidenav; one of 'over', 'push' or 'side'.
 * | `@Input() disableClose`                   | Whether the sidenav can be closed with the escape key or not.
 * | `@Output('open-start') onOpenStart`       | Event emitted when the sidenav is being opened. Use this to synchronize animations.
 * | `@Output('open') onOpen`                  | Event emitted when the sidenav is fully opened.
 * | `@Output('close-start') onCloseStart`     | Event emitted when the sidenav is being closed. Use this to synchronize animations.
 * | `@Output('close') onClose`                | Event emitted when the sidenav is fully closed.
 * | `@Output('align-changed') onAlignChanged` | Event emitted when the sidenav alignment changes.
 * | `isFocusTrapEnabled`                      | 
 * | `@Input() opened`                         | Whether the sidenav is opened. We overload this because we trigger an event when it starts or end.
 *
 * 
 * Methods
 * * `open`: Open this sidenav, and return a Promise that will resolve when it's fully opened (or get rejected if it didn't).
 *    * Returns
 *       * `Promise<MdSidenavToggleResult>`
 * * `close`: Close this sidenav, and return a Promise that will resolve when it's fully closed (or get rejected if it didn't).
 *    * Returns
 *       * `Promise<MdSidenavToggleResult>`
 * * `toggle`: Toggle this sidenav. This is equivalent to calling open() when it's already opened, or close() when it's closed.
 *    * Parameters
 *       * isOpen? - `boolean` - Whether the sidenav should be open.
 *    * Returns
 *       * `Promise<MdSidenavToggleResult>` - Resolves with the result of whether the sidenav was opened or closed.
 * 
 * &nbsp;
 * ## MdSidenavContainer
 * This is the parent component to one or twos that validates the state internally and coordinates the backdrop and content styling.
 * * Selector: `md-sidenav-container`
 * 
 * Properties
 * | Name                       | Description                        |
 * |--------------------------- | -----------------------------------|
 * | `start`                    | The sidenav child with the `start` alignment.
 * | `end`                      | The sidenav child with the `end` alignment.
 * | `@Output() backdropClick`  | Event emitted when the sidenav backdrop is clicked.
 * 
 * Methods
 * * `open`: Calls open of both start and end sidenavs
 * * `close`: Calls close of both start and end sidenavs
 *
 * &nbsp;
 * # Additional classes
 * 
 * ## MdSidenavToggleResult
 * Sidenav toggle promise result.
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
import {MdCommonModule} from '../core/common-behaviors/common-module';
import {A11yModule} from '@angular/cdk';
import {OverlayModule} from '../core/overlay/index';
import {MdSidenav, MdSidenavContainer} from './sidenav';


@NgModule({
  imports: [CommonModule, MdCommonModule, A11yModule, OverlayModule],
  exports: [MdSidenavContainer, MdSidenav, MdCommonModule],
  declarations: [MdSidenavContainer, MdSidenav],
})
export class MdSidenavModule {}


export * from './sidenav';
