/**
 * ## `<md-card>` is a content container for text, photos, and actions in the context of a single subject.
 * 
 * You can see live examples in the Material [documentation](https://material.angular.io/components/card/examples)
 * 
 * &nbsp;
 * ## Basic example
 * HTML
 * ```html
 * <md-card>Simple card</md-card>
 * ```
 * 
 * TS
 * ```ts
 * import {Component} from '@angular/core';
 *
 *
 * \@Component({
 *   selector: 'card-overview-example',
 *   templateUrl: 'card-overview-example.html',
 * })
 * export class CardOverviewExample {}
 * ```
 * 
 * &nbsp;
 * # Overview
 * ## Basic card sections
 * The most basic card needs only an `<md-card>` element with some content. However, Angular Material
 * provides a number of preset sections that you can use inside of an `<md-card>`:
 * 
 * 
 * | Element               | Description                                                              |
 * |-----------------------|--------------------------------------------------------------------------|
 * | `<md-card-title>`     | Card title                                                               |
 * | `<md-card-subtitle>`  | Card subtitle                                                            |
 * | `<md-card-content>`   | Primary card content. Intended for blocks of text                        |
 * | `<img md-card-image>` | Card image. Stretches the image to the container width                   |
 * | `<md-card-actions>`   | Container for buttons at the bottom of the card                          |
 * | `<md-card-footer>`    | Section anchored to the bottom of the card                               |
 * 
 * These elements primary serve as pre-styled content containers without any additional APIs. 
 * However, the `align` property on `<md-card-actions>` can be used to position the actions at the 
 * `'start'` or `'end` of the container.  
 * 
 * 
 * &nbsp;
 * ## Card headers
 * In addition to the aforementioned sections, `<md-card-header>` gives the ability to add a rich
 * header to a card. This header can contain:
 * 
 * | Element                | Description                                                             |
 * |------------------------|-------------------------------------------------------------------------|
 * | `<md-card-title>`      | A title within the header                                               |
 * | `<md-card-subtitle>`   | A subtitle within the header                                            |
 * | `<img md-card-avatar>` | An image used as an avatar within the header                            |
 * 
 * 
 * &nbsp;
 * ## Title groups
 * `<md-card-title-group>` can be used to combine a title, subtitle, and image into a single section.
 * This element can contain:
 * * `<md-card-title>`
 * * `<md-card-subtitle>`
 * * One of:
 *     * `<img md-card-sm-image>`
 *     * `<img md-card-md-image>`
 *     * `<img md-card-lg-image>`
 * 
 * &nbsp;
 * ## Accessibility
 * Cards can be used in a wide variety of scenarios and can contain many different types of content.
 * Due to this dynamic nature, the appropriate accessibility treatment depends on how `<md-card>` is
 * used.
 * 
 * &nbsp;
 * ## Group, region, and landmarks
 * There are several ARIA roles that communicate that a portion of the UI represents some semantically
 * meaningful whole. Depending on what the content of the card means to your application,
 * [`role="group"`][0], [`role="region"`][1], or [one of the landmark roles][3] should typically be
 * applied to the `<md-card>` element.
 * 
 * A role is not necessary when the card is used as a purely decorative container that does not
 * convey a meaningful grouping of related content for a single subject. In these cases, the content
 * of the card should follow standard practices for document content.
 * 
 * 
 * &nbsp;
 * ## Focus
 * Depending on how cards are used, it may be appropriate to apply a `tabindex` to the `<md-card>`
 * element. If cards are a primary mechanism through which user interact with the application,
 * `tabindex="0"` is appropriate. If attention can be sent to the card, but it's not part of the
 * document flow, `tabindex="-1"` is appropriate.
 * 
 * If the card acts as a purely decorative container, it does not need to be tabbable. In this case,
 * the card content should follow normal best practices for tab order.
 * 
 * 
 * 
 *  [0]: https://www.w3.org/TR/wai-aria/roles#group
 *  [1]: https://www.w3.org/TR/wai-aria/roles#region
 *  [2]: https://www.w3.org/TR/wai-aria/roles#landmark
 * 
 * 
 * &nbsp;
 * # Directives
 * ## MdCard
 * A basic content container component that adds the styles of a Material design card.
 *
 * While this component can be used alone, it also provides a number of preset styles for common card sections, including:
 * * md-card-title
 * * md-card-subtitle
 * * md-card-content
 * * md-card-actions
 * * md-card-footer
 * 
 * Selector: `md-card`
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
  MdCard,
  MdCardHeader,
  MdCardTitleGroup,
  MdCardContent,
  MdCardTitle,
  MdCardSubtitle,
  MdCardActions,
  MdCardFooter,
  MdCardSmImage,
  MdCardMdImage,
  MdCardLgImage,
  MdCardImage,
  MdCardXlImage,
  MdCardAvatar,
} from './card';


@NgModule({
  imports: [MdCommonModule],
  exports: [
    MdCard,
    MdCardHeader,
    MdCardTitleGroup,
    MdCardContent,
    MdCardTitle,
    MdCardSubtitle,
    MdCardActions,
    MdCardFooter,
    MdCardSmImage,
    MdCardMdImage,
    MdCardLgImage,
    MdCardImage,
    MdCardXlImage,
    MdCardAvatar,
    MdCommonModule,
  ],
  declarations: [
    MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle,
    MdCardActions, MdCardFooter, MdCardSmImage, MdCardMdImage, MdCardLgImage, MdCardImage,
    MdCardXlImage, MdCardAvatar,
  ],
})
export class MdCardModule {}


export * from './card';
