/*
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ComponentRef,
  ViewChild,
  NgZone,
  OnDestroy,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';
import {
  BasePortalHost,
  ComponentPortal,
  PortalHostDirective,
  first
} from '@angular/cdk';
import {MdSnackBarConfig} from './snack-bar-config';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';



export type SnackBarState = 'initial' | 'visible' | 'complete' | 'void';

// TODO(jelbourn): we can't use constants from animation.ts here because you can't use
// a text interpolation in anything that is analyzed statically with ngc (for AoT compile).
export const SHOW_ANIMATION = '225ms cubic-bezier(0.4,0.0,1,1)';
export const HIDE_ANIMATION = '195ms cubic-bezier(0.0,0.0,0.2,1)';

/*
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'snack-bar-container',
  templateUrl: 'snack-bar-container.html',
  styleUrls: ['snack-bar-container.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'alert',
    '[@state]': 'animationState',
    '(@state.done)': 'onAnimationEnd($event)'
  },
  animations: [
    trigger('state', [
      state('void', style({transform: 'translateY(100%)'})),
      state('initial', style({transform: 'translateY(100%)'})),
      state('visible', style({transform: 'translateY(0%)'})),
      state('complete', style({transform: 'translateY(100%)'})),
      transition('visible => complete', animate(HIDE_ANIMATION)),
      transition('initial => visible, void => visible', animate(SHOW_ANIMATION)),
    ])
  ],
})
export class MdSnackBarContainer extends BasePortalHost implements OnDestroy {
  /* The portal host inside of this container into which the snack bar content will be loaded. */
  @ViewChild(PortalHostDirective) _portalHost: PortalHostDirective;

  /* Subject for notifying that the snack bar has exited from view. */
  private onExit: Subject<any> = new Subject();

  /* Subject for notifying that the snack bar has finished entering the view. */
  private onEnter: Subject<any> = new Subject();

  /* The state of the snack bar animations. */
  animationState: SnackBarState = 'initial';

  /* The snack bar configuration. */
  snackBarConfig: MdSnackBarConfig;

  constructor(
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    private _elementRef: ElementRef) {
    super();
  }

  /* Attach a component portal as content to this snack bar container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalHost.hasAttached()) {
      throw Error('Attempting to attach snack bar content after content is already attached');
    }

    if (this.snackBarConfig.extraClasses) {
      // Not the most efficient way of adding classes, but the renderer doesn't allow us
      // to pass in an array or a space-separated list.
      for (let cssClass of this.snackBarConfig.extraClasses) {
        this._renderer.addClass(this._elementRef.nativeElement, cssClass);
      }
    }

    return this._portalHost.attachComponentPortal(portal);
  }

  /* Attach a template portal as content to this snack bar container. */
  attachTemplatePortal(): Map<string, any> {
    throw Error('Not yet implemented');
  }

  /* Handle end of animations, updating the state of the snackbar. */
  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void' || event.toState === 'complete') {
      this._completeExit();
    }

    if (event.toState === 'visible') {
      // Note: we shouldn't use `this` inside the zone callback,
      // because it can cause a memory leak.
      const onEnter = this.onEnter;

      this._ngZone.run(() => {
        onEnter.next();
        onEnter.complete();
      });
    }
  }

  /* Begin animation of snack bar entrance into view. */
  enter(): void {
    this.animationState = 'visible';
  }

  /* Returns an observable resolving when the enter animation completes.  */
  _onEnter(): Observable<void> {
    this.animationState = 'visible';
    return this.onEnter.asObservable();
  }

  /* Begin animation of the snack bar exiting from view. */
  exit(): Observable<void> {
    this.animationState = 'complete';
    return this._onExit();
  }

  /* Returns an observable that completes after the closing animation is done. */
  _onExit(): Observable<void> {
    return this.onExit.asObservable();
  }

  /*
   * Makes sure the exit callbacks have been invoked when the element is destroyed.
   */
  ngOnDestroy() {
    this._completeExit();
  }

  /*
   * Waits for the zone to settle before removing the element. Helps prevent
   * errors where we end up removing an element which is in the middle of an animation.
   */
  private _completeExit() {
    // Note: we shouldn't use `this` inside the zone callback,
    // because it can cause a memory leak.
    const onExit = this.onExit;

    first.call(this._ngZone.onMicrotaskEmpty).subscribe(() => {
      onExit.next();
      onExit.complete();
    });
  }
}
