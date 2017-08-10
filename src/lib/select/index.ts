/**
 * `<md-select>` is a form control for selecting a value from a set of options, similar to the native `<select>` element. 
 *
 * You can read more about selects in the [Material Design spec](https://material.google.com/components/menus.html).

 * You can see live examples in the Material [documentation](https://material.angular.io/components/select/overview)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-select placeholder="Favorite food">
 *   <md-option *ngFor="let food of foods" [value]="food.value">
 *     {{ food.viewValue }}
 *   </md-option>
 * </md-select>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 *
 * \@Component({
 *   selector: 'select-overview-example',
 *   templateUrl: 'select-overview-example.html',
 * })
 * export class SelectOverviewExample {
 *   foods = [
 *     {value: 'steak-0', viewValue: 'Steak'},
 *     {value: 'pizza-1', viewValue: 'Pizza'},
 *     {value: 'tacos-2', viewValue: 'Tacos'}
 *   ];
 * }
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Simple select
 * 
 * In your template, create an `md-select` element. For each option you'd like in your select, add an
 * `md-option` tag. Note that you can disable items by adding the `disabled` boolean attribute or
 * binding to it.
 * 
 * *my-comp.html*
 * ```html
 * <md-select placeholder="State">
 *    <md-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</md-option>
 * </md-select>
 * ```
 * 
 * &nbsp;
 * ## Getting and setting the select value
 * 
 * The select component is set up as a custom value accessor, so you can manipulate the select's value using
 * any of the form directives from the core `FormsModule` or `ReactiveFormsModule`: `ngModel`, `formControl`, etc.
 * 
 * *my-comp.html*
 * ```html
 * <md-select placeholder="State" [(ngModel)]="myState">
 *    <md-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</md-option>
 * </md-select>
 * ```
 * 
 * *my-comp.ts*
 * ```ts
 * class MyComp {
 *   myState = 'AZ';
 *   states = [{code: 'AL', name: 'Alabama'}...];
 * }
 * ```
 * 
 * &nbsp;
 * ## Resetting the select value
 * 
 * If you want one of your options to reset the select's value, you can omit specifying its value:
 * 
 * *my-comp.html*
 * ```html
 * <md-select placeholder="State">
 *    <md-option>None</md-option>
 *    <md-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</md-option>
 * </md-select>
 * ```
 * 
 * &nbsp;
 * ## Setting a static placeholder
 * 
 * It's possible to turn off the placeholder's floating animation using the `floatPlaceholder` property. It accepts one of three string options:
 * - `'auto'`: This is the default floating placeholder animation. It will float up when a selection is made.
 * - `'never'`: This makes the placeholder static. Rather than floating, it will disappear once a selection is made.
 * - `'always'`: This makes the placeholder permanently float above the input. It will not animate up or down.
 * 
 * ```html
 * <md-select placeholder="State" [(ngModel)]="myState" floatPlaceholder="never">
 *    <md-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</md-option>
 * </md-select>
 * ```
 * 
 * Global default placeholder options can be specified by setting the `MD_PLACEHOLDER_GLOBAL_OPTIONS` provider. This setting will apply to all components that support the floating placeholder.
 * 
 * ```ts
 * \@NgModule({
 *   providers: [
 *     {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' }}
 *   ]
 * })
 * ```
 * 
 * Here are the available global options:
 * 
 * | Name            | Type    | Values              | Description                               |
 * | --------------- | ------- | ------------------- | ----------------------------------------- |
 * | float           | string  | auto, always, never | The default placeholder float behavior.   |
 * 
 * &nbsp;
 * ## Keyboard interaction:
 * - <kbd>DOWN_ARROW</kbd>: Focus next option
 * - <kbd>UP_ARROW</kbd>: Focus previous option
 * - <kbd>ENTER</kbd> or <kbd>SPACE</kbd>: Select focused item
 * 
 * &nbsp;
 * # Directives
 * ## MdSelect
 * A group of radio buttons. May contain one or more `<md-radio-button>` elements.
 * * Selector: `md-select`
 * * Exported as: `mdSelect`
 * 
 * Properties
 * | Name                                        | Description             |
 * |-------------------------------------------- | ------------------------|
 * | `trigger`                                   | Trigger that opens the select.
 * | `overlayDir`                                | Overlay pane containing the options.
 * | `options`                                   | All of the defined select options.
 * | `optionGroups`                              | All of the defined groups of options.
 * | `@Input() panelClass`                       | Classes to be passed to the select panel. Supports the same syntax as `ngClass`.
 * | `@Input() placeholder`                      | Placeholder to be shown if no value has been selected.      
 * | `@Input() required`                         | Whether the component is required.
 * | `@Input() multiple`                         | Whether the user should be allowed to select multiple options.
 * | `@Input() floatPlaceholder`                 | Whether to float the placeholder text.
 * | `@Input('aria-label') ariaLabel`            | Aria label of the select. If not specified, the placeholder will be used as label.
 * | `@Input('aria-labelledby') ariaLabelledby`  | Input that can be used to specify the aria-labelledby attribute.
 * | `optionSelectionChanges`                    | Combined stream of all of the child options' change events.
 * | `@Output() onOpen`                          | Event emitted when the select has been opened.
 * | `@Output() onClose`                         | Event emitted when the select has been closed.
 * | `@Output() change`                          | Event emitted when the selected value has been changed by the user.
 * | `@Input() panelOpen`                        | Whether or not the overlay panel is open.
 * | `@Input() selected`                         | The currently selected option.
 * | `@Input() triggerValue`                     | The value displayed in the trigger.
 * 
 * Methods
 * * `toggle`: Toggles the overlay panel open or closed.
 * * `open`: Opens the overlay panel.
 * * `close`: Closes the overlay panel.
 * * `focus`: Focuses the select element.
 * 
 * &nbsp;
 * # Additional classes
 * 
 * ## MdSelectChange
 * Change event object that is emitted when the select value has changed.
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
import {MdSelect, MD_SELECT_SCROLL_STRATEGY_PROVIDER} from './select';
import {MdOptionModule} from '../core/option/index';
import {OverlayModule} from '../core/overlay/index';
import {MdCommonModule} from '../core/common-behaviors/common-module';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MdOptionModule,
    MdCommonModule,
  ],
  exports: [MdSelect, MdOptionModule, MdCommonModule],
  declarations: [MdSelect],
  providers: [MD_SELECT_SCROLL_STRATEGY_PROVIDER]
})
export class MdSelectModule {}


export * from './select';
export {fadeInContent, transformPanel, transformPlaceholder} from './select-animations';
