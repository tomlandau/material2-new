/*
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Input, AfterViewInit, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';


/*
 * Directive to automatically resize a textarea to fit its content.
 */
@Directive({
  selector: 'textarea[md-autosize], textarea[mdTextareaAutosize],' +
            'textarea[mat-autosize], textarea[matTextareaAutosize]',
  exportAs: 'mdTextareaAutosize',
  host: {
    '(input)': 'resizeToFitContent()',
    // Textarea elements that have the directive applied should have a single row by default.
    // Browsers normally show two rows by default and therefore this limits the minRows binding.
    'rows': '1',
  },
})
export class MdTextareaAutosize implements AfterViewInit {
  /* Keep track of the previous textarea value to avoid resizing when the value hasn't changed. */
  private _previousValue: string;

  private _minRows: number;
  private _maxRows: number;

  @Input('mdAutosizeMinRows')
  get minRows() { return this._minRows; }

  set minRows(value: number) {
    this._minRows = value;
    this._setMinHeight();
  }

  @Input('mdAutosizeMaxRows')
  get maxRows() { return this._maxRows; }
  set maxRows(value: number) {
    this._maxRows = value;
    this._setMaxHeight();
  }

  @Input('matAutosizeMaxRows')
  get _matAutosizeMinRows() { return this.minRows; }
  set _matAutosizeMinRows(v) { this.minRows = v; }

  @Input('matAutosizeMaxRows')
  get _matAutosizeMaxRows() { return this.maxRows; }
  set _matAutosizeMaxRows(v) { this.maxRows = v; }

  /* Cached height of a textarea with a single row. */
  private _cachedLineHeight: number;

  constructor(private _elementRef: ElementRef, @Optional() @Self() formControl: NgControl) {
    if (formControl && formControl.valueChanges) {
      formControl.valueChanges.subscribe(() => this.resizeToFitContent());
    }
  }

  /* Sets the minimum height of the textarea as determined by minRows. */
  _setMinHeight(): void {
    const minHeight = this.minRows && this._cachedLineHeight ?
        `${this.minRows * this._cachedLineHeight}px` : null;

    if (minHeight)  {
      this._setTextareaStyle('minHeight', minHeight);
    }
  }

  /* Sets the maximum height of the textarea as determined by maxRows. */
  _setMaxHeight(): void {
    const maxHeight = this.maxRows && this._cachedLineHeight ?
        `${this.maxRows * this._cachedLineHeight}px` : null;

    if (maxHeight) {
      this._setTextareaStyle('maxHeight', maxHeight);
    }
  }

  ngAfterViewInit() {
    this._cacheTextareaLineHeight();
    this.resizeToFitContent();
  }

  /* Sets a style property on the textarea element. */
  private _setTextareaStyle(property: string, value: string): void {
    const textarea = this._elementRef.nativeElement as HTMLTextAreaElement;
    textarea.style[property] = value;
  }

  /*
   * Cache the height of a single-row textarea.
   *
   * We need to know how large a single "row" of a textarea is in order to apply minRows and
   * maxRows. For the initial version, we will assume that the height of a single line in the
   * textarea does not ever change.
   */
  private _cacheTextareaLineHeight(): void {
    let textarea = this._elementRef.nativeElement as HTMLTextAreaElement;

    // Use a clone element because we have to override some styles.
    let textareaClone = textarea.cloneNode(false) as HTMLTextAreaElement;
    textareaClone.rows = 1;

    // Use `position: absolute` so that this doesn't cause a browser layout and use
    // `visibility: hidden` so that nothing is rendered. Clear any other styles that
    // would affect the height.
    textareaClone.style.position = 'absolute';
    textareaClone.style.visibility = 'hidden';
    textareaClone.style.border = 'none';
    textareaClone.style.padding = '0';
    textareaClone.style.height = '';
    textareaClone.style.minHeight = '';
    textareaClone.style.maxHeight = '';

    textarea.parentNode!.appendChild(textareaClone);
    this._cachedLineHeight = textareaClone.clientHeight;
    textarea.parentNode!.removeChild(textareaClone);

    // Min and max heights have to be re-calculated if the cached line height changes
    this._setMinHeight();
    this._setMaxHeight();
  }

  /* Resize the textarea to fit its content. */
  resizeToFitContent() {
    const textarea = this._elementRef.nativeElement as HTMLTextAreaElement;
    if (textarea.value === this._previousValue) {
      return;
    }

    // Reset the textarea height to auto in order to shrink back to its default size.
    // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
    textarea.style.height = 'auto';
    textarea.style.overflow = 'hidden';

    // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.overflow = '';

    this._previousValue = textarea.value;
  }
}
