/**
 * ## `md-icon` makes it easier to use _vector-based_ icons in your app.  This directive supports both icon fonts and SVG icons, but not bitmap-based formats (png, jpg, etc.).
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/icon/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-icon>home</md-icon>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 * \@Component({
 *   selector: 'icon-overview-example',
 *   templateUrl: 'icon-overview-example.html',
 * })
 * export class IconOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ### Registering icons
 * 
 * `MdIconRegistry` is an injectable service that allows you to associate icon names with SVG URLs and
 * define aliases for CSS font classes. Its methods are discussed below and listed in the API summary.
 * 
 * &nbsp;
 * ### Font icons with ligatures
 * 
 * Some fonts are designed to show icons by using
 * [ligatures](https://en.wikipedia.org/wiki/Typographic_ligature), for example by rendering the text
 * "home" as a home image. To use a ligature icon, put its text in the content of the `md-icon`
 * component.
 * 
 * By default, `<md-icon>` expects the
 * [Material icons font](http://google.github.io/material-design-icons/#icon-font-for-the-web).
 * (You will still need to include the HTML to load the font and its CSS, as described in the link).
 * You can specify a different font by setting the `fontSet` input to either the CSS class to apply to
 * use the desired font, or to an alias previously registered with
 * `MdIconRegistry.registerFontClassAlias`.
 * 
 * &nbsp;
 * ### Font icons with CSS
 * 
 * Fonts can also display icons by defining a CSS class for each icon glyph, which typically uses a
 * `:before` selector to cause the icon to appear.
 * [FontAwesome](https://fortawesome.github.io/Font-Awesome/examples/) uses this approach to display
 * its icons. To use such a font, set the `fontSet` input to the font's CSS class (either the class
 * itself or an alias registered with `MdIconRegistry.registerFontClassAlias`), and set the `fontIcon`
 * input to the class for the specific icon to show.
 * 
 * For both types of font icons, you can specify the default font class to use when `fontSet` is not
 * explicitly set by calling `MdIconRegistry.setDefaultFontSetClass`.
 * 
 * &nbsp;
 * ### SVG icons
 * 
 * When an `md-icon` component displays an SVG icon, it does so by directly inlining the SVG content
 * into the page as a child of the component. (Rather than using an <img> tag or a div background
 * image). This makes it easier to apply CSS styles to SVG icons. For example, the default color of the
 * SVG content is the CSS 
 * [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentColor_keyword) 
 * value. This makes SVG icons by default have the same color as surrounding text, and allows you to 
 * change the color by setting the "color" style on the `md-icon` element.
 * 
 * In order to prevent XSS vulnerabilities, any SVG URLs passed to the `MdIconRegistry` must be 
 * marked as trusted resource URLs by using Angular's `DomSanitizer` service.
 * 
 * Also note that all SVG icons are fetched via XmlHttpRequest, and due to the same-origin policy, 
 * their URLs must be on the same domain as the containing page, or their servers must be configured 
 * to allow cross-domain access.
 * 
 * &nbsp;
 * #### Named icons
 * 
 * To associate a name with an icon URL, use the `addSvgIcon` or `addSvgIconInNamespace` methods of
 * `MdIconRegistry`. After registering an icon, it can be displayed by setting the `svgIcon` input.
 * For an icon in the default namespace, use the name directly. For a non-default namespace, use the
 * format `[namespace]:[name]`.
 * 
 * &nbsp;
 * #### Icon sets
 * 
 * Icon sets allow grouping multiple icons into a single SVG file. This is done by creating a single
 * root `<svg>` tag that contains multiple nested `<svg>` tags in its `<defs>` section. Each of these
 * nested tags is identified with an `id` attribute. This `id` is used as the name of the icon.
 * 
 * Icon sets are registered using the `addSvgIconSet` or `addSvgIconSetInNamespace` methods of
 * `MdIconRegistry`. After an icon set is registered, each of its embedded icons can be accessed by
 * their `id` attributes. To display an icon from an icon set, use the `svgIcon` input in the same way
 * as for individually registered icons.
 * 
 * Multiple icon sets can be registered in the same namespace. Requesting an icon whose id appears in
 * more than one icon set, the icon from the most recently registered set will be used.
 * 
 * &nbsp;
 * ### Theming
 * 
 * By default, icons will use the current font color (`currentColor`). this color can be changed to 
 * match the current theme's colors using the `color` attribute. This can be changed to 
 * `'primary'`, `'accent'`, or `'warn'`.
 * 
 * &nbsp;
 * ### Accessibility
 * 
 * Similar to an `<img>` element, an icon alone does not convey any useful information for a
 * screen-reader user. The user of `<md-icon>` must provide additional information pertaining to how
 * the icon is used. Based on the use-cases described below, `md-icon` is marked as
 * `aria-hidden="true"` by default, but this can be overriden by adding `aria-hidden="false"` to the
 * element.
 * 
 * In thinking about accessibility, it is useful to place icon use into one of three categories:
 * 1. **Decorative**: the icon conveys no real semantic meaning and is purely cosmetic.
 * 2. **Interactive**: a user will click or otherwise interact with the icon to perform some action.
 * 3. **Indicator**: the icon is not interactive, but it conveys some information, such as a status.
 * 
 * &nbsp;
 * #### Decorative icons
 * When the icon is puely cosmetic and conveys no real semantic meaning, the `<md-icon>` element
 * should be marked with `aria-hidden="true"`.
 * 
 * &nbsp;
 * #### Interactive icons
 * Icons alone are not interactive elements for screen-reader users; when the user would interact with
 * some icon on the page, a more appropriate  element should "own" the interaction:
 * * The `<md-icon>` element should be a child of a `<button>` or `<a>` element.
 * * The `<md-icon>` element should be marked with `aria-hidden="true"`.
 * * The parent `<button>` or `<a>` should either have a meaningful label provided either through
 * direct text content, `aria-label`, or `aria-labelledby`.
 * 
 * &nbsp;
 * #### Indicator icons
 * When the presence of an icon communicates some information to the user, that information must also
 * be made available to screen-readers. The most straightforward way to do this is to
 * 1. Mark the `<md-icon>` as `aria-hidden="true"`
 * 2. Add a `<span>` as an adjacent sibling to the `<md-icon>` element with text that conveys the same
 * information as the icon.
 * 3. Add the `cdk-visually-hidden` class to the `<span>`. This will make the message invisible
 * on-screen but still available to screen-reader users.
 * 
 * &nbsp;
 * # Services
 * ## MdIconRegistry
 * Service to register and display icons used by thecomponent.
 * * Registers icon URLs by namespace and name.
 * * Registers icon set URLs by namespace.
 * * Registers aliases for CSS classes, for use with icon fonts.
 * * Loads icons from URLs and extracts individual icons from icon sets.
 * 
 * Methods
 * * `addSvgIcon`: Registers an icon by URL in the default namespace.
 *    * Parameters
 *       * `iconName` - string: Name under which the icon should be registered.
 *       * `url` - safeResourceUrl
 *    * Returns
 *       * this
 * * `addSvgIconInNamespace`: Registers an icon by URL in the specified namespace.
 *    * Parameters
 *       * `namespace` - string: Namespace in which the icon should be registered.
 *       * `iconName` - string: Name under which the icon should be registered.
 *       * `url` - safeResourceUrl
 *    * Returns
 *       * this
 * * `addSvgIconSet`: Registers an icon set by URL in the default namespace.
 *    * Parameters
 *       * `url` - safeResourceUrl
 *    * Returns
 *       * this
 * * `addSvgIconSetInNamespace`: Registers an icon set by URL in the specified namespace.
 *    * Parameters
 *       * `namespace` - string: Namespace in which to register the icon set.
 *       * `url` - safeResourceUrl
 *    * Returns
 *       * this
 * * `registerFontClassAlias`: Defines an alias for a CSS class name to be used for icon fonts. Creating an mdIcon component with the alias as the fontSet input will cause the class name to be applied to theelement.
 *    * Parameters
 *       * `alias` - string: Alias for the font.
 *       * `className` - any: Class name override to be used instead of the alias.
 *    * Returns
 *       * this
 * * `classNameForFontAlias`: Returns the CSS class name associated with the alias by a previous call to registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
 *    * Parameters
 *       * `alias` - string
 *    * Returns
 *       * string
 * * `setDefaultFontSetClass`: Sets the CSS class name to be used for icon fonts when ancomponent does not have a fontSet input value, and is not loading an icon by name or URL.
 *    * Parameters
 *       * `className` - string
 *    * Returns
 *       * this
 * * `getDefaultFontSetClass`: Returns the CSS class name to be used for icon fonts when ancomponent does not have a fontSet input value, and is not loading an icon by name or URL.
 *    * Returns
 *       * string
 * * `getSvgIconFromUrl`: Returns an Observable that produces the icon (as an <svg> DOM element) from the given URL. The response from the URL may be cached so this will not always cause an HTTP request, but the produced element will always be a new copy of the originally fetched icon. (That is, it will not contain any modifications made to elements previously returned).
 *    * Parameters
 *       * `safeUrl` - safeResourceUrl
 *    * Returns
 *       * `Observable<SVGElement>`
 * * `getNamedSvgIcon`: Returns an Observable that produces the icon (as an DOM element) with the given name and namespace. The icon must have been previously registered with addIcon or addIconSet; if not, the Observable will throw an error.
 *    * Parameters
 *       * `name` - string: Name of the icon to be retrieved.
 *       * `namespace` - any: Namespace in which to look for the icon.
 *    * Returns
 *       * `Observable<SVGElement>`
 * 
 * &nbsp;
 * # Directives
 * ## MdIcon
 * Component to display an icon. It can be used in the following ways:
 * * Specify the svgSrc input to load an SVG icon from a URL. The SVG content is directly inlined as a child of the <md-icon> component, so that CSS styles can easily be applied to it. The URL is loaded via an XMLHttpRequest, so it must be on the same domain as the page or its server must be configured to allow cross-domain requests.
 *    * Example: 
 *       * <md-icon svgsrc="assets/arrow.svg"></md-icon>
 * * Specify the svgIcon input to load an SVG icon from a URL previously registered with the addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of MdIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format "[namespace]:[name]", if not the value will be the name of an icon in the default namespace. 
 *    * Examples:
 *       * <md-icon svgicon="left-arrow"></md-icon>
 *       * <md-icon svgicon="animals:cat"></md-icon>
 * * Use a font ligature as an icon by putting the ligature text in the content of the <md-icon> component. By default the Material icons font is used as described at [http://google.github.io/material-design-icons/#icon-font-for-the-web](http://google.github.io/material-design-icons/#icon-font-for-the-web). You can specify an alternate font by setting the fontSet input to either the CSS class to apply to use the desired font, or to an alias previously registered with MdIconRegistry.registerFontClassAlias.
 *    * Examples:
 *       * <md-icon>home</md-icon>
 *       * <md-icon fontset="myfont">sun</md-icon>
 * 
 * * Selector: `md-icon`
 * 
 * Properties
 * | Name                         | Description             |
 * |----------------------------- | ------------------------|
 * | `@Input() svgIcon`           | Name of the icon in the SVG icon set.
 * | `@Input() fontSet`           | Font set that the icon is a part of.
 * | `@Input() fontIcon`          | Name of an icon within a font set.
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
import {MdCommonModule} from '../core/common-behaviors/common-module';
import {MdIcon} from './icon';
import {ICON_REGISTRY_PROVIDER} from './icon-registry';


@NgModule({
  imports: [MdCommonModule],
  exports: [MdIcon, MdCommonModule],
  declarations: [MdIcon],
  providers: [ICON_REGISTRY_PROVIDER],
})
export class MdIconModule {}


export * from './icon';
export * from './icon-registry';
