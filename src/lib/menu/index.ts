/**
 *
 * ## `<md-menu>` is a floating panel containing list of options. 
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/menu/examples)
 * 
 * &nbsp;
 * HTML
 * ```html
 * <button md-button [mdMenuTriggerFor]="menu">Menu</button>
 * <md-menu #menu="mdMenu">
 *   <button md-menu-item>Item 1</button>
 *   <button md-menu-item>Item 2</button>
 * </md-menu>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 * 
 * \@Component({
 *   selector: 'menu-overview-example',
 *   templateUrl: 'menu-overview-example.html',
 * })
 * export class MenuOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * By itself, the `<md-menu>` element does not render anything. The menu is attached to and opened 
 * via application of the `mdMenuTriggerFor` directive:
 * ```html
 * <md-menu #appMenu="mdMenu">
 *   <button md-menu-item> Settings </button>
 *   <button md-menu-item> Help </button>
 * </md-menu>
 * 
 * <button md-icon-button [mdMenuTriggerFor]="appMenu">
 *    <md-icon>more_vert</md-icon>
 * </button>
 * ```
 * 
 * &nbsp;
 * ## Toggling the menu programmatically
 * The menu exposes an API to open/close programmatically. Please note that in this case, an 
 * `mdMenuTriggerFor` directive is still necessary to attach the menu to a trigger element in the DOM.
 * 
 * ```ts
 * class MyComponent {
 *   \@ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
 * 
 *   someMethod() {
 *     this.trigger.openMenu();
 *   }
 * }
 * ```
 * 
 * &nbsp;
 * ## Icons
 * Menus support displaying `md-icon` elements before the menu item text.
 * 
 * *my-comp.html*
 * ```html
 * <md-menu #menu="mdMenu">
 *   <button md-menu-item>
 *     <md-icon> dialpad </md-icon>
 *     <span> Redial </span>
 *   </button>
 *   <button md-menu-item disabled>
 *     <md-icon> voicemail </md-icon>
 *     <span> Check voicemail </span>
 *   </button>
 *   <button md-menu-item>
 *     <md-icon> notifications_off </md-icon>
 *     <span> Disable alerts </span>
 *   </button>
 * </md-menu>
 * ```
 * 
 * &nbsp;
 * ## Customizing menu position
 * 
 * By default, the menu will display below (y-axis), after (x-axis), and overlapping its trigger.  The position can be changed
 * using the `xPosition` (`before | after`) and `yPosition` (`above | below`) attributes.
 * The menu can be be forced to not overlap the trigger using `[overlapTrigger]="false"` attribute.
 * 
 * ```html
 * <md-menu #appMenu="mdMenu" yPosition="above">
 *   <button md-menu-item> Settings </button>
 *   <button md-menu-item> Help </button>
 * </md-menu>
 * 
 * <button md-icon-button [mdMenuTriggerFor]="appMenu">
 *    <md-icon>more_vert</md-icon>
 * </button>
 * ```
 * 
 * &nbsp;
 * ## Keyboard interaction
 * - <kbd>DOWN_ARROW</kbd>: Focuses the next menu item
 * - <kbd>UP_ARROW</kbd>: Focuses previous menu item
 * - <kbd>ENTER</kbd>: Activates the focused menu item
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdMenu
 * * Selector: `md-menu`
 * * Exported as: `mdMenu`
 * 
 * Properties
 * | Name                                         | Description             |
 * |--------------------------------------------- | ------------------------|
 * | `@Input() xPosition`                         | Position of the menu in the X axis.
 * | `@Input() yPosition`                         | Position of the menu in the Y axis.
 * | `templateRef`                                | 
 * | `items`                                      | List of the items inside of a menu.
 * | `@Input() overlapTrigger`                    | Whether the menu should overlap its trigger.
 * | `@Input('class') classList`                  | This method takes classes set on the host md-menu element and applies them on the menu template that displays in the overlay container. Otherwise, it's difficult to style the containing menu from outside the component.
 * | `@Output() close`                            | Event emitted when the menu is closed.
 *
 * 
 * Methods
 * * `focusFirstItem`: Focus the first item in the menu. This method is used by the menu trigger to focus the first item when the menu is opened by the ENTER key.
 * * `setPositionClasses`: It's necessary to set position-based classes to ensure the menu panel animation folds out from the correct direction.
 *    * Parameters
 *       * posX? - `any`
 *       * posX? - `any`
 * 
 * &nbsp;
 * ## MdMenuItem
 * This directive is intended to be used inside an md-menu tag. It exists mostly to set the role attribute.
 * * Selector: `[md-menu-item]`
 * * Exported as: `mdMenuItem`
 * 
 * Methods
 * * `focus`: Focuses the menu item.
 *
 * &nbsp;
 * ## MdMenuTrigger
 * This directive is intended to be used in conjunction with an md-menu tag. It is responsible for toggling the display of the provided menu instance.
 * * Selector: `[md-menu-trigger-for] [mdMenuTriggerFor]`
 * * Exported as: `mdMenuTrigger`
 * 
 * Properties
 * | Name                                 | Description                        |
 * |------------------------------------- | -----------------------------------|
 * | `@Input('mdMenuTriggerFor') menu`    | References the menu instance that the trigger is associated with. 
 * | `@Output() onMenuOpen`               | Event emitted when the associated menu is opened.
 * | `@Output() onMenuClose`              | Event emitted when the associated menu is closed.
 * | `menuOpen`                           | Whether the menu is open.
 * | `dir`                                | The text direction of the containing app.
 * 
 * Methods
 * * `toggleMenu`: Toggles the menu between the open and closed states.
 * * `openMenu`: Opens the menu.
 * * `closeMenu`: Closes the menu.
 * * `destroyMenu`: Removes the menu from the DOM.
 * * `focus`: Focuses the menu trigger.
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
import {OverlayModule} from '../core/overlay/index';
import {MdCommonModule} from '../core/common-behaviors/common-module';
import {MdMenu} from './menu-directive';
import {MdMenuItem} from './menu-item';
import {MdMenuTrigger, MD_MENU_SCROLL_STRATEGY_PROVIDER} from './menu-trigger';
import {MdRippleModule} from '../core/ripple/index';


@NgModule({
  imports: [
    OverlayModule,
    CommonModule,
    MdRippleModule,
    MdCommonModule,
  ],
  exports: [MdMenu, MdMenuItem, MdMenuTrigger, MdCommonModule],
  declarations: [MdMenu, MdMenuItem, MdMenuTrigger],
  providers: [MD_MENU_SCROLL_STRATEGY_PROVIDER],
})
export class MdMenuModule {}


export * from './menu';
export {fadeInItems, transformMenu} from './menu-animations';
