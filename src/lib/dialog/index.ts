/**
 * ## The `MdDialog` service can be used to open modal dialogs with Material Design styling and animations.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/dialog/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <button md-button (click)="openDialog()">Open dialog</button>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 * import {MdDialog} from '@angular/material';
 *
 *
 * \@Component({
 *   selector: 'dialog-overview-example',
 *   templateUrl: 'dialog-overview-example.html',
 * })
 * export class DialogOverviewExample {
 * constructor(public dialog: MdDialog) {}
 *
 * openDialog() {
 *     this.dialog.open(DialogOverviewExampleDialog);
 *   }
 * }
 *
 *
 * \@Component({
 *   selector: 'dialog-overview-example-dialog',
 *   templateUrl: 'dialog-overview-example-dialog.html',
 * })
 * export class DialogOverviewExampleDialog {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * 
 * A dialog is opened by calling the `open` method with a component to be loaded and an optional 
 * config object. The `open` method will return an instance of `MdDialogRef`:
 * 
 * ```ts
 * let dialogRef = dialog.open(UserProfileComponent, {
 *   height: '400px',
 *   width: '600px',
 * });
 * ```
 * 
 * The `MdDialogRef` provides a handle on the opened dialog. It can be used to close the dialog and to
 * receive notification when the dialog has been closed.
 * 
 * ```ts
 * dialogRef.afterClosed().subscribe(result => {
 *   console.log(`Dialog result: ${result}`); // Pizza!
 * });
 * 
 * dialogRef.close('Pizza!');
 * ```
 * 
 * Components created via `MdDialog` can _inject_ `MdDialogRef` and use it to close the dialog
 * in which they are contained. When closing, an optional result value can be provided. This result
 * value is forwarded as the result of the `afterClosed` promise. 
 * 
 * ```ts
 * \@Component({ ... })
 * export class YourDialog {
 *   constructor(public dialogRef: MdDialogRef<YourDialog>) { }
 *   
 *   closeDialog() {
 *     this.dialogRef.close('Pizza!');
 *   }
 * }
 * ```
 * 
 * &nbsp;
 * ### Sharing data with the Dialog component.
 * If you want to share data with your dialog, you can use the `data` option to pass information to the dialog component.
 * 
 * ```ts
 * let dialogRef = dialog.open(YourDialog, {
 *   data: { name: 'austin' },
 * });
 * ```
 * 
 * To access the data in your dialog component, you have to use the MD_DIALOG_DATA injection token:
 * 
 * ```ts
 * import {Component, Inject} from '@angular/core';
 * import {MD_DIALOG_DATA} from '@angular/material';
 * 
 * \@Component({
 *   selector: 'your-dialog',
 *   template: 'passed in {{ data.name }}',
 * })
 * export class YourDialog {
 *   constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
 * }
 * ```
 * 
 * &nbsp;
 * ### Dialog content
 * Several directives are available to make it easier to structure your dialog content:
 * 
 * | Name                  | Description                                                                                                   |
 * |-----------------------|---------------------------------------------------------------------------------------------------------------|
 * | `md-dialog-title`     | \[Attr] Dialog title, applied to a heading element (e.g., `<h1>`, `<h2>`)                                     |
 * | `<md-dialog-content>` | Primary scrollable content of the dialog                                                                      |
 * | `<md-dialog-actions>` | Container for action buttons at the bottom of the dialog                                                      |
 * | `md-dialog-close`     | \[Attr] Added to a `<button>`, makes the button close the dialog with an optional result from the bound value.|
 * 
 * For example:
 * ```html
 * <h2 md-dialog-title>Delete all</h2>
 * <md-dialog-content>Are you sure?</md-dialog-content>
 * <md-dialog-actions>
 *   <button md-button md-dialog-close>No</button>
 *   <!-- Can optionally provide a result for the closing dialog. -->
 *   <button md-button [md-dialog-close]="true">Yes</button>
 * </md-dialog-actions>
 * ```
 * 
 * Once a dialog opens, the dialog will automatically focus the first tabbable element.
 * 
 * You can control which elements are tab stops with the `tabindex` attribute
 * 
 * ```html
 * <button md-button tabindex="-1">Not Tabbable</button>
 * ```
 * 
 * &nbsp;
 * ### AOT Compilation
 * 
 * Due to the dynamic nature of the `MdDialog`, and its usage of `ViewContainerRef#createComponent()`
 * to create the component on the fly, the AOT compiler will not know to create the proper
 * `ComponentFactory` for your dialog component by default.
 * 
 * You must include your dialog class in the list of `entryComponents` in your module definition so
 * that the AOT compiler knows to create the `ComponentFactory` for it.
 * 
 * ```ts
 * \@NgModule({
 *   imports: [
 *     // ...
 *     MdDialogModule
 *   ],
 * 
 *   declarations: [
 *     AppComponent,
 *     ExampleDialogComponent
 *   ],
 * 
 *   entryComponents: [
 *     ExampleDialogComponent
 *   ],
 * 
 *   providers: [],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule() {}
 * ```
 * 
 * &nbsp;
 * # Services
 * ## MdDialog
 * Service to open Material Design modal dialogs.
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `afterOpen`                  | Gets an observable that is notified when a dialog has been opened.
 * | `afterAllClosed`             | Gets an observable that is notified when all open dialog have finished closing.
 * 
 * Methods
 * * `open`: Opens a modal dialog containing the given component.
 *    * Parameters
 *       * `componentOrTemplateRef` - ComponentType<T> | TemplateRef<T>: Type of the component to load into the dialog, or a TemplateRef to instantiate as the dialog content.
 *       * `config?` - MdDialogConfig: Extra configuration options.
 *    * Returns
 *       * MdDialogRef<T>: Reference to the newly-opened dialog.
 * * `closeAll`: Closes all of the currently-open dialogs.
 * 
 * &nbsp;
 * # Directives
 * ## MdDialogClose
 * Button that will close the current dialog.
 * * Selector: `button[md-dialog-close]`
 * 
 * Properties
 * | Name                                         | Description             |
 * |--------------------------------------------- | ------------------------|
 * | `@Input('aria-label') ariaLabel`             | Screenreader label for the button.
 * | `@Input('md-dialog-close') dialogResult`     | Dialog close input.
 * 
 * &nbsp;
 * ## MdDialogContent
 * Scrollable content container of a dialog.
 * * Selector: `[md-dialog-content] md-dialog-content`
 * 
 * &nbsp;
 * ## MdDialogActions
 * Container for the bottom action buttons in a dialog. Stays fixed to the bottom when scrolling.
 * * Selector: `[md-dialog-actions] md-dialog-actions`
 * 
 * &nbsp;
 * # Additional classes
 * 
 * ## MdDialogConfig
 * Configuration for opening a modal dialog with the MdDialog service.
 *
 * Properties
 * | Name                  | Description             |
 * |---------------------- | ------------------------|
 * | `viewContainerRef`    | here the attached component should live in Angular's _logical_ component tree. This affects what is available for injection and the change detection order for the component instantiated inside of the dialog. This does not affect where the dialog content will be rendered.
 * | `role`                | The ARIA role of the dialog element.
 * | `panelClass`          | Custom class for the overlay pane.
 * | `hasBackdrop`         | Whether the dialog has a backdrop.
 * | `backdropClass`       | Custom class for the backdrop.
 * | `disableClose`        | Whether the user can use escape or clicking outside to close a modal.
 * | `width`               | Width of the dialog.
 * | `height`              | Height of the dialog.
 * | `position`            | Position overrides.
 * | `data`                | Data being injected into the child component.
 * | `direction`           | Layout direction for the dialog's content.
 * | `ariaDescribedBy`     | ID of the element that describes the dialog.
 * 
 * &nbsp;
 * ## MdDialogRef
 * Reference to a dialog opened via the MdDialog service.
 *
 * Properties
 * | Name                  | Description             |
 * |---------------------- | ------------------------|
 * | `componentInstance`   | The instance of component opened into the dialog.
 * | `disableClose`        | Whether the user is allowed to close the dialog.
 * 
 * Methods
 * * `afterClosed`: Gets an observable that is notified when the dialog is finished closing.
 *    * Returns
 *       * Observable<any>
 * * `updatePosition`: Updates the dialog's position.
 *    * Parameters
 *       * `position?` - DialogPosition: New dialog position.
 *    * Returns
 *       * this
 * * `updateSize`: Updates the dialog's width and height.
 *    * Parameters
 *       * `width?` - any: New width of the dialog.
 *       * `height?` - any: New height of the dialog.
 *    * Returns
 *       * this
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
import {PortalModule, A11yModule} from '@angular/cdk';
import {MdCommonModule} from '../core/common-behaviors/index';
import {OverlayModule} from '../core/overlay/index';
import {MdDialog, MD_DIALOG_SCROLL_STRATEGY_PROVIDER} from './dialog';
import {MdDialogContainer} from './dialog-container';
import {
  MdDialogClose,
  MdDialogContent,
  MdDialogTitle,
  MdDialogActions
} from './dialog-content-directives';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    A11yModule,
    MdCommonModule,
  ],
  exports: [
    MdDialogContainer,
    MdDialogClose,
    MdDialogTitle,
    MdDialogContent,
    MdDialogActions,
    MdCommonModule,
  ],
  declarations: [
    MdDialogContainer,
    MdDialogClose,
    MdDialogTitle,
    MdDialogActions,
    MdDialogContent,
  ],
  providers: [
    MdDialog,
    MD_DIALOG_SCROLL_STRATEGY_PROVIDER,
  ],
  entryComponents: [MdDialogContainer],
})
export class MdDialogModule {}

export * from './dialog';
export * from './dialog-container';
export * from './dialog-content-directives';
export * from './dialog-config';
export * from './dialog-ref';
