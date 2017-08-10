/**
 * ## `<md-radio>` provides the same functionality as a native `<input type="radio">` enhanced with Material Design styling and animations.  
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/radio/examples)
 * 
 * &nbsp;
 * ## Basic example
 * The native element wrapped by the `md-input-container` must be marked with the `mdInput` directive.
 * 
 * HTML
 * ```html
 * <md-radio-group>
 *   <md-radio-button value="1">Option 1</md-radio-button>
 *   <md-radio-button value="2">Option 2</md-radio-button>
 * </md-radio-group>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'radio-overview-example',
 *   templateUrl: 'radio-overview-example.html',
 * })
 * export class RadioOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * All radio-buttons with the same name comprise a set from which only one may be selected at a time.
 * 
 * &nbsp;
 * ## Radio-button label
 * The radio-button label is provided as the content to the `<md-checkbox>` element. The label can be 
 * positioned before or after the radio-button by setting the `labelPosition` property to `'before'` 
 * or `'after'`.
 * 
 * If you don't want the label to appear next to the radio-button, you can use 
 * [`aria-label`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-label) or 
 * [`aria-labelledby`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) to 
 * specify an appropriate label.
 * 
 * &nbsp;
 * ## Radio groups
 * Radio-buttons should typically be placed inside of an `<md-radio-group>` unless the DOM structure
 * would make that impossible (e.g., radio-buttons inside of table cells). The radio-group has a
 * `value` property that reflects the currently selected radio-button inside of the group.
 * 
 * Individual radio-buttons inside of a radio-group will inherit the `name` of the group.
 * 
 * &nbsp;
 * ## Use with `@angular/forms`
 * `<md-radio-group>` is compatible with `@angular/forms` and supports both `FormsModule` 
 * and `ReactiveFormsModule`.
 * 
 * &nbsp;
 * # Directives
 * 
 * ## MdRadioGroup
 * A group of radio buttons. May contain one or more `<md-radio-button>` elements.
 * * Selector: `md-radio-group`
 * 
 * Properties
 * | Name                        | Description             |
 * |---------------------------- | ------------------------|
 * | `@Output() change`          | Event emitted when the group value changes. Change events are only emitted when the value changes due to user interaction with a radio button (the same behavior as `<input type-"radio">`).                        |
 * | `@Input() name`             | Name of the radio button group. All radio buttons inside this group will use this name.                     
 * | `@Input() Deprecated align` | Alignment of the radio-buttons relative to their labels. Can be 'before' or 'after'.                       
 * | `@Input() labelPosition`    | Whether the labels should appear after or before the radio-buttons. Defaults to 'after'                       
 * | `@Input() value`            | Value of the radio button.                        
 * | `@Input() disabled`         | Whether the radio button is selected.                        
 * | `@Input() selected`         | Whether the radio group is diabled                        
 * 
 * &nbsp;
 * ## MdRadioButton
 * A radio-button. May be inside of a `<md-radio-group>`
 * * Selector: `md-radio-button`
 * 
 * Properties
 * | Name                                          | Description             |
 * |---------------------------------------------- | ------------------------|
 * | `@Input() id`                                 | The unique ID for the radio button.
 * | `@Input() name`                               | Analog to HTML 'name' attribute used to group radios for unique selection.                    
 * | `@Input('aria-label') ariaLabel`              | Used to set the 'aria-label' attribute on the underlying input element.
 * | `@Input('aria-labelledby') ariaLabelledby`    | The 'aria-labelledby' attribute takes precedence as the element's text alternative.
 * | `@Input() disableRipple`                      | Whether the ripple effect for this radio button is disabled.
 * | `@Input() checked`                            | Whether this radio button is checked.
 * | `@Input() value`                              | The value of this radio button.
 * | `@Input() value`                              | Whether or not the radio-button should appear before or after the label.
 * | `@Input() Deprecated align`                   | Whether the label should appear after or before the radio button. Defaults to 'after'
 * | `@Input() labelPosition`                      | Whether the radio button is disabled.
 * | `@Input() disabled`                           | Event emitted when the checked state of this radio button changes. Change events are only emitted when the value changes due to user interaction with the radio button (the same behavior as `<input type-"radio">`).
 * | `radioGroup`                                  | The parent radio group. May or may not be present.
 * | `inputId`                                     | ID of the native input element inside `<md-radio-button>`
 * 
 * Methods
 * * `focus`: Focuses the radio button.
 * 
 * &nbsp;
 * # Additional classes
 * 
 * ## MdRadioChange
 * The placeholder directive. The content can declare this to implement more complex placeholders.
 * * Selector: `md-placeholder`
 * 
 * &nbsp;
 * ## MdHint
 * Change event object emitted by MdRadio and MdRadioGroup.
 * 
 * Properties
 * | Name          | Description                                     |
 * |-------------- | ------------------------------------------------|
 * | `source`      | The MdRadioButton that emits the change event.  |
 * | `value`        | The value of the MdRadioButton.                 |
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
import {VIEWPORT_RULER_PROVIDER} from '../core/overlay/index';
import {FocusOriginMonitor} from '../core/style/index';
import {MdRippleModule} from '../core/ripple/index';
import {MdCommonModule} from '../core/common-behaviors/index';
import {UNIQUE_SELECTION_DISPATCHER_PROVIDER} from '../core/coordination/unique-selection-dispatcher';
import {MdRadioGroup, MdRadioButton} from './radio';


@NgModule({
  imports: [CommonModule, MdRippleModule, MdCommonModule],
  exports: [MdRadioGroup, MdRadioButton, MdCommonModule],
  providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER, VIEWPORT_RULER_PROVIDER, FocusOriginMonitor],
  declarations: [MdRadioGroup, MdRadioButton],
})
export class MdRadioModule {}


export * from './radio';
