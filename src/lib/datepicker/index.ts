/**
 * ## The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar. It is made up of several components and directives that work together. 
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/datepicker/examples)
 * 
 * &nbsp;
 * ## Basic datepicker example
 * 
 * HTML
 * ```html
 * <md-input-container>
 *   <input mdInput [mdDatepicker]="picker" placeholder="Choose a date">
 *   <button mdSuffix [mdDatepickerToggle]="picker"></button>
 * </md-input-container>
 * <md-datepicker #picker></md-datepicker>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 *
 * \@Component({
 *   selector: 'datepicker-overview-example',
 *   templateUrl: 'datepicker-overview-example.html',
 *   styleUrls: ['datepicker-overview-example.css'],
 * })
 * export class DatepickerOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 *
 * ## Current state
 * Currently the datepicker is in the beginning stages and supports basic date selection functionality.
 * There are many more features that will be added in future iterations, including:
 *  * Support for datetimes (e.g. May 2, 2017 at 12:30pm) and month + year only (e.g. May 2017)
 *  * Support for selecting and displaying date ranges
 *  * Support for custom time zones
 *  * Infinite scrolling through calendar months
 *  * Built in support for [Moment.js](https://momentjs.com/) dates
 * 
 * &nbsp;
 * ## Connecting a datepicker to an input
 * A datepicker is composed of a text input and a calendar pop-up, connected via the `mdDatepicker`
 * property on the text input.
 * 
 * ```html
 * <input [mdDatepicker]="myDatepicker">
 * <md-datepicker #myDatepicker></md-datepicker>
 * ```
 * 
 * An optional datepicker toggle button is available. A toggle can be added to the example above:
 * 
 * ```html
 * <input [mdDatepicker]="myDatepicker">
 * <button [mdDatepickerToggle]="myDatepicker"></button>
 * <md-datepicker #myDatepicker></md-datepicker>
 * ```
 * 
 * This works exactly the same with an input that is part of an `<md-input-container>` and the toggle
 * can easily be used as a prefix or suffix on the material input:
 * 
 * ```html
 * <md-input-container>
 *   <input mdInput [mdDatepicker]="myDatepicker">
 *   <button mdSuffix [mdDatepickerToggle]="myDatepicker"></button>
 * </md-input-container>
 * <md-datepicker #myDatepicker></md-datepicker>
 * ```
 * 
 * &nbsp;
 * ## Setting the calendar starting view
 * By default the calendar will open in month view, this can be changed by setting the `startView`
 * property of `md-datepicker` to `"year"`. In year view the user will see all months of the year and
 * then proceed to month view after choosing a month.
 * 
 * The month or year that the calendar opens to is determined by first checking if any date is
 * currently selected, if so it will open to the month or year containing that date. Otherwise it will
 * open to the month or year containing today's date. This behavior can be overridden by using the
 * `startAt` property of `md-datepicker`. In this case the calendar will open to the month or year
 * containing the `startAt` date.
 * 
 * _Start View_
 * 
 * HTML
 * ```html
 * <md-input-container>
 *   <input mdInput [mdDatepicker]="picker" placeholder="Choose a date">
 *   <button mdSuffix [mdDatepickerToggle]="picker"></button>
 * </md-input-container>
 * <md-datepicker #picker startView="year" [startAt]="startDate"></md-datepicker>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'datepicker-start-view-example',
 *   templateUrl: 'datepicker-start-view-example.html',
 *   styleUrls: ['datepicker-start-view-example.css'],
 * })
 * export class DatepickerStartViewExample {
 *   startDate = new Date(1990, 0, 1);
 * }
 * ```
 * 
 * &nbsp;
 * ## Date validation
 * There are three properties that add date validation to the datepicker input. The first two are the
 * `min` and `max` properties. In addition to enforcing validation on the input, these properties will
 * disable all dates on the calendar popup before or after the respective values and prevent the user
 * from advancing the calendar past the `month` or `year` (depending on current view) containing the
 * `min` or `max` date.
 * 
 * _Min/Max Validation_
 * 
 * HTML
 * ```html
 * <md-input-container class="example-full-width">
 *   <input mdInput [min]="minDate" [max]="maxDate" [mdDatepicker]="picker" placeholder="Choose a date">
 *   <button mdSuffix [mdDatepickerToggle]="picker"></button>
 * </md-input-container>
 * <md-datepicker #picker></md-datepicker>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'datepicker-min-max-example',
 *   templateUrl: 'datepicker-min-max-example.html',
 *   styleUrls: ['datepicker-min-max-example.css'],
 * })
 * export class DatepickerMinMaxExample {
 *   minDate = new Date(2000, 0, 1);
 *   maxDate = new Date(2020, 0, 1);
 * }
 * ```
 * 
 * The second way to add date validation is using the `mdDatepickerFilter` property of the datepicker
 * input. This property accepts a function of `<D> => boolean` (where `<D>` is the date type used by
 * the datepicker, see section on
 * [choosing a date implementation](#choosing-a-date-implementation-and-date-format-settings)).
 * A result of `true` indicates that the date is valid and a result of `false` indicates that it is
 * not. Again this will also disable the dates on the calendar that are invalid. However, one important
 * difference between using `mdDatepickerFilter` vs using `min` or `max` is that filtering out all
 * dates before or after a certain point, will not prevent the user from advancing the calendar past
 * that point.
 * 
 * _Filter Validation_
 * 
 * HTML
 * ```html
 * <md-input-container class="example-full-width">
 *   <input mdInput [mdDatepickerFilter]="myFilter" [mdDatepicker]="picker" placeholder="Choose a date">
 *   <button mdSuffix [mdDatepickerToggle]="picker"></button>
 * </md-input-container>
 * <md-datepicker #picker></md-datepicker>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'datepicker-filter-example',
 *   templateUrl: 'datepicker-filter-example.html',
 *   styleUrls: ['datepicker-filter-example.css'],
 * })
 * export class DatepickerFilterExample {
 *   myFilter = (d: Date): boolean => {
 *     const day = d.getDay();
 *     // Prevent Saturday and Sunday from being selected.
 *     return day !== 0 && day !== 6;
 *   }
 * }
 * ```
 * 
 * In this example the user can back past 2005, but all of the dates before then will be unselectable.
 * They will not be able to go further back in the calendar than 2000. If they manually type in a date
 * that is before the min, after the max, or filtered out, the input will have validation errors.
 * 
 * Each validation property has a different error that can be checked:
 *  * A value that violates the `min` property will have a `mdDatepickerMin` error.
 *  * A value that violates the `max` property will have a `mdDatepickerMax` error.
 *  * A value that violates the `mdDatepickerFilter` property will have a `mdDatepickerFilter` error.
 * 
 * &nbsp;
 * ## Touch UI mode
 * The datepicker normally opens as a popup under the input. However this is not ideal for touch
 * devices that don't have as much screen real estate and need bigger click targets. For this reason
 * `md-datepicker` has a `touchUi` property that can be set to `true` in order to enable a more touch
 * friendly UI where the calendar opens in a large dialog.
 * 
 * _Touch_
 * 
 * HTML
 * ```html
 * <md-input-container class="example-full-width">
 *   <input mdInput [mdDatepicker]="picker" placeholder="Choose a date">
 *   <button mdSuffix [mdDatepickerToggle]="picker"></button>
 * </md-input-container>
 * <md-datepicker touchUi="true" #picker></md-datepicker>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'datepicker-touch-example',
 *   templateUrl: 'datepicker-touch-example.html',
 *   styleUrls: ['datepicker-touch-example.css'],
 * })
 * export class DatepickerTouchExample {
 * }
 * ```
 * 
 * &nbsp;
 * ## Manually opening and closing the calendar
 * The calendar popup can be programmatically controlled using the `open` and `close` methods on the
 * `md-datepicker`. It also has an `opened` property that reflects the status of the popup.
 * 
 * _API_
 * 
 * HTML
 * ```html
 * <md-input-container class="example-full-width">
 *   <input mdInput [mdDatepicker]="picker" placeholder="Choose a date">
 * </md-input-container>
 * <md-datepicker #picker></md-datepicker>
 * <button md-raised-button (click)="picker.open()">Open</button>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'datepicker-api-example',
 *   templateUrl: 'datepicker-api-example.html',
 *   styleUrls: ['datepicker-api-example.css'],
 * })
 * export class DatepickerApiExample {
 * }
 * ```
 * 
 * &nbsp;
 * ## Internationalization
 * 
 * In order to support internationalization, the datepicker supports customization of the following
 * three pieces via injection:
 *  1. The date implementation that the datepicker accepts.
 *  2. The display and parse formats used by the datepicker.
 *  3. The message strings used in the datepicker's UI.
 * 
 * __Setting the locale code__
 * 
 * By default the datepicker will use the locale code from the `LOCALE_ID` injection token from
 * `@angular/core`. If you want to override it, you can provide a new value for the token:
 * 
 * ```ts
 * \@NgModule({
 *   providers: [
 *     {provide: LOCALE_ID, useValue: 'en-GB'},
 *   ],
 * })
 * export class MyApp {}
 * ```
 * 
 * __Choosing a date implementation and date format settings__
 * 
 * The datepicker was built to be date implementation agnostic. This means that it can be made to work
 * with a variety of different date implementations. However it also means that developers need to make
 * sure to provide the appropriate pieces for the datepicker to work with their chosen implementation.
 * The easiest way to ensure this is just to import one of the pre-made modules (currently
 * `MdNativeDateModule` is the only implementation that ships with material, but there are plans to add
 * a module for Moment.js support):
 *  * `MdNativeDateModule` - support for native JavaScript Date object
 * 
 * These modules include providers for `DateAdapter` and `MD_DATE_FORMATS`
 * 
 * ```ts
 * \@NgModule({
 *   imports: [MdDatepickerModule, MdNativeDateModule],
 * })
 * export class MyApp {}
 * ```
 * 
 * Because `DateAdapter` is a generic class, `MdDatepicker` and `MdDatepickerInput` also need to be
 * made generic. When working with these classes (for example as a `ViewChild`) you should include the
 * appropriate generic type that corresponds to the `DateAdapter` implementation you are using. For
 * example:
 * 
 * ```ts
 * \@Component({...})
 * export class MyComponent {
 *   \@ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;
 * }
 * ```
 * 
 * *Please note: `MdNativeDateModule` is based off of the functionality available in JavaScript's
 * native `Date` object, and is thus not suitable for many locales. One of the biggest shortcomings of
 * the native `Date` object is the inability to set the parse format. We highly recommend using a
 * custom `DateAdapter` that works with the formatting/parsing library of your choice.*
 * 
 * __Customizing the date implementation__
 * 
 * The datepicker does all of its interaction with date objects via the `DateAdapter`. Making the
 * datepicker work with a different date implementation is as easy as extending `DateAdapter`, and
 * using your subclass as the provider. You will also want to make sure that the `MD_DATE_FORMATS`
 * provided in your app are formats that can be understood by your date implementation.
 * 
 * ```ts
 * \@NgModule({
 *   imports: [MdDatepickerModule],
 *   providers: [
 *     {provide: DateAdapter, useClass: MyDateAdapter},
 *     {provide: MD_DATE_FORMATS, useValue: MY_DATE_FORMATS},
 *   ],
 * })
 * export class MyApp {}
 * ```
 * 
 * __Customizing the parse and display formats__
 * 
 * The `MD_DATE_FORMATS` object is just a collection of formats that the datepicker uses when parsing
 * and displaying dates. These formats are passed through to the `DateAdapter` so you will want to make
 * sure that the format objects you're using are compatible with the `DateAdapter` used in your app.
 * This example shows how to use the native `Date` implementation from material, but with custom
 * formats.
 * 
 * ```ts
 * \@NgModule({
 *   imports: [MdDatepickerModule],
 *   providers: [
 *     {provide: DateAdapter, useClass: NativeDateAdapter},
 *     {provide: MD_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS},
 *   ],
 * })
 * export class MyApp {}
 * ```
 * 
 * __Localizing labels and messages__
 * 
 * The various text strings used by the datepicker are provided through `MdDatepickerIntl`.
 * Localization of these messages can be done by providing a subclass with translated values in your
 * application root module.
 * 
 * ```ts
 * \@NgModule({
 *   imports: [MdDatepickerModule, MdNativeDateModule],
 *   providers: [
 *     {provide: MdDatepickerIntl, useClass: MyIntl},
 *   ],
 * })
 * export class MyApp {}
 * ```
 * 
 * &nbsp;
 * # Services
 * 
 * ## MdDatepickerIntl
 * Datepicker data that requires internationalization.
 * 
 * Properties
 * | Name                     | Description
 * |------------------------- | ----------------------------------------------------------------------------------
 * | `calendarLabel`          | A label for the calendar popup (used by screen readers).
 * | `openCalendarLabel`      | A label for the button used to open the calendar popup (used by screen readers).
 * | `prevMonthLabel`         | A label for the previous month button (used by screen readers).
 * | `nextMonthLabel`         | A label for the next month button (used by screen readers).
 * | `prevYearLabel`          | A label for the previous year button (used by screen readers).
 * | `nextYearLabel`          | A label for the next year button (used by screen readers).
 * | `switchToMonthViewLabel` | A label for the 'switch to month view' button (used by screen readers).
 * | `switchToYearViewLabel`  | A label for the 'switch to year view' button (used by screen readers).
 * 
 * &nbsp;
 * # Directives
 * 
 * ## MdDatepicker
 * Component responsible for managing the datepicker popup/dialog.
 * * Selector: `md-datepicker`
 * 
 * Properties
 * | Name                    | Description
 * |------------------------ | ----------------------------------------------------------------------------------
 * | `positionY`             | Whether the autocomplete panel displays above or below its trigger.
 * | `showPanel`             | Whether the autocomplete panel should be visible, depending on option length.
 * | `panel`                 | Element for the panel containing the autocomplete options.
 * | `@Input() displayWith`  | Function that maps an option's control value to its display value in the trigger.
 * | `id`                    | Unique ID to be used by autocomplete trigger's "aria-owns" property.
 * 
 * Methods
 * * `open`: Open the calendar.
 * * `close`: Close the calendar.
 * 
 * 
 * &nbsp;
 * ## MdDatepickerInput
 * Directive used to connect an input to a MdDatepicker.
 * * Selector: `input[mdDatepicker]`
 * 
 * Properties
 * | Name                                    | Description
 * |---------------------------------------- | ----------------------------------------------------------------------------------
 * | `@Input() mdDatepicker`                 | The datepicker that this input is associated with.
 * | `@Input() matDatepicker`                | 
 * | `@Input() mdDatepickerFilter`           | 
 * | `@Input() matDatepickerFilter`          | 
 * | `@Input() value`                        | The value of the input.
 * | `@Input() min`                          | The minimum valid date.
 * | `@Input() max`                          | The maximum valid date.
 * | `@Input() disabled`                     | Whether the datepicker-input is disabled.
 * 
 * 
 * Methods
 * * `registerOnValidatorChange`
 *    * Parameters
 *       * fn - `() => void`
 * * `validate`
 *    * Parameters
 *       * c - `abstractControl`
 *    * Returns
 *       * `ValidationErrors | null`
 * * `getPopupConnectionElementRef`: Gets the element that the datepicker popup should be connected to.
 *    * Returns
 *       * ElementRef - The element to connect the popup to
 * 
 * &nbsp;
 * ## MdDatepickerToggle
 * * Selector: `button[mdDatepickerToggle]`
 * 
 * Properties
 * | Name                                       | Description
 * |------------------------------------------- | ----------------------------------------------------------------------------------
 * | `@Input('mdDatepickerToggle') datepicker`  | Datepicker instance that the button will toggle.
 * | `@Input() disabled`                        | Whether the toggle button is disabled.
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
import {MdMonthView} from './month-view';
import {CommonModule} from '@angular/common';
import {A11yModule} from '@angular/cdk';
import {StyleModule} from '../core/style/index';
import {OverlayModule} from '../core/overlay/index';
import {MdCalendarBody} from './calendar-body';
import {MdYearView} from './year-view';
import {
  MdDatepicker,
  MdDatepickerContent,
  MD_DATEPICKER_SCROLL_STRATEGY_PROVIDER,
} from './datepicker';
import {MdDatepickerInput} from './datepicker-input';
import {MdDialogModule} from '../dialog/index';
import {MdCalendar} from './calendar';
import {MdDatepickerToggle} from './datepicker-toggle';
import {MdButtonModule} from '../button/index';
import {MdDatepickerIntl} from './datepicker-intl';


export * from './calendar';
export * from './calendar-body';
export * from './datepicker';
export * from './datepicker-input';
export * from './datepicker-intl';
export * from './datepicker-toggle';
export * from './month-view';
export * from './year-view';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdDialogModule,
    OverlayModule,
    StyleModule,
    A11yModule,
  ],
  exports: [
    MdDatepicker,
    MdDatepickerContent,
    MdDatepickerInput,
    MdDatepickerToggle,
  ],
  declarations: [
    MdCalendar,
    MdCalendarBody,
    MdDatepicker,
    MdDatepickerContent,
    MdDatepickerInput,
    MdDatepickerToggle,
    MdMonthView,
    MdYearView,
  ],
  providers: [
    MdDatepickerIntl,
    MD_DATEPICKER_SCROLL_STRATEGY_PROVIDER,
  ],
  entryComponents: [
    MdDatepickerContent,
  ]
})
export class MdDatepickerModule {}
