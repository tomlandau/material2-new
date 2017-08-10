/**
 * ##  `MdSnackBar` is a service for displaying snack-bar notifications
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/snack-bar/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-input-container>
 *   <input mdInput value="Disco party!" placeholder="Message" #message>
 * </md-input-container>
 *
 * <md-input-container>
 *   <input mdInput value="Dance" placeholder="Action" #action>
 * </md-input-container>
 *
 * <button md-button (click)="openSnackBar(message.value, action.value)">Show snack-bar</button>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 * import {MdSnackBar} from '@angular/material';
 *
 * \@Component({
 *   selector: 'snack-bar-overview-example',
 *   templateUrl: 'snack-bar-overview-example.html',
 * })
 * export class SnackBarOverviewExample {
 *   constructor(public snackBar: MdSnackBar) {}
 *
 *   openSnackBar(message: string, action: string) {
 *     this.snackBar.open(message, action, {
 *       duration: 2000,
 *     });
 *   }
 * }
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Opening a snack-bar
 * A snack-bar can contain either a string message or a given component.
 * ```ts
 * // Simple message.
 * let snackBarRef = snackBar.open('Message archived');
 * 
 * // Simple message with an action.
 * let snackBarRef = snackBar.open('Message archived', 'Undo');
 * 
 * // Load the given component into the snack-bar.
 * let snackBarRef = snackbar.openFromComponent(MessageArchivedComponent);
 * ```
 * 
 * In either case, a `MdSnackBarRef` is returned. This can be used to dismiss the snack-bar or to
 * receive notification of when the snack-bar is dismissed. For simple messages with an action, the
 * `MdSnackBarRef` exposes an observable for when the action is triggered.
 * If you want to close a custom snack-bar that was opened via `openFromComponent`, from within the
 * component itself, you can inject the `MdSnackBarRef`.
 * 
 * ```ts
 * snackBarRef.afterDismissed().subscribe(() => {
 *   console.log('The snack-bar was dismissed');
 * });
 * 
 * 
 * snackBarRef.onAction().subscribe(() => {
 *   console.log('The snack-bar action was triggered!');
 * });
 * 
 * snackBarRef.dismiss();
 * ```
 * 
 * &nbsp;
 * ## Dismissal
 * A snack-bar can be dismissed manually by calling the `dismiss` method on the `MdSnackBarRef`
 * returned from the call to `open`.
 * 
 * Only one snack-bar can ever be opened at one time. If a new snackbar is opened while a previous
 * message is still showing, the older message will be automatically dismissed.
 * 
 * A snack-bar can also be given a duration via the optional configuration object:
 * ```ts
 * snackbar.open('Message archived', 'Undo', {
 *   duration: 3000
 * });
 * ```
 * 
 * &nbsp;
 * ## Sharing data with a custom snack-bar.
 * You can share data with the custom snack-bar, that you opened via the `openFromComponent` method,
 * by passing it through the `data` property.
 * 
 * ```ts
 * snackbar.openFromComponent(MessageArchivedComponent, {
 *   data: 'some data'
 * });
 * ```
 * 
 * To access the data in your component, you have to use the `MD_SNACK_BAR_DATA` injection token:
 * 
 * ```ts
 * import {Component, Inject} from '@angular/core';
 * import {MD_SNACK_BAR_DATA} from '@angular/material';
 * 
 * \@Component({
 *   selector: 'your-snack-bar',
 *   template: 'passed in {{ data }}',
 * })
 * export class MessageArchivedComponent {
 *   constructor(@Inject(MD_SNACK_BAR_DATA) public data: any) { }
 * }
 * ```
 * 
 * &nbsp;
 * # Services
 * ## MdSnackBar
 * Service to dispatch Material Design snack bar messages.
 * 
 * Methods
 * * `openFromComponent`: Creates and dispatches a snack bar with a custom component for the content, removing any currently opened snack bars.
 *    * Parameters      
 *       * `component` - ComponentType<T>: Component to be instantiated.
 *       * `config?` - MdSnackBarConfig: Extra configuration for the snack bar.
 *    * Returns
 *       * MdSnackBarRef<T>
 * * `open`: Opens a snackbar with a message and an optional action.
 *    * Parameters
 *       * `message` - string: The message to show in the snackbar.
 *       * `action?` - any: The label for the snackbar action.
 *       * `config?` - MdSnackBarConfig: Additional configuration options for the snackbar.
 *    * Returns
 *       * MdSnackBarRef<SimpleSnackBar>
 * * `dismiss`: Dismisses the currently-visible snack bar.
 * 
 * 
 * &nbsp;
 * # Directives
 * ## SimpleSnackBar
 * A component used to open as the default snack bar, matching material spec. This should only be used internally by the snack bar service.
 * * Selector: `simple-snack-bar`
 * 
 * Properties
 * | Name                    | Description             |
 * |------------------------ | ------------------------|
 * | `message`               | The message to be shown in the snack bar.
 * | `action`                | The label for the button in the snack bar.
 * | `snackBarRef`           | The instance of the component making up the content of the snack bar.
 * | `hasAction`             | If the action button should be shown.
 * 
 * Methods
 * * `dismiss`: Dismisses the snack bar.
 * 
 * &nbsp;
 * # Additional classes
 * ## MdSnackBarConfig
 * Configuration used when opening a snack-bar.
 * 
 * Properties
 * | Name                    | Description             |
 * |------------------------ | ------------------------|
 * | `politeness`            | The politeness level for the MdAriaLiveAnnouncer announcement.
 * | `announcementMessage`   | Message to be announced by the MdAriaLiveAnnouncer
 * | `viewContainerRef`      | The view container to place the overlay for the snack bar into.
 * | `duration`              | The length of time in milliseconds to wait before automatically dismissing the snack bar.
 * | `extraClasses`          | Extra CSS classes to be added to the snack bar container.
 * | `direction`             | Text layout direction for the snack bar.
 * 
 * &nbsp;
 * ## MdSnackBarRef
 * Reference to a snack bar dispatched from the snack bar service.
 * 
 * Properties
 * | Name                    | Description             |
 * |------------------------ | ------------------------|
 * | `instance`              | The instance of the component making up the content of the snack bar.
 * 
 * Methods
 * * `dismiss`: Dismisses the snack bar.
 * * `afterDismissed`: Gets an observable that is notified when the snack bar is finished closing.
 *    * Returns
 *       * Observable<void>
 * * `afterOpened`: Gets an observable that is notified when the snack bar has opened and appeared.
 *    * Returns
 *       * Observable<void>
 * * `onAction`: Gets an observable that is notified when the snack bar action is called.
 *    * Returns
 *       * Observable<void>
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
import {OverlayModule} from '../core/overlay/index';
import {PortalModule, LIVE_ANNOUNCER_PROVIDER} from '@angular/cdk';
import {MdCommonModule} from '../core/common-behaviors/index';
import {CommonModule} from '@angular/common';
import {MdSnackBar} from './snack-bar';
import {MdSnackBarContainer} from './snack-bar-container';
import {SimpleSnackBar} from './simple-snack-bar';


@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,
    MdCommonModule,
  ],
  exports: [MdSnackBarContainer, MdCommonModule],
  declarations: [MdSnackBarContainer, SimpleSnackBar],
  entryComponents: [MdSnackBarContainer, SimpleSnackBar],
  providers: [MdSnackBar, LIVE_ANNOUNCER_PROVIDER]
})
export class MdSnackBarModule {}


export * from './snack-bar';
export * from './snack-bar-container';
export * from './snack-bar-config';
export * from './snack-bar-ref';
export * from './simple-snack-bar';
