/**
 * ## The Angular Material tooltip provides a text label that is displayed when the user hovers over or longpresses an element.
 * 
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/tooltip/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <span mdTooltip="Tooltip!">I have a tooltip</span>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'tooltip-overview-example',
 *   templateUrl: 'tooltip-overview-example.html',
 * })
 * export class TooltipOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Positioning
 * 
 * The tooltip will be displayed below the element but this can be configured using the `mdTooltipPosition`
 * input.
 * The tooltip can be displayed above, below, left, or right of the element. By default the position
 * will be below. If the tooltip should switch left/right positions in an RTL layout direction, then
 * the positions `before` and `after` should be used instead of `left` and `right`, respectively.
 * 
 * | Position  | Description                                                                           |
 * |-----------|---------------------------------------------------------------------------------------|
 * | `above`   | Always display above the element                                                      |
 * | `below `  | Always display beneath the element                                                    |
 * | `left`    | Always display to the left of the element                                             |
 * | `right`   | Always display to the right of the element                                            |
 * | `before`  | Display to the left in left-to-right layout and to the right in right-to-left layout  |
 * | `after`   | Display to the right in left-to-right layout and to the right in right-to-left layout |
 * 
 * 
 * &nbsp;
 * ## Showing and hiding
 * 
 * The tooltip is immediately shown when the user's mouse hovers over the element and immediately
 * hides when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through
 * the inputs `mdTooltipShowDelay` and `mdTooltipHideDelay`.
 * 
 * On mobile, the tooltip is displayed when the user longpresses the element and hides after a
 * delay of 1500ms. The longpress behavior requires HammerJS to be loaded on the page.
 * 
 * The tooltip can also be shown and hidden through the `show` and `hide` directive methods,
 * which both accept a number in milliseconds to delay before applying the display change.
 * 
 * To turn off the tooltip and prevent it from showing to the user, use the `mdTooltipDisabled` input flag.
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdTooltip
 * Directive that attaches a material design tooltip to the host element. Animates the showing and hiding of a tooltip provided position (defaults to below the element).
 *
 * [https://material.google.com/components/tooltips.html](https://material.google.com/components/tooltips.html)
 * 
 * * Selector: `[md-tooltip] [mdTooltip]`
 * * Exported as: `mdTooltip`
 * 
 * Properties
 * | Name                                       | Description             |
 * |------------------------------------------- | ------------------------|
 * | `@Input('mdTooltipPosition') position`     | Allows the user to define the position of the tooltip relative to the parent element
 * | `@Input('mdTooltipDisabled') disabled`     | Disables the display of the tooltip.
 * | `@Input('mdTooltipShowDelay') showDelay`   | The default delay in ms before showing the tooltip after show is called
 * | `@Input('mdTooltipHideDelay') hideDelay`   | The default delay in ms before hiding the tooltip after hide is called
 * | `@Input('mdTooltip') message`              | The message to be displayed in the tooltip
 * | `@Input('mdTooltipClass') tooltipClass`    | Classes to be passed to the tooltip. Supports the same syntax as ngClass.
 * 
 * Methods
 * * `show`: Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
 *    * Parameters
 *       * `delay?` - number
 * * `hide`: Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
 *    * Parameter
 *       * `delay?` - number
 * * `toggle`: Shows/hides the tooltip
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
import {OverlayModule} from '../core/overlay/index';
import {PlatformModule} from '@angular/cdk';
import {MdTooltip, TooltipComponent, MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER} from './tooltip';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MdCommonModule,
    PlatformModule
  ],
  exports: [MdTooltip, TooltipComponent, MdCommonModule],
  declarations: [MdTooltip, TooltipComponent],
  entryComponents: [TooltipComponent],
  providers: [MD_TOOLTIP_SCROLL_STRATEGY_PROVIDER],
})
export class MdTooltipModule {}


export * from './tooltip';
