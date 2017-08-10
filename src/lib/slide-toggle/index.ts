/**
 * ## `<md-slide-toggle>` is an on/off control that can be toggled via clicking or dragging. 
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/slide-toggle/examples)
 * 
 * &nbsp;
 * ## Basic example
 * 
 * HTML
 * ```html
 * <md-slide-toggle>Slide me!</md-slide-toggle>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'slide-toggle-overview-example',
 *   templateUrl: 'slide-toggle-overview-example.html',
 * })
 * export class SlideToggleOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * The slide-toggle behaves similarly to a checkbox, though it does not support an `indeterminate` 
 * state like `<md-checkbox>`.
 * 
 * _Note: the sliding behavior for this component requires that HammerJS is loaded on the page._
 * 
 * &nbsp;
 * ## Slide-toggle label
 * The slide-toggle label is provided as the content to the `<md-slide-toggle>` element. 
 * 
 * If you don't want the label to appear next to the slide-toggle, you can use 
 * [`aria-label`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-label) or 
 * [`aria-labelledby`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) to 
 * specify an appropriate label.
 * 
 * &nbsp;
 * ## Use with `@angular/forms`
 * `<md-slide-toggle>` is compatible with `@angular/forms` and supports both `FormsModule` 
 * and `ReactiveFormsModule`.
 * 
 * &nbsp;
 * ## Theming
 * The color of a `<md-slide-toggle>` can be changed by using the `color` property. By default, 
 * slide-toggles use the theme's accent color. This can be changed to `'primary'` or `'warn'`.  
 * 
 * &nbsp;
 * # Directives
 * ## MdSlideToggle
 * Represents a slidable "switch" toggle that can be moved between on and off.
 * * Selector: `md-slide-toggle`
 * 
 * Properties
 * | Name                                         | Description             |
 * |--------------------------------------------- | ------------------------|
 * | `@Input() name`                              | Name value will be applied to the input element if present
 * | `@Input() id`                                | A unique id for the slide-toggle input. If none is supplied, it will be auto-generated.
 * | `@Input() labelPosition`                     | Whether the label should appear after or before the slide-toggle. Defaults to 'after'
 * | `@Input('aria-label') ariaLabel`             | Used to set the aria-label attribute on the underlying input element.
 * | `@Input('aria-labelledby') ariaLabelledby`   | Used to set the aria-labelledby attribute on the underlying input element.
 * | `@Input() required`                          | Whether the slide-toggle is required.
 * | `@Input() disableRipple`                     | Whether the ripple effect for this slide-toggle is disabled.
 * | `@Output() change`                           | An event will be dispatched each time the slide-toggle changes its value.
 * | `inputId`                                    | Returns the unique id for the visual hidden input.
 * | `@Input() checked`                           | Whether the slide-toggle is checked.
 * 
 * Methods
 * * `focus`: Focuses the slide-toggle.
 * * `toggle`: Toggles the checked state of the slide-toggle.
 *
 * &nbsp;
 * # Additional classes
 * 
 * ## MdSlideToggleChange
 * 
 * Properties
 * | Name                      | Description                        |
 * |-------------------------- | -----------------------------------|
 * | `source`                  | 
 * | `checked`                 | 
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
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {MdSlideToggle} from './slide-toggle';
import {PlatformModule} from '@angular/cdk';
import {GestureConfig} from '../core/gestures/index';
import {FOCUS_ORIGIN_MONITOR_PROVIDER} from '../core/style/index';
import {MdCommonModule} from '../core/common-behaviors/index';
import {MdRippleModule} from '../core/ripple/index';

@NgModule({
  imports: [MdRippleModule, MdCommonModule, PlatformModule],
  exports: [MdSlideToggle, MdCommonModule],
  declarations: [MdSlideToggle],
  providers: [
    FOCUS_ORIGIN_MONITOR_PROVIDER,
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ],
})
export class MdSlideToggleModule {}


export * from './slide-toggle';
