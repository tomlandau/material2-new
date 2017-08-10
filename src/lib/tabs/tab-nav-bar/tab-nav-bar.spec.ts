import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MdTabsModule} from '../index';
import {MdTabNav} from './tab-nav-bar';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FakeViewportRuler, ViewportRuler} from '../../core/overlay/index';
import {dispatchFakeEvent, dispatchMouseEvent} from '@angular/cdk/testing';
import {Direction, Directionality} from '@angular/cdk';
import {Subject} from 'rxjs/Subject';


describe('MdTabNavBar', () => {
  let dir: Direction = 'ltr';
  let dirChange = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule],
      declarations: [
        SimpleTabNavBarTestApp,
        TabLinkWithNgIf,
      ],
      providers: [
        {provide: Directionality, useFactory: () => ({
          value: dir,
          change: dirChange.asObservable()
        })},
        {provide: ViewportRuler, useClass: FakeViewportRuler},
      ]
    });

    TestBed.compileComponents();
  }));

  describe('basic behavior', () => {
    let fixture: ComponentFixture<SimpleTabNavBarTestApp>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabNavBarTestApp);
      fixture.detectChanges();
    });

    it('should change active index on click', () => {
      // select the second link
      let tabLink = fixture.debugElement.queryAll(By.css('a'))[1];
      tabLink.nativeElement.click();
      expect(fixture.componentInstance.activeIndex).toBe(1);

      // select the third link
      tabLink = fixture.debugElement.queryAll(By.css('a'))[2];
      tabLink.nativeElement.click();
      expect(fixture.componentInstance.activeIndex).toBe(2);
    });

    it('should add the disabled class if disabled', () => {
      const tabLinkElements = fixture.debugElement.queryAll(By.css('a'))
        .map(tabLinkDebugEl => tabLinkDebugEl.nativeElement);

      expect(tabLinkElements.every(tabLinkEl => !tabLinkEl.classList.contains('mat-tab-disabled')))
        .toBe(true, 'Expected every tab link to not have the disabled class initially');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(tabLinkElements.every(tabLinkEl => tabLinkEl.classList.contains('mat-tab-disabled')))
        .toBe(true, 'Expected every tab link to have the disabled class if set through binding');
    });

    it('should update aria-disabled if disabled', () => {
      const tabLinkElements = fixture.debugElement.queryAll(By.css('a'))
        .map(tabLinkDebugEl => tabLinkDebugEl.nativeElement);

      expect(tabLinkElements.every(tabLink => tabLink.getAttribute('aria-disabled') === 'false'))
        .toBe(true, 'Expected aria-disabled to be set to "false" by default.');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(tabLinkElements.every(tabLink => tabLink.getAttribute('aria-disabled') === 'true'))
        .toBe(true, 'Expected aria-disabled to be set to "true" if link is disabled.');
    });

    it('should update the tabindex if links are disabled', () => {
      const tabLinkElements = fixture.debugElement.queryAll(By.css('a'))
        .map(tabLinkDebugEl => tabLinkDebugEl.nativeElement);

      expect(tabLinkElements.every(tabLink => tabLink.tabIndex === 0))
        .toBe(true, 'Expected element to be keyboard focusable by default');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(tabLinkElements.every(tabLink => tabLink.tabIndex === -1))
        .toBe(true, 'Expected element to no longer be keyboard focusable if disabled.');
    });

    it('should show ripples for tab links', () => {
      const tabLink = fixture.debugElement.nativeElement.querySelector('.mat-tab-link');

      dispatchMouseEvent(tabLink, 'mousedown');
      dispatchMouseEvent(tabLink, 'mouseup');

      expect(tabLink.querySelectorAll('.mat-ripple-element').length)
        .toBe(1, 'Expected one ripple to show up if user clicks on tab link.');
    });

    it('should re-align the ink bar when the direction changes', () => {
      const inkBar = fixture.componentInstance.tabNavBar._inkBar;

      spyOn(inkBar, 'alignToElement');

      dirChange.next();
      fixture.detectChanges();

      expect(inkBar.alignToElement).toHaveBeenCalled();
    });

    it('should re-align the ink bar when the tabs list change', () => {
      const inkBar = fixture.componentInstance.tabNavBar._inkBar;

      spyOn(inkBar, 'alignToElement');

      fixture.componentInstance.tabs = [1, 2, 3, 4];
      fixture.detectChanges();

      expect(inkBar.alignToElement).toHaveBeenCalled();
    });

    it('should re-align the ink bar when the tab labels change the width', done => {
      const inkBar = fixture.componentInstance.tabNavBar._inkBar;

      const spy = spyOn(inkBar, 'alignToElement').and.callFake(() => {
        expect(spy.calls.any()).toBe(true);
        done();
      });

      fixture.componentInstance.label = 'label change';
      fixture.detectChanges();

      expect(spy.calls.any()).toBe(false);
    });

    it('should re-align the ink bar when the window is resized', fakeAsync(() => {
      const inkBar = fixture.componentInstance.tabNavBar._inkBar;

      spyOn(inkBar, 'alignToElement');

      dispatchFakeEvent(window, 'resize');
      tick(10);
      fixture.detectChanges();

      expect(inkBar.alignToElement).toHaveBeenCalled();
    }));
  });

  it('should clean up the ripple event handlers on destroy', () => {
    let fixture: ComponentFixture<TabLinkWithNgIf> = TestBed.createComponent(TabLinkWithNgIf);
    fixture.detectChanges();

    let link = fixture.debugElement.nativeElement.querySelector('.mat-tab-link');

    fixture.componentInstance.isDestroyed = true;
    fixture.detectChanges();

    dispatchMouseEvent(link, 'mousedown');

    expect(link.querySelector('.mat-ripple-element'))
      .toBeFalsy('Expected no ripple to be created when ripple target is destroyed.');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <nav md-tab-nav-bar>
      <a md-tab-link
         *ngFor="let tab of tabs; let index = index"
         [active]="activeIndex === index"
         [disabled]="disabled"
         (click)="activeIndex = index">
        Tab link {{label}}
      </a>
    </nav>
  `
})
class SimpleTabNavBarTestApp {
  @ViewChild(MdTabNav) tabNavBar: MdTabNav;

  label = '';
  disabled: boolean = false;
  tabs = [0, 1, 2];

  activeIndex = 0;
}

@Component({
  template: `
    <nav md-tab-nav-bar>
      <a md-tab-link *ngIf="!isDestroyed">Link</a>
    </nav>
  `
})
class TabLinkWithNgIf {
  isDestroyed = false;
}
