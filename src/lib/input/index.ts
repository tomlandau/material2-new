/**
 * ## `<md-input-container>` is a wrapper for native input and textarea elements. This container applies Material Design styles and behavior while still allowing direct access to the underlying native element.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/input/examples)
 * 
 * &nbsp;
 * ## Basic example
 * The native element wrapped by the `md-input-container` must be marked with the `mdInput` directive.
 * 
 * HTML
 * ```html
 * <md-input-container>
 *   <input mdInput placeholder="Favorite food" value="Sushi">
 * </md-input-container>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 *
 * \@Component({
 *   selector: 'input-overview-example',
 *   templateUrl: 'input-overview-example.html',
 * })
 * export class InputOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## `input` and `textarea` attributes
 * 
 * All of the attributes that can be used with normal `input` and `textarea` elements can be used on
 * elements inside `md-input-container` as well. This includes Angular directives such as
 * `ngModel` and `formControl`.
 * 
 * The only limitations are that the `type` attribute can only be one of the values supported by
 * `md-input-container` and the native element cannot specify a `placeholder` attribute if the
 * `md-input-container` also contains a `md-placeholder` element.
 * 
 * &nbsp;
 * ## Supported `input` types
 * 
 * The following [input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) can
 * be used with `md-input-container`:
 * * date
 * * datetime-local
 * * email
 * * month
 * * number
 * * password
 * * search
 * * tel
 * * text
 * * time
 * * url
 * * week
 * 
 * &nbsp;
 * ## Error messages
 * 
 * Error messages can be shown beneath an input by specifying `md-error` elements inside the
 * `md-input-container`. Errors are hidden by default and will be displayed on invalid inputs after
 * the user has interacted with the element or the parent form has been submitted. In addition,
 * whenever errors are displayed, the container's `md-hint` labels will be hidden.
 * 
 * If an input element can have more than one error state, it is up to the consumer to toggle which
 * messages should be displayed. This can be done with CSS, `ngIf` or `ngSwitch`.
 * 
 * Note that, while multiple error messages can be displayed at the same time, it is recommended to
 * only show one at a time.
 * 
 * HTML
 * ```html
 * <form class="example-form">
 *   <md-input-container class="example-full-width">
 *     <input mdInput placeholder="Email" [formControl]="emailFormControl">
 *     <md-error *ngIf="emailFormControl.hasError('pattern')">
 *       Please enter a valid email address
 *     </md-error>
 *     <md-error *ngIf="emailFormControl.hasError('required')">
 *       Email is <strong>required</strong>
 *     </md-error>
 *   </md-input-container>
 * </form>
 * ```
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 * import {FormControl, Validators} from '@angular/forms';
 *
 * const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 *
 * \@Component({
 *   selector: 'input-errors-example',
 *   templateUrl: 'input-errors-example.html',
 *   styleUrls: ['input-errors-example.css'],
 * })
 * export class InputErrorsExample {
 *
 * emailFormControl = new FormControl('', [
 *   Validators.required,
 *   Validators.pattern(EMAIL_REGEX)]);
 *
 * }
 * ```
 * 
 * CSS
 * ```css
 * .example-form {
 *   width: 500px;
 * }
 *
 * .example-full-width {
 *   width: 100%;
 * }
 * ````
 * 
 * &nbsp;
 * ## Placeholder
 * 
 * A placeholder is an indicative text displayed in the input zone when the input does not contain
 * text. When text is present, the indicative text will float above this input zone.
 * 
 * The `floatPlaceholder` attribute of `md-input-container` can be set to `never` to hide the
 * indicative text instead when text is present in the input.
 * 
 * When setting `floatPlaceholder` to `always` the floating label will always show above the input.
 * 
 * A placeholder for the input can be specified in one of two ways: either using the `placeholder`
 * attribute on the `input` or `textarea`, or using an `md-placeholder` element in the
 * `md-input-container`. Using both will raise an error.
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
 * 
 * &nbsp;
 * ## Prefix and Suffix
 * 
 * HTML can be included before, and after the input tag, as prefix or suffix. It will be underlined as
 * per the Material specification, and clicking it will focus the input.
 * 
 * Adding the `mdPrefix` attribute to an element inside the `md-input-container` will designate it as
 * the prefix. Similarly, adding `mdSuffix` will designate it as the suffix.
 * 
 * HTML
 * ```html
 * <form class="example-form">
 *   <md-input-container class="example-full-width">
 *     <span mdPrefix>+1 &nbsp;</span>
 *     <input type="tel" mdInput placeholder="Telephone">
 *     <md-icon mdSuffix>mode_edit</md-icon>
 *   </md-input-container>
 * </form>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'input-prefix-suffix-example',
 *   templateUrl: 'input-prefix-suffix-example.html',
 *   styleUrls: ['input-prefix-suffix-example.css'],
 * })
 * export class InputPrefixSuffixExample { }
 * ```
 * 
 * CSS
 * ```cs
 * .example-form {
 *   width: 500px;
 * }
 *
 * .example-full-width {
 *   width: 100%;
 * }
 * ```
 * 
 * &nbsp;
 * ## Hint Labels
 * 
 * Hint labels are the labels that show below the underline. An `md-input-container` can have up to two
 * hint labels; one on the `start` of the line (left in an LTR language, right in RTL), and one on the
 * `end`.
 * 
 * Hint labels are specified in one of two ways: either using the `hintLabel` attribute of
 * `md-input-container`, or using an `md-hint` element inside the `md-input-container`, which takes an
 * `align` attribute containing the side. The attribute version is assumed to be at the `start`.
 * Specifying a side twice will result in an exception during initialization.
 * 
 * HTML
 * ```html
 * <form class="example-form">
 *
 * <md-input-container class="example-full-width">
 *   <input mdInput #message maxlength="256" placeholder="Message">
 *   <md-hint align="start"><strong>Don't disclose personal info</strong> </md-hint>
 *   <md-hint align="end">{{message.value.length}} / 256</md-hint>
 * </md-input-container>
 * 
 * </form>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'input-hint-example',
 *   templateUrl: 'input-hint-example.html',
 *   styleUrls: ['input-hint-example.css'],
 * })
 * export class InputHintExample { }
 * ```
 * 
 * CSS
 * ```cs
 * .example-form {
 *   width: 500px; 
 * }
 *
 * .example-full-width {
 *   width: 100%;
 * }
 * ```
 * 
 * &nbsp;
 * ## Underline Color
 * 
 * The underline (line under the `input` content) color can be changed by using the `color`
 * attribute of `md-input-container`. A value of `primary` is the default and will correspond to the
 * theme primary color. Alternatively, `accent` or `warn` can be specified to use the theme's accent or
 * warn color.
 * 
 * &nbsp;
 * ## Custom Error Matcher
 * 
 * By default, error messages are shown when the control is invalid and either the user has interacted with
 * (touched) the element or the parent form has been submitted. If you wish to override this
 * behavior (e.g. to show the error as soon as the invalid control is dirty or when a parent form group
 * is invalid), you can use the `errorStateMatcher` property of the `mdInput`. To use this property,
 * create a function in your component class that returns a boolean. A result of `true` will display
 * the error messages.
 * 
 * ```html
 * <md-input-container>
 *   <input mdInput [(ngModel)]="myInput" required [errorStateMatcher]="myErrorStateMatcher">
 *   <md-error>This field is required</md-error>
 * </md-input-container>
 * ```
 * 
 * ```ts
 * function myErrorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
 *   // Error when invalid control is dirty, touched, or submitted
 *   const isSubmitted = form && form.submitted;
 *   return !!(control.invalid && (control.dirty || control.touched || isSubmitted)));
 * }
 * ```
 * 
 * A global error state matcher can be specified by setting the `MD_ERROR_GLOBAL_OPTIONS` provider. This applies
 * to all inputs. For convenience, `showOnDirtyErrorStateMatcher` is available in order to globally cause
 * input errors to show when the input is dirty and invalid.
 * 
 * ```ts
 * \@NgModule({
 *   providers: [
 *     {provide: MD_ERROR_GLOBAL_OPTIONS, useValue: { errorStateMatcher: showOnDirtyErrorStateMatcher }}
 *   ]
 * })
 * ```
 * 
 * Here are the available global options:
 * 
 * | Name              | Type     | Description |
 * | ----------------- | -------- | ----------- |
 * | errorStateMatcher | Function | Returns a boolean specifying if the error should be shown |
 * 
 * &nbsp;
 * # Directives
 * 
 * ## MdTextareaAutosize
 * Directive to automatically resize a textarea to fit its content.
 * * Selector: `textarea[mdTextareaAutosize]`
 * * Exported as: `mdTextareaAutosize`
 * 
 * Properties
 * | Name                                  | Description             |
 * |-------------------------------------- | ------------------------|
 * | `@Input('mdAutosizeMinRows') minRows` |                         |
 * | `@Input('mdAutosizeMaxRows') maxRows` |                         |
 * 
 * Methods
 * * `resizeToFitContent`: Resize the textarea to fit its content.
 * 
 * 
 * &nbsp;
 * ## MdPlaceholder
 * The placeholder directive. The content can declare this to implement more complex placeholders.
 * * Selector: `md-placeholder`
 * 
 * &nbsp;
 * ## MdHint
 * Hint text to be shown underneath the input.
 * * Selector: `md-hint`
 * 
 * Properties
 * | Name                   | Description                                                          |
 * |----------------------- | ---------------------------------------------------------------------|
 * | `@Input() align`       | Whether to align the hint label at the start or end of the line.     |
 * | `@Input() id`          | Unique ID for the hint. Used for the aria-describedby on the input.  |
 * 
 * &nbsp;
 * ## MdErrorDirective
 * Single error message to be shown underneath the input.
 * * Selector: `md-error`
 * 
 * &nbsp;
 * ## MdPrefix
 * Prefix to be placed the the front of the input.
 * * Selector: `[mdPrefix] [md-prefix]`
 * 
 * &nbsp;
 * ## MdSuffix
 * Suffix to be placed at the end of the input.
 * * Selector: `[mdSuffix] [md-suffix]`
 * 
 * &nbsp;
 * ## MdInputDirective
 * Marker for the input element that MdInputContainer is wrapping.
 * * Selector: `input[mdInput] textarea[mdInput]`
 * 
 * Properties
 * | Name                           | Description
 * |------------------------------- | -------------------------------------------------------------------
 * | `focused`                      | Whether the element is focused or not.
 * | `ariaDescribedby`              | Sets the aria-describedby attribute on the input for improved a11y.
 * | `@Input() disabled`            | Whether the element is disabled.
 * | `@Input() id`                  | Unique id of the element.
 * | `@Input() placeholder`         | Placeholder attribute of the element.
 * | `@Input() required`            | Whether the element is required.
 * | `@Input() type`                | Input type of the element.
 * | `@Input() errorStateMatcher`   | A function used to control when error messages are shown.
 * | `value`                        | The input element's value.
 * | `empty`                        | Whether the input is empty.
 * 
 * 
 * Methods
 * * `focus`: Focuses the input element.
 * 
 * 
 * &nbsp;
 * ## MdInputContainer
 * Container for text inputs that applies Material Design styling and behavior.
 * * Selector: `md-input-container`
 * 
 * Properties
 * | Name                                    | Description
 * |---------------------------------------- | ----------------------------------------------------------------------------------
 * | `@Input() color`                        | Color of the input divider, based on the theme.
 * | `@Input() Deprecated dividerColor`      | 
 * | `@Input() hideRequiredMarker`           | Whether the required marker should be hidden.
 * | `@Input() hintLabel`                    | Text for the input hint.
 * | `@Input() floatPlaceholder`             | Whether the placeholder should always float, never float or float as the user types.
 * | `underlineRef`                          | Reference to the input's underline element.
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
import {
  MdErrorDirective,
  MdHint,
  MdInputContainer,
  MdInputDirective,
  MdPlaceholder,
  MdPrefix,
  MdSuffix
} from './input-container';
import {MdTextareaAutosize} from './autosize';
import {CommonModule} from '@angular/common';
import {PlatformModule} from '../core/platform/index';


@NgModule({
  declarations: [
    MdErrorDirective,
    MdHint,
    MdInputContainer,
    MdInputDirective,
    MdPlaceholder,
    MdPrefix,
    MdSuffix,
    MdTextareaAutosize,
  ],
  imports: [
    CommonModule,
    PlatformModule,
  ],
  exports: [
    MdErrorDirective,
    MdHint,
    MdInputContainer,
    MdInputDirective,
    MdPlaceholder,
    MdPrefix,
    MdSuffix,
    MdTextareaAutosize,
  ],
})
export class MdInputModule {}


export * from './autosize';
export * from './input-container';
export * from './input-container-errors';

