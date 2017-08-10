/*
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {TemplatePortal} from '@angular/cdk';
import {
  ViewContainerRef, Input, TemplateRef, ViewChild, OnInit, ContentChild,
  Component, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges,
} from '@angular/core';
import {CanDisable, mixinDisabled} from '../core/common-behaviors/disabled';
import {MdTabLabel} from './tab-label';
import {Subject} from 'rxjs/Subject';

// Boilerplate for applying mixins to MdTab.
/* @docs-private */
export class MdTabBase {}
export const _MdTabMixinBase = mixinDisabled(MdTabBase);

@Component({
  moduleId: module.id,
  selector: 'md-tab, mat-tab',
  templateUrl: 'tab.html',
  inputs: ['disabled'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdTab extends _MdTabMixinBase implements OnInit, CanDisable, OnChanges, OnDestroy {
  /* Content for the tab label given by <ng-template md-tab-label>. */
  @ContentChild(MdTabLabel) templateLabel: MdTabLabel;

  /* Template inside the MdTab view that contains an <ng-content>. */
  @ViewChild(TemplateRef) _content: TemplateRef<any>;

  /* The plain text label for the tab, used when there is no template label. */
  @Input('label') textLabel: string = '';

  /* The portal that will be the hosted content of the tab */
  private _contentPortal: TemplatePortal | null = null;
  get content(): TemplatePortal | null { return this._contentPortal; }

  /* Emits whenever the label changes. */
  _labelChange = new Subject<void>();

  /*
   * The relatively indexed position where 0 represents the center, negative is left, and positive
   * represents the right.
   */
  position: number | null = null;

  /*
   * The initial relatively index origin of the tab if it was created and selected after there
   * was already a selected tab. Provides context of what position the tab should originate from.
   */
  origin: number | null = null;

  constructor(private _viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('textLabel')) {
      this._labelChange.next();
    }
  }

  ngOnDestroy() {
    this._labelChange.complete();
  }

  ngOnInit() {
    this._contentPortal = new TemplatePortal(this._content, this._viewContainerRef);
  }
}
