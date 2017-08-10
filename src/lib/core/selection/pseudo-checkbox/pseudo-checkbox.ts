/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ViewEncapsulation,
  Input,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
} from '@angular/core';
import {CanColor, mixinColor} from '../../common-behaviors/index';

export type MdPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';


// Boilerplate for applying mixins to MdChip.
/** @docs-private */
export class MdPseudoCheckboxBase {
  constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _MdPseudoCheckboxBase = mixinColor(MdPseudoCheckboxBase, 'accent');


/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
  styleUrls: ['pseudo-checkbox.css'],
  inputs: ['color'],
  template: '',
  host: {
    'class': 'mat-pseudo-checkbox',
    '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
    '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
    '[class.mat-pseudo-checkbox-disabled]': 'disabled',
  },
})
export class MdPseudoCheckbox extends _MdPseudoCheckboxBase implements CanColor {
  /** Display state of the checkbox. */
  @Input() state: MdPseudoCheckboxState = 'unchecked';

  /** Whether the checkbox is disabled. */
  @Input() disabled: boolean = false;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    super(renderer, elementRef);
  }
}
