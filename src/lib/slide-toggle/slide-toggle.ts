/*
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  applyCssTransform,
  FocusOrigin,
  FocusOriginMonitor,
} from '../core/style/index';
import {HammerInput} from '../core/gestures/index';
import {
  MdRipple,
  RippleRef
} from '../core/ripple/index';
import {
  Platform,
  coerceBooleanProperty
} from '@angular/cdk'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CanDisableRipple, mixinDisableRipple, CanColor, mixinColor, mixinDisabled, CanDisable} from '../core/common-behaviors/index';

// Increasing integer for generating unique ids for slide-toggle components.
let nextUniqueId = 0;

export const MD_SLIDE_TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdSlideToggle),
  multi: true
};

/* Change event object emitted by a MdSlideToggle. */
export class MdSlideToggleChange {
  source: MdSlideToggle;
  checked: boolean;
}

// Boilerplate for applying mixins to MdSlideToggle.
/* @docs-private */
export class MdSlideToggleBase {
  constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _MdSlideToggleMixinBase =
  mixinColor(mixinDisableRipple(mixinDisabled(MdSlideToggleBase)), 'accent');

/* Represents a slidable "switch" toggle that can be moved between on and off. */
@Component({
  moduleId: module.id,
  selector: 'md-slide-toggle, mat-slide-toggle',
  host: {
    'class': 'mat-slide-toggle',
    '[id]': 'id',
    '[class.mat-checked]': 'checked',
    '[class.mat-disabled]': 'disabled',
    '[class.mat-slide-toggle-label-before]': 'labelPosition == "before"',
  },
  templateUrl: 'slide-toggle.html',
  styleUrls: ['slide-toggle.css'],
  providers: [MD_SLIDE_TOGGLE_VALUE_ACCESSOR],
  inputs: ['disabled', 'disableRipple', 'color'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdSlideToggle extends _MdSlideToggleMixinBase implements OnDestroy, AfterContentInit,
    ControlValueAccessor, CanDisable, CanColor, CanDisableRipple {

  private onChange = (_: any) => {};
  private onTouched = () => {};

  private _uniqueId: string = `md-slide-toggle-${++nextUniqueId}`;
  private _checked: boolean = false;
  private _slideRenderer: SlideToggleRenderer;
  private _required: boolean = false;

  /* Reference to the focus state ripple. */
  private _focusRipple: RippleRef | null;

  /* Name value will be applied to the input element if present */
  @Input() name: string | null = null;

  /* A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
  @Input() id: string = this._uniqueId;

  /* Used to specify the tabIndex value for the underlying input element. */
  @Input() tabIndex: number = 0;

  /* Whether the label should appear after or before the slide-toggle. Defaults to 'after' */
  @Input() labelPosition: 'before' | 'after' = 'after';

  /* Used to set the aria-label attribute on the underlying input element. */
  @Input('aria-label') ariaLabel: string | null = null;

  /* Used to set the aria-labelledby attribute on the underlying input element. */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /* Whether the slide-toggle is required. */
  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  /* An event will be dispatched each time the slide-toggle changes its value. */
  @Output() change: EventEmitter<MdSlideToggleChange> = new EventEmitter<MdSlideToggleChange>();

  /* Returns the unique id for the visual hidden input. */
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  /* Reference to the underlying input element. */
  @ViewChild('input') _inputElement: ElementRef;

  /* Reference to the ripple directive on the thumb container. */
  @ViewChild(MdRipple) _ripple: MdRipple;

  constructor(elementRef: ElementRef,
              renderer: Renderer2,
              private _platform: Platform,
              private _focusOriginMonitor: FocusOriginMonitor,
              private _changeDetectorRef: ChangeDetectorRef) {
    super(renderer, elementRef);
  }

  ngAfterContentInit() {
    this._slideRenderer = new SlideToggleRenderer(this._elementRef, this._platform);

    this._focusOriginMonitor
      .monitor(this._inputElement.nativeElement, this._renderer, false)
      .subscribe(focusOrigin => this._onInputFocusChange(focusOrigin));
  }

  ngOnDestroy() {
    this._focusOriginMonitor.stopMonitoring(this._inputElement.nativeElement);
  }

  /*
   * The onChangeEvent method will be also called on click.
   * This is because everything for the slide-toggle is wrapped inside of a label,
   * which triggers a onChange event on click.
   */
  _onChangeEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the component's `change` output.
    event.stopPropagation();

    // Once a drag is currently in progress, we do not want to toggle the slide-toggle on a click.
    if (!this.disabled && !this._slideRenderer.dragging) {
      this.toggle();

      // Emit our custom change event if the native input emitted one.
      // It is important to only emit it, if the native input triggered one, because
      // we don't want to trigger a change event, when the `checked` variable changes for example.
      this._emitChangeEvent();
    }
  }

  _onInputClick(event: Event) {
    this.onTouched();

    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `slide-toggle` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  /* Implemented as part of ControlValueAccessor. */
  writeValue(value: any): void {
    this.checked = value;
  }

  /* Implemented as part of ControlValueAccessor. */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /* Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /* Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

  /* Focuses the slide-toggle. */
  focus() {
    this._focusOriginMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
  }

  /* Whether the slide-toggle is checked. */
  @Input()
  get checked() { return !!this._checked; }
  set checked(value) {
    if (this.checked !== !!value) {
      this._checked = value;
      this.onChange(this._checked);
    }
  }

  /* Toggles the checked state of the slide-toggle. */
  toggle() {
    this.checked = !this.checked;
  }

  /* Function is called whenever the focus changes for the input element. */
  private _onInputFocusChange(focusOrigin: FocusOrigin) {
    if (!this._focusRipple && focusOrigin === 'keyboard') {
      // For keyboard focus show a persistent ripple as focus indicator.
      this._focusRipple = this._ripple.launch(0, 0, {persistent: true, centered: true});
    } else if (!focusOrigin) {
      this.onTouched();

      // Fade out and clear the focus ripple if one is currently present.
      if (this._focusRipple) {
        this._focusRipple.fadeOut();
        this._focusRipple = null;
      }
    }
  }

  /* Emits the change event to the `change` output EventEmitter */
  private _emitChangeEvent() {
    let event = new MdSlideToggleChange();
    event.source = this;
    event.checked = this.checked;
    this.change.emit(event);
  }


  _onDragStart() {
    if (!this.disabled) {
      this._slideRenderer.startThumbDrag(this.checked);
    }
  }

  _onDrag(event: HammerInput) {
    if (this._slideRenderer.dragging) {
      this._slideRenderer.updateThumbPosition(event.deltaX);
    }
  }

  _onDragEnd() {
    if (this._slideRenderer.dragging) {
      let _previousChecked = this.checked;
      this.checked = this._slideRenderer.dragPercentage > 50;

      if (_previousChecked !== this.checked) {
        this._emitChangeEvent();
      }

      // The drag should be stopped outside of the current event handler, because otherwise the
      // click event will be fired before and will revert the drag change.
      setTimeout(() => this._slideRenderer.stopThumbDrag());
    }
  }

}

/*
 * Renderer for the Slide Toggle component, which separates DOM modification in its own class
 */
class SlideToggleRenderer {

  /* Reference to the thumb HTMLElement. */
  private _thumbEl: HTMLElement;

  /* Reference to the thumb bar HTMLElement. */
  private _thumbBarEl: HTMLElement;

  /* Width of the thumb bar of the slide-toggle. */
  private _thumbBarWidth: number;

  /* Previous checked state before drag started. */
  private _previousChecked: boolean;

  /* Percentage of the thumb while dragging. Percentage as fraction of 100. */
  dragPercentage: number;

  /* Whether the thumb is currently being dragged. */
  dragging: boolean = false;

  constructor(private _elementRef: ElementRef, platform: Platform) {
    // We only need to interact with these elements when we're on the browser, so only grab
    // the reference in that case.
    if (platform.isBrowser) {
      this._thumbEl = _elementRef.nativeElement.querySelector('.mat-slide-toggle-thumb-container');
      this._thumbBarEl = _elementRef.nativeElement.querySelector('.mat-slide-toggle-bar');
    }
  }

  /* Initializes the drag of the slide-toggle. */
  startThumbDrag(checked: boolean) {
    if (this.dragging) { return; }

    this._thumbBarWidth = this._thumbBarEl.clientWidth - this._thumbEl.clientWidth;
    this._thumbEl.classList.add('mat-dragging');

    this._previousChecked = checked;
    this.dragging = true;
  }

  /* Resets the current drag and returns the new checked value. */
  stopThumbDrag(): boolean {
    if (!this.dragging) { return false; }

    this.dragging = false;
    this._thumbEl.classList.remove('mat-dragging');

    // Reset the transform because the component will take care of the thumb position after drag.
    applyCssTransform(this._thumbEl, '');

    return this.dragPercentage > 50;
  }

  /* Updates the thumb containers position from the specified distance. */
  updateThumbPosition(distance: number) {
    this.dragPercentage = this._getDragPercentage(distance);
    // Calculate the moved distance based on the thumb bar width.
    let dragX = (this.dragPercentage / 100) * this._thumbBarWidth;
    applyCssTransform(this._thumbEl, `translate3d(${dragX}px, 0, 0)`);
  }

  /* Retrieves the percentage of thumb from the moved distance. Percentage as fraction of 100. */
  private _getDragPercentage(distance: number) {
    let percentage = (distance / this._thumbBarWidth) * 100;

    // When the toggle was initially checked, then we have to start the drag at the end.
    if (this._previousChecked) {
      percentage += 100;
    }

    return Math.max(0, Math.min(percentage, 100));
  }

}
