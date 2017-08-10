/**
 * ## `<md-chip-list>` displays a list of values as individual, keyboard accessible, chips.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/chips/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-chip-list>
 *   <md-chip>One fish</md-chip>
 *   <md-chip>Two fish</md-chip>
 *   <md-chip color="primary" selected="true">Primary fish</md-chip>
 *   <md-chip color="accent" selected="true">Accent fish</md-chip>
 * </md-chip-list>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'chips-overview-example',
 *   templateUrl: 'chips-overview-example.html',
 * })
 * export class ChipsOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * 
 * _Note: chips are still early in their development and more features are being actively worked on._
 * 
 * ```html
 * <md-chip-list>
 *   <md-chip>Papadum</md-chip>
 *   <md-chip>Naan</md-chip>
 *   <md-chip>Dal</md-chip>
 * </md-chip-list>
 * ```
 * 
 * &nbsp;
 * ## Unstyled chips
 * By default, `<md-chip>` has Material Design styles applied. For a chip with no styles applied,
 * use `<md-basic-chip>`. You can then customize the chip appearance by adding your own CSS.
 * 
 * _Hint: `<md-basic-chip>` receives the `mat-basic-chip` CSS class in addition to the `mat-chip` class._
 * 
 * &nbsp;
 * ## Selection
 * Chips can be selected via the `selected` property. Selection can be disabled by setting
 * `selectable` to `false` on the `<md-chip-list>`.
 * 
 * Selection emits the `(select)` output while deselecting emits the `(deselect)` output. Both outputs
 * receive a ChipEvent object with a structure of `{ chip: alteredChip }`.
 * 
 * &nbsp;
 * ## Disabled chips
 * Individual chips may be disabled by applying the `disabled` attribute to the chip. When disabled,
 * chips are neither selectable nor focusable. Currently, disabled chips receive no special styling.
 * 
 * &nbsp;
 * ## Keyboard interaction
 * Users can move through the chips using the arrow keys and select/deselect them with the space. Chips
 * also gain focus when clicked, ensuring keyboard navigation starts at the appropriate chip.
 * 
 * &nbsp;
 * ## Theming
 * The selected color of an `<md-chip>` can be changed by using the `color` property. By default, chips
 * use a neutral background color based on the current theme (light or dark). This can be changed to 
 * `'primary'`, `'accent'`, or `'warn'`.
 * 
 *
 * &nbsp;
 * # Directives
 * ## MdChipList
 * A material design chips component (named ChipList for it's similarity to the List component).
 * 
 * Example:
 * ```ts
 * <md-chip-list>
 *   <md-chip>Chip 1<md-chip>
 *   <md-chip>Chip 2<md-chip>
 * </md-chip-list>
 * ```
 * 
 * * Selector: `md-chip-list`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `chips`                      | The chip components contained within this chip list.
 * | `@Input() selectable`        | Whether or not this chip is selectable. When a chip is not selectable, it's selected state is always ignored.
 * 
 * Methods
 * * `focus`: Programmatically focus the chip list. This in turn focuses the first non-disabled chip in this chip list.
 * 
 * 
 * &nbsp;
 * ## MdChip
 * Material design styled Chip component. Used inside the MdChipList component.
 * * Selector: `md-basic-chip [md-basic-chip] md-chip [md-chip]`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() selected`          | Whether the chip is selected.
 * | `onFocus`                    | Emitted when the chip is focused.
 * | `@Output() select`           | Emitted when the chip is selected.
 * | `@Output() deselect`         | Emitted when the chip is deselected.
 * | `@Output() destroy`          | Emitted when the chip is destroyed.
 * 
 * Methods
 * * `toggleSelected`: Toggles the current selected state of this chip.
 *    * Returns
 *       * `boolean` - Whether the chip is selected.
 * * `focus`: Allows for programmatic focusing of the chip.
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
import {MdChipList} from './chip-list';
import {MdBasicChip, MdChip, MdChipRemove} from './chip';
import {MdChipInput} from './chip-input';

export * from './chip-list';
export * from './chip';
export * from './chip-input';

@NgModule({
  imports: [],
  exports: [MdChipList, MdChip, MdChipInput, MdChipRemove, MdChipRemove, MdBasicChip],
  declarations: [MdChipList, MdChip, MdChipInput, MdChipRemove,  MdChipRemove, MdBasicChip]
})
export class MdChipsModule {}
