/*
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  AfterContentInit,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {MdInkBar} from '../ink-bar';
import {CanColor, mixinColor, ThemePalette, CanDisable, mixinDisabled} from '../../core/common-behaviors/index';
import {MdRipple} from '../../core/ripple/index';
import {ViewportRuler} from '../../core/overlay/index';
import {MD_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from '../../core/ripple/index'
import {takeUntil, auditTime, Directionality, Platform} from '@angular/cdk';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {of as observableOf} from 'rxjs/observable/of';
import {merge} from 'rxjs/observable/merge';
import {fromEvent} from 'rxjs/observable/fromEvent';

// Boilerplate for applying mixins to MdTabNav.
/* @docs-private */
export class MdTabNavBase {
  constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _MdTabNavMixinBase = mixinColor(MdTabNavBase, 'primary');

/*
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
@Component({
  moduleId: module.id,
  selector: '[md-tab-nav-bar], [mat-tab-nav-bar]',
  inputs: ['color'],
  templateUrl: 'tab-nav-bar.html',
  styleUrls: ['tab-nav-bar.css'],
  host: {'class': 'mat-tab-nav-bar'},
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdTabNav extends _MdTabNavMixinBase implements AfterContentInit, CanColor, OnDestroy {
  /* Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  _activeLinkChanged: boolean;
  _activeLinkElement: ElementRef;

  @ViewChild(MdInkBar) _inkBar: MdInkBar;

  /* Subscription for window.resize event **/
  private _resizeSubscription: Subscription;

  /* Background color of the tab nav. */
  @Input()
  get backgroundColor(): ThemePalette { return this._backgroundColor; }
  set backgroundColor(value: ThemePalette) {
    let nativeElement = this._elementRef.nativeElement;

    this._renderer.removeClass(nativeElement, `mat-background-${this.backgroundColor}`);

    if (value) {
      this._renderer.addClass(nativeElement, `mat-background-${value}`);
    }

    this._backgroundColor = value;
  }
  private _backgroundColor: ThemePalette;

  constructor(renderer: Renderer2,
              elementRef: ElementRef,
              @Optional() private _dir: Directionality,
              private _ngZone: NgZone,
              private _changeDetectorRef: ChangeDetectorRef) {
    super(renderer, elementRef);
  }

  /* Notifies the component that the active link has been changed. */
  updateActiveLink(element: ElementRef) {
    this._activeLinkChanged = this._activeLinkElement != element;
    this._activeLinkElement = element;

    if (this._activeLinkChanged) {
      this._changeDetectorRef.markForCheck();
    }
  }

  ngAfterContentInit(): void {
    this._resizeSubscription = this._ngZone.runOutsideAngular(() => {
      let dirChange = this._dir ? this._dir.change : observableOf(null);
      let resize = typeof window !== 'undefined' ?
          auditTime.call(fromEvent(window, 'resize'), 10) :
          observableOf(null);

      return takeUntil.call(merge(dirChange, resize), this._onDestroy)
          .subscribe(() => this._alignInkBar());
    });
  }

  /* Checks if the active link has been changed and, if so, will update the ink bar. */
  ngAfterContentChecked(): void {
    if (this._activeLinkChanged) {
      this._alignInkBar();
      this._activeLinkChanged = false;
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();

    if (this._resizeSubscription) {
      this._resizeSubscription.unsubscribe();
    }
  }

  /* Aligns the ink bar to the active link. */
  _alignInkBar(): void {
    if (this._activeLinkElement) {
      this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
    }
  }
}


// Boilerplate for applying mixins to MdTabLink.
export class MdTabLinkBase {}
export const _MdTabLinkMixinBase = mixinDisabled(MdTabLinkBase);

/*
 * Link inside of a `md-tab-nav-bar`.
 */
@Directive({
  selector: '[md-tab-link], [mat-tab-link], [mdTabLink], [matTabLink]',
  inputs: ['disabled'],
  host: {
    'class': 'mat-tab-link',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[class.mat-tab-disabled]': 'disabled'
  }
})
export class MdTabLink extends _MdTabLinkMixinBase implements OnDestroy, CanDisable {
  /* Whether the tab link is active or not. */
  private _isActive: boolean = false;

  /* Reference to the instance of the ripple for the tab link. */
  private _tabLinkRipple: MdRipple;

  /* Whether the link is active. */
  @Input()
  get active(): boolean { return this._isActive; }
  set active(value: boolean) {
    this._isActive = value;
    if (value) {
      this._mdTabNavBar.updateActiveLink(this._elementRef);
    }
  }

  /* @docs-private */
  @HostBinding('tabIndex')
  get tabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  constructor(private _mdTabNavBar: MdTabNav,
              private _elementRef: ElementRef,
              ngZone: NgZone,
              ruler: ViewportRuler,
              platform: Platform,
              @Optional() @Inject(MD_RIPPLE_GLOBAL_OPTIONS) globalOptions: RippleGlobalOptions) {
    super();

    // Manually create a ripple instance that uses the tab link element as trigger element.
    // Notice that the lifecycle hooks for the ripple config won't be called anymore.
    this._tabLinkRipple = new MdRipple(_elementRef, ngZone, ruler, platform, globalOptions);
  }

  ngOnDestroy() {
    // Manually call the ngOnDestroy lifecycle hook of the ripple instance because it won't be
    // called automatically since its instance is not created by Angular.
    this._tabLinkRipple.ngOnDestroy();
  }
}
