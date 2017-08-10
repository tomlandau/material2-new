/**
 * ## `<md-progress-spinner>` and `<md-spinner>` are a circular indicators of progress and activity.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/progress-spinner/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-spinner></md-spinner>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * `@Component({
 *   selector: 'progress-spinner-overview-example',
 *   templateUrl: 'progress-spinner-overview-example.html',
 * })
 * export class ProgressSpinnerOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Progress mode
 * The progress-spinner supports two modes, "determinate" and "indeterminate". 
 * The `<md-spinner>` component is an alias for `<md-progress-spinner mode="indeterminate">`.
 * 
 * | Mode          | Description                                                                      |
 * |---------------|----------------------------------------------------------------------------------|
 * | determinate   | Standard progress indicator, fills from 0% to 100%                               |
 * | indeterminate | Indicates that something is happening without conveying a discrete progress      |
 * 
 * 
 * The default mode is "determinate". In this mode, the progress is set via the `value` property, 
 * which can be a whole number between 0 and 100.
 * 
 * In "indeterminate" mode, the `value` property is ignored.
 * 
 * &nbsp; 
 * ## Theming
 * The color of a progress-spinner can be changed by using the `color` property. By default, 
 * progress-spinners use the theme's primary color. This can be changed to `'accent'` or `'warn'`.
 * 
 * &nbsp;
 * # Directives
 * ## MdProgressSpinner
 * * Selector: `md-progress-spinner`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() strokeWidth`       | Stroke width of the progress spinner. By default uses 10px as stroke width.
 * | `@Input() value`             | Value of the progress circle. It is bound to the host as the attribute aria-valuenow.
 * | `@Input() strokeWidth`       | Mode of the progress circle Input must be one of the values from ProgressMode, defaults to 'determinate'. mode is bound to the host as the attribute host.
 * 
 * &nbsp;
 * ## MdSpinner
 * This is a component definition to be used as a convenience reference to create an indeterminateinstance.
 * * Selector: `md-spinner`
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
import {MdCommonModule} from '../core/common-behaviors/index';
import {
  MdProgressSpinner,
  MdSpinner,
  MdProgressSpinnerCssMatStyler,
} from './progress-spinner';


@NgModule({
  imports: [MdCommonModule],
  exports: [
    MdProgressSpinner,
    MdSpinner,
    MdCommonModule,
    MdProgressSpinnerCssMatStyler
  ],
  declarations: [
    MdProgressSpinner,
    MdSpinner,
    MdProgressSpinnerCssMatStyler
  ],
})
class MdProgressSpinnerModule {}

export {MdProgressSpinnerModule};
export * from './progress-spinner';
