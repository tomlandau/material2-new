import {fakeAsync, async, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdSidenav, MdSidenavModule, MdSidenavContainer} from './index';
import {A11yModule} from '@angular/cdk';
import {PlatformModule} from '@angular/cdk';
import {ESCAPE} from '../core/keyboard/keycodes';

function endSidenavTransition(fixture: ComponentFixture<any>) {
  let sidenav: any = fixture.debugElement.query(By.directive(MdSidenav)).componentInstance;
  sidenav._onTransitionEnd(<any> {
    target: (<any>sidenav)._elementRef.nativeElement,
    propertyName: 'transform'
  });
  fixture.detectChanges();
}


describe('MdSidenav', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdSidenavModule, A11yModule, PlatformModule],
      declarations: [
        BasicTestApp,
        SidenavContainerNoSidenavTestApp,
        SidenavSetToOpenedFalse,
        SidenavSetToOpenedTrue,
        SidenavDynamicAlign,
        SidenavWitFocusableElements,
      ],
    });

    TestBed.compileComponents();
  }));

  describe('methods', () => {
    it('should be able to open and close', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);

      let testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      let openButtonElement = fixture.debugElement.query(By.css('.open'));
      openButtonElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      expect(testComponent.openStartCount).toBe(1);
      expect(testComponent.openCount).toBe(0);

      endSidenavTransition(fixture);
      tick();

      expect(testComponent.openStartCount).toBe(1);
      expect(testComponent.openCount).toBe(1);
      expect(testComponent.closeStartCount).toBe(0);
      expect(testComponent.closeCount).toBe(0);

      let sidenavElement = fixture.debugElement.query(By.css('md-sidenav'));
      let sidenavBackdropElement = fixture.debugElement.query(By.css('.mat-sidenav-backdrop'));
      expect(getComputedStyle(sidenavElement.nativeElement).visibility).toEqual('visible');
      expect(getComputedStyle(sidenavBackdropElement.nativeElement).visibility)
        .toEqual('visible');

      // Close it.
      let closeButtonElement = fixture.debugElement.query(By.css('.close'));
      closeButtonElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      expect(testComponent.openStartCount).toBe(1);
      expect(testComponent.openCount).toBe(1);
      expect(testComponent.closeStartCount).toBe(1);
      expect(testComponent.closeCount).toBe(0);

      endSidenavTransition(fixture);
      tick();

      expect(testComponent.openStartCount).toBe(1);
      expect(testComponent.openCount).toBe(1);
      expect(testComponent.closeStartCount).toBe(1);
      expect(testComponent.closeCount).toBe(1);

      expect(getComputedStyle(sidenavElement.nativeElement).visibility).toEqual('hidden');
      expect(getComputedStyle(sidenavBackdropElement.nativeElement).visibility).toEqual('hidden');
    }));

    it('open/close() return a promise that resolves after animation end', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let sidenav: MdSidenav = fixture.debugElement
        .query(By.directive(MdSidenav)).componentInstance;
      let called = false;

      sidenav.open().then(() => {
        called = true;
      });

      expect(called).toBe(false);
      endSidenavTransition(fixture);
      tick();
      expect(called).toBe(true);

      called = false;
      sidenav.close().then(() => {
        called = true;
      });

      expect(called).toBe(false);
      endSidenavTransition(fixture);
      tick();
      expect(called).toBe(true);

    }));

    it('open/close() twice returns the same promise', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let sidenav: MdSidenav = fixture.debugElement
        .query(By.directive(MdSidenav)).componentInstance;

      let promise = sidenav.open();
      expect(sidenav.open()).toBe(promise);
      fixture.detectChanges();
      tick();

      promise = sidenav.close();
      expect(sidenav.close()).toBe(promise);
      tick();
    }));

    it('open() then close() cancel animations when called too fast', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let sidenav: MdSidenav = fixture.debugElement
        .query(By.directive(MdSidenav)).componentInstance;

      sidenav.open().then(openResult => {
        expect(openResult.type).toBe('open');
        expect(openResult.animationFinished).toBe(false);
      });

      // We do not call transition end, close directly.
      sidenav.close().then(closeResult => {
        expect(closeResult.type).toBe('close');
        expect(closeResult.animationFinished).toBe(true);
      });

      endSidenavTransition(fixture);
      tick();
    }));

    it('close() then open() cancel animations when called too fast', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let sidenav: MdSidenav = fixture.debugElement
        .query(By.directive(MdSidenav)).componentInstance;

      // First, open the sidenav completely.
      sidenav.open();
      endSidenavTransition(fixture);
      tick();

      // Then close and check behavior.
      sidenav.close().then(closeResult => {
        expect(closeResult.type).toBe('close');
        expect(closeResult.animationFinished).toBe(false);
      });

      // We do not call transition end, open directly.
      sidenav.open().then(openResult => {
        expect(openResult.type).toBe('open');
        expect(openResult.animationFinished).toBe(true);
      });

      endSidenavTransition(fixture);
      tick();
    }));

    it('does not throw when created without a sidenav', fakeAsync(() => {
      expect(() => {
        let fixture = TestBed.createComponent(BasicTestApp);
        fixture.detectChanges();
        tick();
      }).not.toThrow();
    }));

    it('should emit the backdropClick event when the backdrop is clicked', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);

      let testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      let openButtonElement = fixture.debugElement.query(By.css('.open'));
      openButtonElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      endSidenavTransition(fixture);
      tick();

      expect(testComponent.backdropClickedCount).toBe(0);

      let sidenavBackdropElement = fixture.debugElement.query(By.css('.mat-sidenav-backdrop'));
      sidenavBackdropElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      expect(testComponent.backdropClickedCount).toBe(1);

      endSidenavTransition(fixture);
      tick();

      openButtonElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      endSidenavTransition(fixture);
      tick();

      let closeButtonElement = fixture.debugElement.query(By.css('.close'));
      closeButtonElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      endSidenavTransition(fixture);
      tick();

      expect(testComponent.backdropClickedCount).toBe(1);
    }));

    it('should close when pressing escape', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      let sidenav: MdSidenav = fixture.debugElement
        .query(By.directive(MdSidenav)).componentInstance;

      sidenav.open();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      expect(testComponent.openCount).toBe(1);
      expect(testComponent.closeCount).toBe(0);

      // Simulate pressing the escape key.
      sidenav.handleKeydown({
        keyCode: ESCAPE,
        stopPropagation: () => {}
      } as KeyboardEvent);

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      expect(testComponent.closeCount).toBe(1);
    }));

    it('should not close by pressing escape when disableClose is set', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let sidenav = fixture.debugElement.query(By.directive(MdSidenav)).componentInstance;

      sidenav.disableClose = true;
      sidenav.open();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      sidenav.handleKeydown({
        keyCode: ESCAPE,
        stopPropagation: () => {}
      });

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      expect(testComponent.closeCount).toBe(0);
    }));

    it('should not close by clicking on the backdrop when disableClose is set', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let sidenav = fixture.debugElement.query(By.directive(MdSidenav)).componentInstance;

      sidenav.disableClose = true;
      sidenav.open();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      let backdropEl = fixture.debugElement.query(By.css('.mat-sidenav-backdrop')).nativeElement;
      backdropEl.click();
      fixture.detectChanges();
      tick();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      expect(testComponent.closeCount).toBe(0);
    }));

    it('should restore focus on close if focus is inside sidenav', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let sidenav: MdSidenav = fixture.debugElement
        .query(By.directive(MdSidenav)).componentInstance;
      let openButton = fixture.componentInstance.openButton.nativeElement;
      let sidenavButton = fixture.componentInstance.sidenavButton.nativeElement;

      openButton.focus();
      sidenav.open();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();
      sidenavButton.focus();

      sidenav.close();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      expect(document.activeElement)
          .toBe(openButton, 'Expected focus to be restored to the open button on close.');
    }));

    it('should not restore focus on close if focus is outside sidenav', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let sidenav: MdSidenav = fixture.debugElement
          .query(By.directive(MdSidenav)).componentInstance;
      let openButton = fixture.componentInstance.openButton.nativeElement;
      let closeButton = fixture.componentInstance.closeButton.nativeElement;

      openButton.focus();
      sidenav.open();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();
      closeButton.focus();

      sidenav.close();

      fixture.detectChanges();
      endSidenavTransition(fixture);
      tick();

      expect(document.activeElement)
          .toBe(closeButton, 'Expected focus not to be restored to the open button on close.');
    }));
  });

  describe('attributes', () => {
    it('should correctly parse opened="false"', () => {
      let fixture = TestBed.createComponent(SidenavSetToOpenedFalse);
      fixture.detectChanges();

      let sidenavEl = fixture.debugElement.query(By.css('md-sidenav')).nativeElement;

      expect(sidenavEl.classList).toContain('mat-sidenav-closed');
      expect(sidenavEl.classList).not.toContain('mat-sidenav-opened');
    });

    it('should correctly parse opened="true"', () => {
      let fixture = TestBed.createComponent(SidenavSetToOpenedTrue);
      fixture.detectChanges();
      endSidenavTransition(fixture);

      let sidenavEl = fixture.debugElement.query(By.css('md-sidenav')).nativeElement;
      let testComponent = fixture.debugElement.query(By.css('md-sidenav')).componentInstance;

      expect(sidenavEl.classList).not.toContain('mat-sidenav-closed');
      expect(sidenavEl.classList).toContain('mat-sidenav-opened');

      expect((testComponent as any)._toggleAnimationPromise).toBeNull();
    });

    it('should remove align attr from DOM', () => {
      const fixture = TestBed.createComponent(BasicTestApp);
      fixture.detectChanges();

      const sidenavEl = fixture.debugElement.query(By.css('md-sidenav')).nativeElement;
      expect(sidenavEl.hasAttribute('align'))
          .toBe(false, 'Expected sidenav not to have a native align attribute.');
    });

    it('should throw when multiple sidenavs have the same align', () => {
      const fixture = TestBed.createComponent(SidenavDynamicAlign);
      fixture.detectChanges();

      const testComponent: SidenavDynamicAlign = fixture.debugElement.componentInstance;
      testComponent.sidenav1Align = 'end';

      expect(() => fixture.detectChanges()).toThrow();
    });

    it('should not throw when sidenavs swap sides', () => {
      const fixture = TestBed.createComponent(SidenavDynamicAlign);
      fixture.detectChanges();

      const testComponent: SidenavDynamicAlign = fixture.debugElement.componentInstance;
      testComponent.sidenav1Align = 'end';
      testComponent.sidenav2Align = 'start';

      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('focus trapping behavior', () => {
    let fixture: ComponentFixture<SidenavWitFocusableElements>;
    let testComponent: SidenavWitFocusableElements;
    let sidenav: MdSidenav;
    let firstFocusableElement: HTMLElement;
    let lastFocusableElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SidenavWitFocusableElements);
      testComponent = fixture.debugElement.componentInstance;
      sidenav = fixture.debugElement.query(By.directive(MdSidenav)).componentInstance;
      firstFocusableElement = fixture.debugElement.query(By.css('.link1')).nativeElement;
      lastFocusableElement = fixture.debugElement.query(By.css('.link1')).nativeElement;
      lastFocusableElement.focus();
    });

    it('should trap focus when opened in "over" mode', fakeAsync(() => {
      testComponent.mode = 'over';
      lastFocusableElement.focus();

      sidenav.open();
      endSidenavTransition(fixture);
      tick();

      expect(document.activeElement).toBe(firstFocusableElement);
    }));

    it('should trap focus when opened in "push" mode', fakeAsync(() => {
      testComponent.mode = 'push';
      lastFocusableElement.focus();

      sidenav.open();
      endSidenavTransition(fixture);
      tick();

      expect(document.activeElement).toBe(firstFocusableElement);
    }));

    it('should not trap focus when opened in "side" mode', fakeAsync(() => {
      testComponent.mode = 'side';
      lastFocusableElement.focus();

      sidenav.open();
      endSidenavTransition(fixture);
      tick();

      expect(document.activeElement).toBe(lastFocusableElement);
    }));
  });
});

describe('MdSidenavContainer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdSidenavModule, A11yModule, PlatformModule],
      declarations: [
        SidenavContainerTwoSidenavTestApp
      ],
    });

    TestBed.compileComponents();
  }));

  describe('methods', () => {
    it('should be able to open and close', async(() => {
      const fixture = TestBed.createComponent(SidenavContainerTwoSidenavTestApp);

      fixture.detectChanges();

      const testComponent: SidenavContainerTwoSidenavTestApp =
        fixture.debugElement.componentInstance;
      const sidenavs = fixture.debugElement.queryAll(By.directive(MdSidenav));

      expect(sidenavs.every(sidenav => sidenav.componentInstance.opened)).toBeFalsy();

      return testComponent.sidenavContainer.open()
        .then(() => {
          expect(sidenavs.every(sidenav => sidenav.componentInstance.opened)).toBeTruthy();

          return testComponent.sidenavContainer.close();
        })
        .then(() => {
          expect(sidenavs.every(sidenav => sidenav.componentInstance.opened)).toBeTruthy();
        });
    }));
  });
});


/** Test component that contains an MdSidenavContainer but no MdSidenav. */
@Component({template: `<md-sidenav-container></md-sidenav-container>`})
class SidenavContainerNoSidenavTestApp { }

/** Test component that contains an MdSidenavContainer and 2 MdSidenav on the same side. */
@Component({
  template: `
    <md-sidenav-container>
      <md-sidenav align="start"> </md-sidenav>
      <md-sidenav align="end"> </md-sidenav>
    </md-sidenav-container>`,
})
class SidenavContainerTwoSidenavTestApp {
  @ViewChild(MdSidenavContainer)
  sidenavContainer: MdSidenavContainer;
}

/** Test component that contains an MdSidenavContainer and one MdSidenav. */
@Component({
  template: `
    <md-sidenav-container (backdropClick)="backdropClicked()">
      <md-sidenav #sidenav align="start"
                  (open-start)="openStart()"
                  (open)="open()"
                  (close-start)="closeStart()"
                  (close)="close()">
        <button #sidenavButton>Content.</button>
      </md-sidenav>
      <button (click)="sidenav.open()" class="open" #openButton></button>
      <button (click)="sidenav.close()" class="close" #closeButton></button>
    </md-sidenav-container>`,
})
class BasicTestApp {
  openStartCount: number = 0;
  openCount: number = 0;
  closeStartCount: number = 0;
  closeCount: number = 0;
  backdropClickedCount: number = 0;

  @ViewChild('sidenavButton') sidenavButton: ElementRef;
  @ViewChild('openButton') openButton: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;

  openStart() {
    this.openStartCount++;
  }

  open() {
    this.openCount++;
  }

  closeStart() {
    this.closeStartCount++;
  }

  close() {
    this.closeCount++;
  }

  backdropClicked() {
    this.backdropClickedCount++;
  }
}

@Component({
  template: `
    <md-sidenav-container>
      <md-sidenav #sidenav mode="side" opened="false">
        Closed Sidenav.
      </md-sidenav>
    </md-sidenav-container>`,
})
class SidenavSetToOpenedFalse { }

@Component({
  template: `
    <md-sidenav-container>
      <md-sidenav #sidenav mode="side" opened="true">
        Closed Sidenav.
      </md-sidenav>
    </md-sidenav-container>`,
})
class SidenavSetToOpenedTrue { }

@Component({
  template: `
    <md-sidenav-container>
      <md-sidenav #sidenav1 [align]="sidenav1Align"></md-sidenav>
      <md-sidenav #sidenav2 [align]="sidenav2Align"></md-sidenav>
    </md-sidenav-container>`,
})
class SidenavDynamicAlign {
  sidenav1Align = 'start';
  sidenav2Align = 'end';
}

@Component({
  template: `
    <md-sidenav-container>
      <md-sidenav align="start" [mode]="mode">
        <a class="link1" href="#">link1</a>
      </md-sidenav>
      <a class="link2" href="#">link2</a>
    </md-sidenav-container>`,
})
class SidenavWitFocusableElements {
  mode: string = 'over';
}
