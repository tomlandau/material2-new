/**
 * ## Angular Material buttons are native `<button>` or `<a>` elements enhanced with Material Design styling and ink ripples.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/button/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <button md-button>Click me!</button>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'button-overview-example',
 *   templateUrl: 'button-overview-example.html',
 * })
 * export class ButtonOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * 
 * Native `<button>` and `<a>` elements are always used in order to provide the most straightforward
 * and accessible experience for users. A `<button>` element should be used whenever some _action_
 * is performed. An `<a>` element should be used whenever the user will _navigate_ to another view.
 * 
 * &nbsp;
 * There are five button variants, each applied as an attribute:
 * 
 * | Attribute          | Description                                                                 |
 * |--------------------|-----------------------------------------------------------------------------|
 * | `md-button`        | Rectangular button w/ no elevation.                                         |
 * | `md-raised-button` | Rectangular button w/ elevation                                             |
 * | `md-icon-button`   | Circular button with a transparent background, meant to contain an icon     |
 * | `md-fab`           | Circular button w/ elevation, defaults to theme's accent color              |
 * | `md-mini-fab`      | Same as `md-fab` but smaller                                                |
 * 
 * &nbsp;
 * ## Theming
 * Buttons can be colored in terms of the current theme using the `color` property to set the
 * background color to `primary`, `accent`, or `warn`. By default, only FABs are colored; the default
 * background color for `md-button` and `md-raised-button` matches the theme's background color.
 * 
 * &nbsp;
 * ## Capitalization
 * According to the Material design spec button text has to be capitalized, however we have opted not
 * to capitalize buttons automatically via `text-transform: uppercase`, because it can cause issues in
 * certain locales. It is also worth noting that using ALL CAPS in the text itself causes issues for
 * screen-readers, which will read the text character-by-character. We leave the decision of how to
 * approach this to the consuming app.
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdButton
 * Material design button.
 * * Selector: `button[md-button] button[md-raised-button] button[md-icon-button]`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() disableRipple`     | Whether the ripple effect for this button is disabled
 * 
 * Methods
 * * `focus`: Focuses the button.
 * 
 * &nbsp;
 * ## MdAnchor
 * Raised Material design button.
 * * Selector: `a[md-button] a[md-raised-button] a[md-icon-button] a[md-fab] a[md-mini-fab]`
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
import {StyleModule} from '../core/style/index';
import {MdCommonModule} from '../core/common-behaviors/common-module';
import {MdRippleModule} from '../core/ripple/index';
import {
  MdAnchor,
  MdButton,
  MdMiniFab,
  MdButtonCssMatStyler,
  MdFab,
  MdIconButtonCssMatStyler,
  MdRaisedButtonCssMatStyler
} from './button';


export * from './button';


@NgModule({
  imports: [
    CommonModule,
    MdRippleModule,
    MdCommonModule,
    StyleModule,
  ],
  exports: [
    MdButton,
    MdAnchor,
    MdMiniFab,
    MdFab,
    MdCommonModule,
    MdButtonCssMatStyler,
    MdRaisedButtonCssMatStyler,
    MdIconButtonCssMatStyler,
  ],
  declarations: [
    MdButton,
    MdAnchor,
    MdMiniFab,
    MdFab,
    MdButtonCssMatStyler,
    MdRaisedButtonCssMatStyler,
    MdIconButtonCssMatStyler,
  ],
})
export class MdButtonModule {}
