/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {MdRipple} from './ripple';
import {MdCommonModule} from '../common-behaviors/index';
import {VIEWPORT_RULER_PROVIDER} from '../overlay/index';
import {ScrollDispatchModule} from '../overlay/index';
import {PlatformModule} from '@angular/cdk';

export {MdRipple, RippleGlobalOptions, MD_RIPPLE_GLOBAL_OPTIONS} from './ripple';
export {RippleRef, RippleState} from './ripple-ref';
export {RippleConfig, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION} from './ripple-renderer';

@NgModule({
  imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
  exports: [MdRipple, MdCommonModule],
  declarations: [MdRipple],
  providers: [VIEWPORT_RULER_PROVIDER],
})
export class MdRippleModule {}
