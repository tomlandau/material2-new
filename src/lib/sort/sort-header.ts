/*
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input,
  Optional, ViewEncapsulation
} from '@angular/core';
import {MdSort, MdSortable} from './sort';
import {MdSortHeaderIntl} from './sort-header-intl';
import {CdkColumnDef, coerceBooleanProperty} from '@angular/cdk';
import {getMdSortHeaderNotContainedWithinMdSortError} from './sort-errors';
import {Subscription} from 'rxjs/Subscription';

/*
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent MdSort directive.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
@Component({
  moduleId: module.id,
  selector: '[md-sort-header], [mat-sort-header]',
  templateUrl: 'sort-header.html',
  styleUrls: ['sort-header.css'],
  host: {
    '(click)': '_sort.sort(this)',
    '[class.mat-sort-header-sorted]': '_isSorted()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdSortHeader implements MdSortable {
  /* @docs-private  */
  sortSubscription: Subscription;

  /*
   * ID of this sort header. If used within the context of a CdkColumnDef, this will default to
   * the column's name.
   */
  @Input('md-sort-header') id: string;

  /* Sets the position of the arrow that displays when sorted. */
  @Input() arrowPosition: 'before' | 'after' = 'after';

  /* Overrides the sort start value of the containing MdSort for this MdSortable. */
  @Input('start') start: 'asc' | 'desc';

  /* Overrides the disable clear value of the containing MdSort for this MdSortable. */
  @Input()
  get disableClear() { return this._disableClear; }
  set disableClear(v) { this._disableClear = coerceBooleanProperty(v); }
  private _disableClear: boolean;

  @Input('mat-sort-header')
  get _id() { return this.id; }
  set _id(v: string) { this.id = v; }

  constructor(public _intl: MdSortHeaderIntl,
              private _changeDetectorRef: ChangeDetectorRef,
              @Optional() public _sort: MdSort,
              @Optional() public _cdkColumnDef: CdkColumnDef) {
    if (!_sort) {
      throw getMdSortHeaderNotContainedWithinMdSortError();
    }

    this.sortSubscription = _sort.mdSortChange.subscribe(() => _changeDetectorRef.markForCheck());
  }

  ngOnInit() {
    if (!this.id && this._cdkColumnDef) {
      this.id = this._cdkColumnDef.name;
    }

    this._sort.register(this);
  }

  ngOnDestroy() {
    this._sort.deregister(this);
    this.sortSubscription.unsubscribe();
  }

  /* Whether this MdSortHeader is currently sorted in either ascending or descending order. */
  _isSorted() {
    return this._sort.active == this.id && this._sort.direction;
  }
}
