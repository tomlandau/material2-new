/**
 * ## `<md-button-toggle>` are on/off toggles with the appearance of a button.
 * 
 * These toggles can be configured to behave as either radio-buttons or checkboxes. 
 * While they can be standalone, they are typically part of a `md-button-toggle-group`.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/button-toggle/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-button-toggle>Toggle me!</md-button-toggle>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 *
 * \@Component({
 *   selector: 'button-toggle-overview-example',
 *   templateUrl: 'button-toggle-overview-example.html',
 * })
 * export class ButtonToggleOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Exclusive selection vs. multiple selection
 * By default, `md-button-toggle-group` acts like a radio-button group- only one item can be selected.
 * In this mode, the `value` of the `md-button-toggle-group` will reflect the value of the selected 
 * button and `ngModel` is supported. 
 * 
 * Adding the `multiple` attribute allows multiple items to be selected (checkbox behavior). In this
 * mode the values of the the toggles are not used, the `md-button-toggle-group` does not have a value, 
 * and `ngModel` is not supported.
 * 
 * &nbsp;
 * ## Accessibility
 * The button-toggles will present themselves as either checkboxes or radio-buttons based on the 
 * presence of the `multiple` attribute. 
 * 
 * &nbsp;
 * ## Orientation
 * The button-toggles can be rendered in a vertical orientation by adding the `vertical` attribute.
 * 
 * &nbsp;
 * # Directives
 * ## MdButtonToggleGroup
 * Exclusive selection button toggle group that behaves like a radio-button group.
 * * Selector: `md-button-toggle-group:not([multiple])`
 * * Exported as: `mdButtonToggleGroup`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `onTouched`                  | onTouch function registered via registerOnTouch (ControlValueAccessor).
 * | `@Input() name`              | `name` attribute for the underlying input element.
 * | `@Input() vertical`          | Whether the toggle group is vertical.
 * | `@Input() value`             | Value of the toggle group.
 * | `@Input() selected`          | Whether the toggle group is selected.
 * | `@Output() change`           | Event emitted when the group's value changes.
 * 
 * 
 * &nbsp;
 * ## MdButtonToggleGroupMultiple
 * Multiple selection button-toggle group. ngModel is not supported in this mode.
 * * Selector: `md-button-toggle-group[multiple]`
 * * Exported as: `mdButtonToggleGroup`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() vertical`          | Whether the toggle group is vertical.
 * 
 * 
 * &nbsp;
 * ## MdButtonToggle
 * Single button inside of a toggle group.
 * * Selector: `md-button-toggle`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `buttonToggleGroup`          | The parent button toggle group (exclusive selection). Optional.
 * | `buttonToggleGroupMultiple`  | The parent button toggle group (multiple selection). Optional.
 * | `inputId`                    | Unique ID for the underlying input element.
 * | `@Input() id`                | The unique ID for this button toggle.
 * | `@Input() name`              | HTML's 'name' attribute used to group radios for unique selection.
 * | `@Input() checked`           | Whether the button is checked.
 * | `@Input() value`             | MdButtonToggleGroup reads this to assign its own value.
 * | `@Input() disabled`          | Whether the button is disabled.
 * | `@Output() change`           | Event emitted when the group value changes.
 * 
 * Methods
 * * `focus`: Focuses the button.
 * 
 * &nbsp;
 * # Additional classes
 * ## MdButtonToggleChange
 * Change event object emitted by MdButtonToggle.
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `source`                     | The MdButtonToggle that emits the event.
 * | `value`                       | The value assigned to the MdButtonToggle.
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
import {MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle} from './button-toggle';
import {UNIQUE_SELECTION_DISPATCHER_PROVIDER} from '../core/coordination/unique-selection-dispatcher';
import {MdCommonModule} from '../core/common-behaviors/common-module';
import {StyleModule} from '../core/style/index';


@NgModule({
  imports: [MdCommonModule, StyleModule],
  exports: [
    MdButtonToggleGroup,
    MdButtonToggleGroupMultiple,
    MdButtonToggle,
    MdCommonModule,
  ],
  declarations: [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle],
  providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER]
})
export class MdButtonToggleModule {}


export * from './button-toggle';
