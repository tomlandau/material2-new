/**
 * ## The autocomplete is a normal text input enhanced by a panel of suggested options. 
 * 
 * You can read more about autocompletes in the [Material Design spec](https://material.io/guidelines/components/text-fields.html#text-fields-auto-complete-text-field).
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/autocomplete/examples)
 * 
 * &nbsp;
 * # Overview
 * 
 * ## Simple autocomplete
 * Start by adding a regular `mdInput` to the page. Let's assume you're using the `formControl` directive 
 * from the `@angular/forms` module to track the value of the input.
 * 
 * _my-comp.html_
 * ```js
 * <md-input-container>
 *  <input type="text" mdInput [formControl]="myControl">
 * </md-input-container>
 * ```
 * 
 * Next, create the autocomplete panel and the options displayed inside it. Each option should be defined 
 * by an `md-option` tag. Set each option's value property to whatever you'd like the value of the text 
 * input to be upon that option's selection.
 * 
 * _my-comp.html_
 * ```js
 * <md-autocomplete>
 *  <md-option *ngFor="let option of options" [value]="option">
 *     {{ option }}
 *  </md-option>
 * </md-autocomplete>
 * ```
 * 
 * Now we'll need to link the text input to its panel. We can do this by exporting the autocomplete 
 * panel instance into a local template variable (here we called it "auto"), and binding that variable 
 * to the input's `mdAutocomplete` property.
 * 
 * _my-comp.html_
 * ```js
 * <md-input-container>
 *  <input type="text" mdInput [formControl]="myControl" [mdAutocomplete]="auto">
 * </md-input-container>
 *
 * <md-autocomplete #auto="mdAutocomplete">
 *  <md-option *ngFor="let option of options" [value]="option">
 *     {{ option }}
 *  </md-option>
 * </md-autocomplete>
 * ```
 * 
 * &nbsp;
 * ## Adding a custom filter
 * 
 * At this point, the autocomplete panel should be toggleable on focus and options should be selectable. 
 * But if we want our options to filter when we type, we need to add a custom filter.
 *
 * You can filter the options in any way you like based on the text input*. Here we will perform a simple 
 * string test on the option value to see if it matches the input value, starting from the option's first 
 * letter. We already have access to the built-in `valueChanges` observable on the `FormControl`, so we can 
 * simply map the text input's values to the suggested options by passing them through this filter. The 
 * resulting observable (`filteredOptions`) can be added to the template in place of the `options` property 
 * using the `async` pipe.
 *
 * Below we are also priming our value change stream with `null` so that the options are filtered by that 
 * value on init (before there are any value changes).
 * 
 * For optimal accessibility, you may want to consider adding text guidance on the page to explain filter 
 * criteria. This is especially helpful for screenreader users if you're using a non-standard filter that 
 * doesn't limit matches to the beginning of the string.
 * 
 * _my-comp.ts_
 * ```js
 * class MyComp {
 *  myControl = new FormControl();
 *  options = [
 *   'One',
 *   'Two',
 *   'Three'
 *  ];
 *  filteredOptions: Observable<string[]>;
 *
 *  ngOnInit() {
 *     this.filteredOptions = this.myControl.valueChanges
 *        .startWith(null)
 *        .map(val => val ? this.filter(val) : this.options.slice());
 *  }
 *
 *  filter(val: string): string[] {
 *     return this.options.filter(option => new RegExp(`^${val}`, 'gi').test(option)); 
 *  }
 * }
 * ```
 * 
 * _my-comp.html_
 * ```js
 * <md-input-container>
 *  <input type="text" mdInput [formControl]="myControl" [mdAutocomplete]="auto">
 * </md-input-container>
 *
 * <md-autocomplete #auto="mdAutocomplete">
 *  <md-option *ngFor="let option of filteredOptions | async" [value]="option">
 *     {{ option }}
 *  </md-option>
 * </md-autocomplete>
 * ```
 * 
 * &nbsp;
 * ## Setting separate control and display values
 * 
 * If you want the option's control value (what is saved in the form) to be different than the option's 
 * display value (what is displayed in the actual text field), you'll need to set the `displayWith` property 
 * on your autocomplete element. A common use case for this might be if you want to save your data as an 
 * object, but display just one of the option's string properties.
 *
 * To make this work, create a function on your component class that maps the control value to the desired 
 * display value. Then bind it to the autocomplete's `displayWith` property.
 * 
 * ```js
 * <md-input-container>
 *  <input type="text" mdInput [formControl]="myControl" [mdAutocomplete]="auto">
 * </md-input-container>
 *
 * <md-autocomplete #auto="mdAutocomplete" [displayWith]="displayFn">
 *  <md-option *ngFor="let option of filteredOptions | async" [value]="option">
 *     {{ option.name }}
 *  </md-option>
 * </md-autocomplete>
 * ```
 * 
 * _my-comp.js_
 * ```js
 * class MyComp {
 *  myControl = new FormControl();
 *  options = [
 *    new User('Mary'),
 *    new User('Shelley'),
 *    new User('Igor')
 *  ];
 *  filteredOptions: Observable<User[]>;
 *
 *  ngOnInit() { 
 *     this.filteredOptions = this.myControl.valueChanges
 *        .startWith(null)
 *        .map(user => user && typeof user === 'object' ? user.name : user)
 *        .map(name => name ? this.filter(name) : this.options.slice());
 *  }
 *
 *  filter(name: string): User[] {
 *     return this.options.filter(option => new RegExp(`^${name}`, 'gi').test(option.name)); 
 *  }
 *
 *  displayFn(user: User): string {
 *     return user ? user.name : user;
 *  }
 * }
 * ```
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
 * ## MdAutocomplete
 * * Selector: `md-autocomplete`
 * * Exported as: `mdAutocomplete`
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
 * &nbsp;
 * ## MdAutocompleteTrigger
 * * Selector: `input[mdAutocomplete]`
 * 
 * Properties
 * | Name                                    | Description
 * |---------------------------------------- | ----------------------------------------------------------------------------------
 * | `@Input('mdAutocomplete') autocomplete` | 
 * | `panelOpen`                             | 
 * | `panelClosingActions`                   | A stream of actions that should close the autocomplete panel, including when an option is selected, on blur, and when TAB is pressed.
 * | `optionSelections`                      | Stream of autocomplete option selections.
 * | `activeOption`                          | The currently active option, coerced to MdOption type.
 * 
 * Methods
 * * `openPanel`: Opens the autocomplete suggestion panel.
 * * `closePanel`: Closes the autocomplete suggestion panel.
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
import {MdCommonModule} from '../core/common-behaviors/common-module';
import {MdOptionModule} from '../core/option/index';
import {OverlayModule} from '../core/overlay/index';
import {CommonModule} from '@angular/common';
import {MdAutocomplete} from './autocomplete';
import {
  MdAutocompleteTrigger,
  MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER,
} from './autocomplete-trigger';

@NgModule({
  imports: [MdOptionModule, OverlayModule, MdCommonModule, CommonModule],
  exports: [MdAutocomplete, MdOptionModule, MdAutocompleteTrigger, MdCommonModule],
  declarations: [MdAutocomplete, MdAutocompleteTrigger],
  providers: [MD_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER],
})
export class MdAutocompleteModule {}


export * from './autocomplete';
export * from './autocomplete-trigger';
