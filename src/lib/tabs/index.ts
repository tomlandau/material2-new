/**
 * ## Angular Material tabs organize content into separate views where only one view can be  visible at a time. Each tab's label is shown in the tab header and the active tab's label is designated with the animated ink bar. When the list of tab labels exceeds the width of the header, pagination controls appear to let the user scroll left and right across the labels.
 * 
 * The active tab may be set using the `selectedIndex` input or when the user selects one of the
 * tab labels in the header.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/tabs/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-tab-group>
 *   <md-tab label="Tab 1">Content 1</md-tab>
 *   <md-tab label="Tab 2">Content 2</md-tab>
 * </md-tab-group>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 *
 * \@Component({
 *   selector: 'tabs-overview-example',
 *   templateUrl: 'tabs-overview-example.html',
 * })
 * export class TabsOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Events
 * 
 * The `selectChange` output event is emitted when the active tab changes.
 * 
 * The `focusChange` output event is emitted when the user puts focus on any of the tab labels in
 * the header, usually through keyboard navigation.
 * 
 * ## Labels
 * 
 * If a tab's label is only text then the simple tab-group API can be used.
 * 
 * ```html
 * <md-tab-group>
 *   <md-tab label="One">
 *     <h1>Some tab content</h1>
 *     <p>...</p>
 *   </md-tab>
 *   <md-tab label="Two">
 *     <h1>Some more tab content</h1>
 *     <p>...</p>
 *   </md-tab>
 * </md-tab-group>
 * ```
 * 
 * For more complex labels, add a template with the `md-tab-label` directive inside the `md-tab`.
 * 
 * ```html
 * <md-tab-group>
 *   <md-tab>
 *     <ng-template md-tab-label>
 *       The <em>best</em> pasta
 *     </ng-template>
 *     <h1>Best pasta restaurants</h1>
 *     <p>...</p>
 *   </md-tab>
 *   <md-tab>
 *     <ng-template md-tab-label>
 *       <md-icon>thumb_down</md-icon> The worst sushi
 *     </ng-template>
 *     <h1>Terrible sushi restaurants</h1>
 *     <p>...</p>
 *   </md-tab>
 * </md-tab-group>
 * ```
 * 
 * ## Dynamic Height
 * 
 * By default, the tab group will not change its height to the height of the currently active tab. To
 * change this, set the `dynamicHeight` input to true. The tab body will animate its height according
 *  to the height of the active tab.
 * 
 * ## Tabs and navigation
 * While `<md-tab-group>` is used to switch between views within a single route, `<nav md-tab-nav-bar>`
 * provides a tab-like UI for navigating between routes.
 * ```html
 * <nav md-tab-nav-bar>
 *   <a md-tab-link
 *      *ngFor="let link of navLinks"
 *      [routerLink]="link"
 *      routerLinkActive #rla="routerLinkActive"
 *      [active]="rla.isActive">
 *     {{tabLink.label}}
 *   </a>
 * </nav>
 * 
 * <router-outlet></router-outlet>
 * ```
 * 
 * The tab-nav-bar is not tied to any particular router; it works with normal `<a>` elements and uses
 * the `active` property to determine which tab is currently active. The corresponding
 * `<router-outlet>` can be placed anywhere in the view.
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdTab
 * * Selector: `md-tab`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `templateLabel`              | Content for the tab label given by.
 * | `@Input('label') textLabel`  | The plain text label for the tab, used when there is no template label.
 * | `content`                    | 
 * | `position`                   | The relatively indexed position where 0 represents the center, negative is left, and positive represents the right.
 * | `origin`                     | The initial relatively index origin of the tab if it was created and selected after there was already a selected tab. Provides context of what position the tab should originate from.
 * 
 * 
 * &nbsp;
 * ## MdTabLabel
 * Used to flag tab labels for use with the portal directive
 * * Selector: `[md-tab-label] [mdTabLabel]`
 * 
 * &nbsp;
 * ## MdTabNav
 * Navigation component matching the styles of the tab group header. Provides anchored navigation with animated ink bar.
 * * Selector: `[md-tab-nav-bar]`
 * 
 * Methods
 * * `updateActiveLink`: Notifies the component that the active link has been changed.
 *    * Parameters
 *       * element - `ElementRef`
 * 
 * &nbsp;
 * ## MdTabLink
 * Link inside of a md-tab-nav-bar.
 * * Selector: `[md-tab-link] [mdTabLink]`
 * 
 * Properties
 * | Name                   | Description             |
 * |----------------------- | ------------------------|
 * | `@Input() active`      | Whether the link is active.
 * 
 * 
 * &nbsp;
 * ## MdTabGroup
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes animated ink-bar, keyboard navigation, and screen reader. See: [https://www.google.com/design/spec/components/tabs.html](https://www.google.com/design/spec/components/tabs.html)
 * * Selector: `md-tab-group`
 * 
 * Properties
 * | Name                            | Description             |
 * |-------------------------------- | ------------------------|
 * | `@Input() dynamicHeight`        | Whether the tab group should grow to the size of the active tab.
 * | `@Input() disableRipple`        | Whether ripples for the tab-group should be disabled or not.
 * | `@Input() selectedIndex`        | The index of the active tab.
 * | `@Input() headerPosition`       | Position of the tab header.
 * | `@Output() selectedIndexChange` | Output to enable support for two-way binding on [(selectedIndex)]
 * | `@Output() focusChange`         | Event emitted when focus has changed within a tab group.
 * | `@Output() selectChange`        | Event emitted when the tab selection has changed.
 * 
 * &nbsp
 * # Additional classes
 * ## MdTabChangeEvent
 * A simple change event emitted on focus or selection changes.
 * 
 * Properties
 * | Name             | Description             |
 * |----------------- | ------------------------|
 * | `index`          | 
 * | `tab`            |
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
import {ObserveContentModule, PortalModule} from '@angular/cdk';
import {MdRippleModule} from '../core/ripple/index';
import {MdTab} from './tab';
import {MdTabGroup} from './tab-group';
import {MdTabLabel} from './tab-label';
import {MdTabLabelWrapper} from './tab-label-wrapper';
import {MdTabNav, MdTabLink} from './tab-nav-bar/tab-nav-bar';
import {MdInkBar} from './ink-bar';
import {MdTabBody} from './tab-body';
import {ScrollDispatchModule, VIEWPORT_RULER_PROVIDER} from '../core/overlay/index';
import {MdTabHeader} from './tab-header';


@NgModule({
  imports: [
    CommonModule,
    MdCommonModule,
    PortalModule,
    MdRippleModule,
    ObserveContentModule,
    ScrollDispatchModule,
  ],
  // Don't export all components because some are only to be used internally.
  exports: [
    MdCommonModule,
    MdTabGroup,
    MdTabLabel,
    MdTab,
    MdTabNav,
    MdTabLink,
  ],
  declarations: [
    MdTabGroup,
    MdTabLabel,
    MdTab,
    MdInkBar,
    MdTabLabelWrapper,
    MdTabNav,
    MdTabLink,
    MdTabBody,
    MdTabHeader
  ],
  providers: [VIEWPORT_RULER_PROVIDER],
})
export class MdTabsModule {}


export * from './tab-group';
export {MdInkBar} from './ink-bar';
export {MdTabBody, MdTabBodyOriginState, MdTabBodyPositionState} from './tab-body';
export {MdTabHeader, ScrollDirection} from './tab-header';
export {MdTabLabelWrapper} from './tab-label-wrapper';
export {MdTab} from './tab';
export {MdTabLabel} from './tab-label';
export {MdTabNav, MdTabLink} from './tab-nav-bar/index';
