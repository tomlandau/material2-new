/**
 * ## `<md-progress-bar>` is a horizontal progress-bar for indicating progress and activity.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/progress-bar/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-progress-bar mode="indeterminate"></md-progress-bar>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'progress-bar-overview-example',
 *   templateUrl: 'progress-bar-overview-example.html',
 * })
 * export class ProgressBarOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * 
 * &nbsp;
 * ## Progress mode
 * The progress-bar supports four modes.
 * 
 * | Mode          | Description                                                                      |
 * |---------------|----------------------------------------------------------------------------------|
 * | determinate   | Standard progress bar, fills from 0% to 100%                                     |
 * | indeterminate | Indicates that something is happening without conveying a discrete progress      |
 * | buffer        | Dual-progress mode, typically showing both video download and playback progress  |
 * | query         | Dual-stage mode, typically showing sending a request and downloading a response  |
 * 
 * The default mode is "determinate". In this mode, the progress is set via the `value` property, 
 * which can be a whole number between 0 and 100.
 * 
 * In "buffer" mode, `value` determines the progress of the primary bar while the `bufferValue` is 
 * used to show the additional buffering progress.
 * 
 * In "query" mode, the progress-bar renders as an inverted "indeterminate" bar. Once the response 
 * progress is available, the `mode` should be changed to determinate to convey the progress.  
 * 
 * In both "indeterminate" and "query" modes, the `value` property is ignored.
 * 
 * 
 * &nbsp;
 * ## Theming
 * The color of a progress-bar can be changed by using the `color` property. By default, progress-bars
 * use the theme's primary color. This can be changed to `'accent'` or `'warn'`.  
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdProgressBar
 * * Selector: `md-progress-bar`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() color`             | Color of the progress bar.
 * | `@Input() value`             | Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow.
 * | `@Input() bufferValue`       | Buffer value of the progress bar. Defaults to zero.
 * | `@Input() mode`              | Mode of the progress bar. Input must be one of these values: determinate, indeterminate, buffer, query, defaults to 'determinate'. Mirrored to mode attribute.
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
import {CommonModule} from '@angular/common';
import {MdCommonModule} from '../core/common-behaviors/index';
import {MdProgressBar} from './progress-bar';


@NgModule({
  imports: [CommonModule, MdCommonModule],
  exports: [MdProgressBar, MdCommonModule],
  declarations: [MdProgressBar],
})
export class MdProgressBarModule {}


export * from './progress-bar';
