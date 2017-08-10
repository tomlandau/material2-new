/**
 * ## `<md-checkbox>` provides the same functionality as a native `<input type="checkbox">` enhanced with Material Design styling and animations. 
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/checkbox/examples)
 * 
 * &nbsp;
 * ## Basic checkbox example
 * 
 * HTML
 * ```html
 * <md-checkbox>Check me!</md-checkbox>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'checkbox-overview-example',
 *   templateUrl: 'checkbox-overview-example.html',
 * })
 * export class CheckboxOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * 
 * ## Checkbox label
 * The checkbox label is provided as the content to the `<md-checkbox>` element. The label 
 * can be positioned before or after the checkbox by setting the `labelPosition` property to 
 * '`before`' or '`after`'.
 *
 * If you don't want the label to appear next to the checkbox, you can use `aria-label` or 
 * `aria-labelledby` to specify an appropriate label.
 * 
 * &nbsp;
 * ## Use with @angular/forms
 * `<md-checkbox>` is compatible with `@angular/forms` and supports both `FormsModule` and `ReactiveFormsModule`.
 *
 * &nbsp;
 * ## Indeterminate state
 * `<md-checkbox>` supports an indeterminate state, similar to the native `<input type="checkbox">`. While the 
 * `indeterminate` property of the checkbox is true, it will render as indeterminate regardless of the `checked` 
 * value. Any interaction with the checkbox by a user (i.e., clicking) will remove the indeterminate state.
 * 
 * 
 * &nbsp;
 * ## Theming
 * The color of a `<md-checkbox>` can be changed by using the `color` property. By default, checkboxes use the 
 * theme's accent color. This can be changed to '`primary`' or '`warn`'.
 * 
 * 
 * &nbsp;
 * ## Keyboard interaction:
 * * DOWN_ARROW: Next option becomes active.
 * * UP_ARROW: Previous option becomes active.
 * * ENTER: Select currently active item.
 * 
 * &nbsp;
 * # Directives
 * 
 * ## MdCheckbox
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox, and exposes 
 * a similar API. A MdCheckbox can be either checked, unchecked, indeterminate, or disabled. Note that all 
 * additional accessibility attributes are taken care of by the component, so there is no need to provide them 
 * yourself. However, if you want to omit a label and still have the checkbox be accessible, you may supply an 
 * [aria-label] input. See: [https://www.google.com/design/spec/components/selection-controls.html](https://www.google.com/design/spec/components/selection-controls.html)
 * * Selector: `md-checkbox`
 * 
 * Properties
 * | Name                                       | Description
 * |------------------------------------------- | ----------------------------------------------------------------------------------
 * | `@Input('aria-label') ariaLabel`           | Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will take precedence so this may be omitted.
 * | `@Input('aria-labelledby') ariaLabelledby` | Whether the autocomplete panel should be visible, depending on option length.
 * | `@Input() id`                              | A unique id for the checkbox. If one is not supplied, it is auto-generated.
 * | `@Input() disableRipple`                   | Whether the ripple effect for this checkbox is disabled.
 * | `inputId`                                  | ID of the native input element inside <md-checkbox>
 * | `@Input() required`                        | Whether the checkbox is required.
 * | `@Input() Deprecated align`                | Whether or not the checkbox should appear before or after the label.
 * | `@Input() labelPosition`                   | Whether the label should appear after or before the checkbox. Defaults to 'after'
 * | `@Input() name`                            | Name value will be applied to the input element if present
 * | `@Output() change`                         | Event emitted when the checkbox's checked value changes.
 * | `@Output() indeterminateChange`            | Event emitted when the checkbox's indeterminate value changes.
 * | `@Input() value`                           | The value attribute of the native input element
 * | `@Input() checked`                         | Whether the checkbox is checked.
 * | `@Input() indeterminate`                   | Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to represent a checkbox with three states, e.g. a checkbox that represents a nested list of checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately set to false.
 * 
 * Methods
 * * `toggle`: Toggles the checked state of the checkbox.
 * * `focus`: Focuses the checkbox.
 * 
 * &nbsp;
 * # Additional classes
 * 
 * ## MdCheckboxChange
 * Change event object emitted by MdCheckbox.
 * 
 * Properties
 * | Name           | Description
 * |----------------| ---------------------------------------------
 * | `source`       | The source MdCheckbox of the event.
 * | `checked`      | The new checked value of the checkbox.
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
import {ObserveContentModule} from '@angular/cdk';
import {FocusOriginMonitor} from '../core/style/index';
import {MdRippleModule} from '../core/ripple/index';
import {MdCommonModule} from '../core/common-behaviors/index';
import {MdCheckbox} from './checkbox';


@NgModule({
  imports: [CommonModule, MdRippleModule, MdCommonModule, ObserveContentModule],
  exports: [MdCheckbox, MdCommonModule],
  declarations: [MdCheckbox],
  providers: [FocusOriginMonitor]
})
export class MdCheckboxModule {}


export * from './checkbox';
