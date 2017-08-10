/**
 * ## `<md-list>` is a container component that wraps and formats a series of line items. As the base list component, it provides Material Design styling, but no behavior of its own.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/list/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-list>
 *   <md-list-item>Item 1</md-list-item>
 *   <md-list-item>Item 2</md-list-item>
 *   <md-list-item>Item 3</md-list-item>
 * </md-list>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'list-overview-example',
 *   templateUrl: 'list-overview-example.html',
 * })
 * export class ListOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Simple lists
 * 
 * An `<md-list>` element contains a number of `<md-list-item>` elements.
 * 
 * ```html
 * <md-list>
 *  <md-list-item> Pepper </md-list-item>
 *  <md-list-item> Salt </md-list-item>
 *  <md-list-item> Paprika </md-list-item>
 * </md-list>
 * ```
 * 
 * &nbsp;
 * ## Navigation lists
 * 
 * Use `md-nav-list` tags for navigation lists (i.e. lists that have anchor tags).
 * 
 * Simple navigation lists can use the `md-list-item` attribute on anchor tag elements directly:
 * 
 * ```html
 * <md-nav-list>
 *    <a md-list-item href="..." *ngFor="let link of links"> {{ link }} </a>
 * </md-nav-list>
 * ```
 * 
 * For more complex navigation lists (e.g. with more than one target per item), wrap the anchor 
 * element in an `<md-list-item>`.
 * 
 * ```html
 * <md-nav-list>
 *   <md-list-item *ngFor="let link of links">
 *      <a md-line href="...">{{ link }}</a>
 *      <button md-icon-button (click)="showInfo(link)">
 *         <md-icon>info</md-icon>
 *      </button>
 *   </md-list-item>
 * </md-nav-list>
 * ```
 * 
 * &nbsp;
 * ## Multi-line lists
 * For lists that require multiple lines per item, annotate each line with an `md-line` attribute.
 * Whichever heading tag is appropriate for your DOM hierarchy should be used (not necessarily `<h3>`
 * as shown in the example).
 * 
 * ```html
 * <!-- two line list -->
 * <md-list>
 *   <md-list-item *ngFor="let message of messages">
 *     <h3 md-line> {{message.from}} </h3>
 *     <p md-line>
 *       <span> {{message.subject}} </span>
 *       <span class="demo-2"> -- {{message.content}} </span>
 *     </p>
 *   </md-list-item>
 * </md-list>
 * 
 * <!-- three line list -->
 * <md-list>
 *   <md-list-item *ngFor="let message of messages">
 *     <h3 md-line> {{message.from}} </h3>
 *     <p md-line> {{message.subject}} </p>
 *     <p md-line class="demo-2"> {{message.content}} </p>
 *   </md-list-item>
 * </md-list>
 * ```
 * 
 * &nbsp;
 * ## Lists with icons
 * 
 * To add an icon to your list item, use the `md-list-icon` attribute.
 * 
 * 
 * ```html
 * <md-list>
 *   <md-list-item *ngFor="let message of messages">
 *     <md-icon md-list-icon>folder</md-icon>
 *     <h3 md-line> {{message.from}} </h3>
 *     <p md-line>
 *       <span> {{message.subject}} </span>
 *       <span class="demo-2"> -- {{message.content}} </span>
 *     </p>
 *   </md-list-item>
 * </md-list>
 * ```
 * 
 * &nbsp;
 * ## Lists with avatars
 * 
 * To include an avatar image, add an image tag with an `md-list-avatar` attribute. 
 * 
 * ```html
 * <md-list>
 *   <md-list-item *ngFor="let message of messages">
 *     <img md-list-avatar src="..." alt="...">
 *     <h3 md-line> {{message.from}} </h3>
 *     <p md-line>
 *       <span> {{message.subject}} </span>
 *       <span class="demo-2"> -- {{message.content}} </span>
 *     </p>
 *   </md-list-item>
 * </md-list>
 * ```
 * 
 * &nbsp;
 * ## Dense lists
 * Lists are also available in "dense layout" mode, which shrinks the font size and height of the list
 * to suit UIs that may need to display more information. To enable this mode, add a `dense` attribute
 * to the main `md-list` tag.
 * 
 * 
 * ```html
 * <md-list dense>
 *  <md-list-item> Pepper </md-list-item>
 *  <md-list-item> Salt </md-list-item>
 *  <md-list-item> Paprika </md-list-item>
 * </md-list>
 * ```
 * 
 * &nbsp;
 * ## Lists with multiple sections
 * 
 * Subheader can be added to a list by annotating a heading tag with an `md-subheader` attribute. 
 * To add a divider, use `<md-divider>`.
 * 
 * ```html
 * <md-list>
 *    <h3 md-subheader>Folders</h3>
 *    <md-list-item *ngFor="let folder of folders">
 *       <md-icon md-list-icon>folder</md-icon>
 *       <h4 md-line>{{folder.name}}</h4>
 *       <p md-line class="demo-2"> {{folder.updated}} </p>
 *    </md-list-item>
 *    <md-divider></md-divider>
 *    <h3 md-subheader>Notes</h3>
 *    <md-list-item *ngFor="let note of notes">
 *       <md-icon md-list-icon>note</md-icon>
 *       <h4 md-line>{{note.name}}</h4>
 *       <p md-line class="demo-2"> {{note.updated}} </p>
 *    </md-list-item>
 * </md-list>
 * ```
 * 
 * &nbsp;
 * # Directives
 * ## MdListDivider
 * * Selector: `md-divider`
 * 
 * &nbsp;
 * ## MdList
 * * Selector: `md-list md-nav-list`
 * 
 * Properties
 * | Name                        | Description             |
 * |---------------------------- | ------------------------|
 * | `@Input() disableRipple`    | Whether the ripple effect should be disabled on the list-items or not. This flag only has an effect for `md-nav-list` components.
 * 
 * 
 * &nbsp;
 * ## MdListItem
 * * Selector: `md-list-item a[md-list-item]`
 * 
 * Properties
 * | Name                        | Description             |
 * |---------------------------- | ------------------------|
 * | `@Input() disableRipple`    | Whether the ripple effect on click should be disabled. This applies only to list items that are part of a nav list. The value of `disableRipple` on the `md-nav-list` overrides this flag.
 * 
 * Methods
 * * `isRippleEnabled`: Whether this list item should show a ripple effect when clicked.
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
import {MdLineModule} from '../core/line/line';
import {MdRippleModule} from '../core/ripple/index';
import {MdCommonModule} from '../core/common-behaviors/index';
import {
  MdList,
  MdListItem,
  MdListDivider,
  MdListAvatarCssMatStyler,
  MdListIconCssMatStyler,
  MdListCssMatStyler,
  MdNavListCssMatStyler,
  MdDividerCssMatStyler,
  MdListSubheaderCssMatStyler,
} from './list';


@NgModule({
  imports: [MdLineModule, MdRippleModule, MdCommonModule],
  exports: [
    MdList,
    MdListItem,
    MdListDivider,
    MdListAvatarCssMatStyler,
    MdLineModule,
    MdCommonModule,
    MdListIconCssMatStyler,
    MdListCssMatStyler,
    MdNavListCssMatStyler,
    MdDividerCssMatStyler,
    MdListSubheaderCssMatStyler,
  ],
  declarations: [
    MdList,
    MdListItem,
    MdListDivider,
    MdListAvatarCssMatStyler,
    MdListIconCssMatStyler,
    MdListCssMatStyler,
    MdNavListCssMatStyler,
    MdDividerCssMatStyler,
    MdListSubheaderCssMatStyler,
  ],
})
export class MdListModule {}


export * from './list';
