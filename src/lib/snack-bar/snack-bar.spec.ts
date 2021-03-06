import {
  inject,
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick
} from '@angular/core/testing';
import {NgModule, Component, Directive, ViewChild, ViewContainerRef, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '../core/overlay/index';
import {LiveAnnouncer} from '@angular/cdk';
import {
  MdSnackBarModule,
  MdSnackBar,
  MdSnackBarConfig,
  MdSnackBarRef,
  SimpleSnackBar,
  MD_SNACK_BAR_DATA,
} from './index';


// TODO(josephperrott): Update tests to mock waiting for time to complete for animations.

describe('MdSnackBar', () => {
  let snackBar: MdSnackBar;
  let liveAnnouncer: LiveAnnouncer;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  let simpleMessage = 'Burritos are here!';
  let simpleActionLabel = 'pickup';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdSnackBarModule, SnackBarTestModule, NoopAnimationsModule],
      providers: [
        {provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return {getContainerElement: () => overlayContainerElement};
        }}
      ],
    });
    TestBed.compileComponents();
  }));

  beforeEach(inject([MdSnackBar, LiveAnnouncer], (sb: MdSnackBar, la: LiveAnnouncer) => {
    snackBar = sb;
    liveAnnouncer = la;
  }));

  afterEach(() => {
    overlayContainerElement.innerHTML = '';
    liveAnnouncer.ngOnDestroy();
  });

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });

  it('should have the role of alert', () => {
    let config = {viewContainerRef: testViewContainerRef};
    snackBar.open(simpleMessage, simpleActionLabel, config);

    let containerElement = overlayContainerElement.querySelector('snack-bar-container')!;
    expect(containerElement.getAttribute('role'))
        .toBe('alert', 'Expected snack bar container to have role="alert"');
   });

   it('should open and close a snackbar without a ViewContainerRef', async(() => {
     let snackBarRef = snackBar.open('Snack time!', 'Chew');
     viewContainerFixture.detectChanges();

     let messageElement = overlayContainerElement.querySelector('snack-bar-container')!;
     expect(messageElement.textContent).toContain('Snack time!',
         'Expected snack bar to show a message without a ViewContainerRef');

     snackBarRef.dismiss();
     viewContainerFixture.detectChanges();

     viewContainerFixture.whenStable().then(() => {
       expect(overlayContainerElement.childNodes.length)
          .toBe(0, 'Expected snack bar to be dismissed without a ViewContainerRef');
     });
   }));

  it('should open a simple message with a button', () => {
    let config = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, simpleActionLabel, config);

    viewContainerFixture.detectChanges();

    expect(snackBarRef.instance instanceof SimpleSnackBar)
      .toBe(true, 'Expected the snack bar content component to be SimpleSnackBar');
    expect(snackBarRef.instance.snackBarRef)
      .toBe(snackBarRef, 'Expected the snack bar reference to be placed in the component instance');

    let messageElement = overlayContainerElement.querySelector('snack-bar-container')!;
    expect(messageElement.textContent)
        .toContain(simpleMessage, `Expected the snack bar message to be '${simpleMessage}'`);

    let buttonElement = overlayContainerElement.querySelector('button.mat-simple-snackbar-action')!;
    expect(buttonElement.tagName)
        .toBe('BUTTON', 'Expected snack bar action label to be a <button>');
    expect(buttonElement.textContent)
        .toBe(simpleActionLabel,
              `Expected the snack bar action label to be '${simpleActionLabel}'`);
  });

  it('should open a simple message with no button', () => {
    let config = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, undefined, config);

    viewContainerFixture.detectChanges();

    expect(snackBarRef.instance instanceof SimpleSnackBar)
      .toBe(true, 'Expected the snack bar content component to be SimpleSnackBar');
    expect(snackBarRef.instance.snackBarRef)
      .toBe(snackBarRef, 'Expected the snack bar reference to be placed in the component instance');

    let messageElement = overlayContainerElement.querySelector('snack-bar-container')!;
    expect(messageElement.textContent)
        .toContain(simpleMessage, `Expected the snack bar message to be '${simpleMessage}'`);
    expect(overlayContainerElement.querySelector('button.mat-simple-snackbar-action'))
        .toBeNull('Expected the query selection for action label to be null');
  });

  it('should dismiss the snack bar and remove itself from the view', async(() => {
    let config = {viewContainerRef: testViewContainerRef};
    let dismissObservableCompleted = false;

    let snackBarRef = snackBar.open(simpleMessage, undefined, config);
    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.childElementCount)
        .toBeGreaterThan(0, 'Expected overlay container element to have at least one child');

    snackBarRef.afterDismissed().subscribe(undefined, undefined, () => {
      dismissObservableCompleted = true;
    });

    snackBarRef.dismiss();
    viewContainerFixture.detectChanges();  // Run through animations for dismissal

    viewContainerFixture.whenStable().then(() => {
      expect(dismissObservableCompleted).toBeTruthy('Expected the snack bar to be dismissed');
      expect(overlayContainerElement.childElementCount)
          .toBe(0, 'Expected the overlay container element to have no child elements');
    });
  }));

  it('should be able to get dismissed through the service', async(() => {
    snackBar.open(simpleMessage);
    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

    snackBar.dismiss();
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      expect(overlayContainerElement.childElementCount).toBe(0);
    });
  }));

  it('should clean itself up when the view container gets destroyed', async(() => {
    snackBar.open(simpleMessage, undefined, { viewContainerRef: testViewContainerRef });
    viewContainerFixture.detectChanges();
    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

    viewContainerFixture.componentInstance.childComponentExists = false;
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      expect(overlayContainerElement.childElementCount)
          .toBe(0, 'Expected snack bar to be removed after the view container was destroyed');
    });
  }));

  it('should set the animation state to visible on entry', () => {
    let config = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, undefined, config);

    viewContainerFixture.detectChanges();
    expect(snackBarRef.containerInstance.animationState)
        .toBe('visible', `Expected the animation state would be 'visible'.`);
  });

  it('should set the animation state to complete on exit', () => {
    let config = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, undefined, config);
    snackBarRef.dismiss();

    viewContainerFixture.detectChanges();
    expect(snackBarRef.containerInstance.animationState)
        .toBe('complete', `Expected the animation state would be 'complete'.`);
  });

  it(`should set the old snack bar animation state to complete and the new snack bar animation
      state to visible on entry of new snack bar`, async(() => {
    let config = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, undefined, config);
    let dismissObservableCompleted = false;

    viewContainerFixture.detectChanges();
    expect(snackBarRef.containerInstance.animationState)
        .toBe('visible', `Expected the animation state would be 'visible'.`);

    let config2 = {viewContainerRef: testViewContainerRef};
    let snackBarRef2 = snackBar.open(simpleMessage, undefined, config2);

    viewContainerFixture.detectChanges();
    snackBarRef.afterDismissed().subscribe(undefined, undefined, () => {
      dismissObservableCompleted = true;
    });

    viewContainerFixture.whenStable().then(() => {
      expect(dismissObservableCompleted).toBe(true);
      expect(snackBarRef.containerInstance.animationState)
          .toBe('complete', `Expected the animation state would be 'complete'.`);
      expect(snackBarRef2.containerInstance.animationState)
          .toBe('visible', `Expected the animation state would be 'visible'.`);
    });
  }));

  it('should open a new snackbar after dismissing a previous snackbar', async(() => {
    let config = {viewContainerRef: testViewContainerRef};
    let snackBarRef = snackBar.open(simpleMessage, 'Dismiss', config);
    viewContainerFixture.detectChanges();

    snackBarRef.dismiss();
    viewContainerFixture.detectChanges();

    // Wait for the snackbar dismiss animation to finish.
    viewContainerFixture.whenStable().then(() => {
      snackBarRef = snackBar.open('Second snackbar', 'Dismiss', config);
      viewContainerFixture.detectChanges();

      // Wait for the snackbar open animation to finish.
      viewContainerFixture.whenStable().then(() => {
        expect(snackBarRef.containerInstance.animationState).toBe('visible');
      });
    });
  }));

  it('should remove past snackbars when opening new snackbars', async(() => {
    snackBar.open('First snackbar');
    viewContainerFixture.detectChanges();

    snackBar.open('Second snackbar');
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      snackBar.open('Third snackbar');
      viewContainerFixture.detectChanges();

      viewContainerFixture.whenStable().then(() => {
        expect(overlayContainerElement.textContent!.trim()).toBe('Third snackbar');
      });
    });
  }));

  it('should remove snackbar if another is shown while its still animating open', fakeAsync(() => {
    snackBar.open('First snackbar');
    viewContainerFixture.detectChanges();

    snackBar.open('Second snackbar');
    viewContainerFixture.detectChanges();

    // Flush microtasks to make observables run, but don't tick such that any animations would run.
    flushMicrotasks();
    expect(overlayContainerElement.textContent!.trim()).toBe('Second snackbar');

    // Let remaining animations run.
    tick(500);
  }));

  it('should dismiss the snackbar when the action is called, notifying of both action and dismiss',
     fakeAsync(() => {
       let dismissObservableCompleted = false;
       let actionObservableCompleted = false;
       let snackBarRef = snackBar.open('Some content', 'Dismiss');
       viewContainerFixture.detectChanges();

       snackBarRef.afterDismissed().subscribe(undefined, undefined, () => {
         dismissObservableCompleted = true;
       });
       snackBarRef.onAction().subscribe(undefined, undefined, () => {
         actionObservableCompleted = true;
      });

      let actionButton =
        overlayContainerElement.querySelector('.mat-simple-snackbar-action') as HTMLButtonElement;
      actionButton.click();
      viewContainerFixture.detectChanges();
      flushMicrotasks();

      expect(dismissObservableCompleted).toBeTruthy('Expected the snack bar to be dismissed');
      expect(actionObservableCompleted).toBeTruthy('Expected the snack bar to notify of action');

      tick(500);
    }));

  it('should dismiss automatically after a specified timeout', fakeAsync(() => {
    let dismissObservableCompleted = false;
    let config = new MdSnackBarConfig();
    config.duration = 250;
    let snackBarRef = snackBar.open('content', 'test', config);
    snackBarRef.afterDismissed().subscribe(() => {
      dismissObservableCompleted = true;
    });

    viewContainerFixture.detectChanges();
    flushMicrotasks();
    expect(dismissObservableCompleted).toBeFalsy('Expected the snack bar not to be dismissed');

    tick(1000);
    viewContainerFixture.detectChanges();
    flushMicrotasks();
    expect(dismissObservableCompleted).toBeTruthy('Expected the snack bar to be dismissed');
  }));

  it('should clear the dismiss timeout when dismissed before timeout expiration', fakeAsync(() => {
    let config = new MdSnackBarConfig();
    config.duration = 1000;
    snackBar.open('content', 'test', config);

    setTimeout(() => snackBar.dismiss(), 500);

    tick(600);
    viewContainerFixture.detectChanges();
    flushMicrotasks();

    expect(viewContainerFixture.isStable()).toBe(true);
  }));

  it('should add extra classes to the container', () => {
    snackBar.open(simpleMessage, simpleActionLabel, { extraClasses: ['one', 'two'] });
    viewContainerFixture.detectChanges();

    let containerClasses = overlayContainerElement.querySelector('snack-bar-container')!.classList;

    expect(containerClasses).toContain('one');
    expect(containerClasses).toContain('two');
  });

  it('should set the layout direction', () => {
    snackBar.open(simpleMessage, simpleActionLabel, { direction: 'rtl' });
    viewContainerFixture.detectChanges();

    let pane = overlayContainerElement.querySelector('.cdk-overlay-pane')!;

    expect(pane.getAttribute('dir')).toBe('rtl', 'Expected the pane to be in RTL mode.');
  });

  describe('with custom component', () => {
    it('should open a custom component', () => {
      const snackBarRef = snackBar.openFromComponent(BurritosNotification);

      expect(snackBarRef.instance instanceof BurritosNotification)
        .toBe(true, 'Expected the snack bar content component to be BurritosNotification');
      expect(overlayContainerElement.textContent!.trim())
          .toBe('Burritos are on the way.', 'Expected component to have the proper text.');
    });

    it('should inject the snack bar reference into the component', () => {
      const snackBarRef = snackBar.openFromComponent(BurritosNotification);

      expect(snackBarRef.instance.snackBarRef)
        .toBe(snackBarRef, 'Expected component to have an injected snack bar reference.');
    });

    it('should be able to inject arbitrary user data', () => {
      const snackBarRef = snackBar.openFromComponent(BurritosNotification, {
        data: {
          burritoType: 'Chimichanga'
        }
      });

      expect(snackBarRef.instance.data).toBeTruthy('Expected component to have a data object.');
      expect(snackBarRef.instance.data.burritoType)
        .toBe('Chimichanga', 'Expected the injected data object to be the one the user provided.');
    });

  });

});

describe('MdSnackBar with parent MdSnackBar', () => {
  let parentSnackBar: MdSnackBar;
  let childSnackBar: MdSnackBar;
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<ComponentThatProvidesMdSnackBar>;
  let liveAnnouncer: LiveAnnouncer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdSnackBarModule, SnackBarTestModule, NoopAnimationsModule],
      declarations: [ComponentThatProvidesMdSnackBar],
      providers: [
        {provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return {getContainerElement: () => overlayContainerElement};
        }}
      ],
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([MdSnackBar, LiveAnnouncer], (sb: MdSnackBar, la: LiveAnnouncer) => {
    parentSnackBar = sb;
    liveAnnouncer = la;

    fixture = TestBed.createComponent(ComponentThatProvidesMdSnackBar);
    childSnackBar = fixture.componentInstance.snackBar;
    fixture.detectChanges();
  }));

  afterEach(() => {
    overlayContainerElement.innerHTML = '';
    liveAnnouncer.ngOnDestroy();
  });

  it('should close snackBars opened by parent when opening from child MdSnackBar', fakeAsync(() => {
    parentSnackBar.open('Pizza');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Pizza', 'Expected a snackBar to be opened');

    childSnackBar.open('Taco');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Taco', 'Expected parent snackbar msg to be dismissed by opening from child');
  }));

  it('should close snackBars opened by child when opening from parent MdSnackBar', fakeAsync(() => {
    childSnackBar.open('Pizza');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Pizza', 'Expected a snackBar to be opened');

    parentSnackBar.open('Taco');
    fixture.detectChanges();
    tick(1000);

    expect(overlayContainerElement.textContent)
        .toContain('Taco', 'Expected child snackbar msg to be dismissed by opening from parent');
  }));
});

@Directive({selector: 'dir-with-view-container'})
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container *ngIf="childComponentExists"></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

  childComponentExists: boolean = true;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

/* Simple component for testing ComponentPortal. */
@Component({template: '<p>Burritos are on the way.</p>'})
class BurritosNotification {
  constructor(
    public snackBarRef: MdSnackBarRef<BurritosNotification>,
    @Inject(MD_SNACK_BAR_DATA) public data: any) { }
}


@Component({
  template: '',
  providers: [MdSnackBar]
})
class ComponentThatProvidesMdSnackBar {
  constructor(public snackBar: MdSnackBar) {}
}


/* Simple component to open snack bars from.
 * Create a real (non-test) NgModule as a workaround forRoot
 * https://github.com/angular/angular/issues/10760
 */
const TEST_DIRECTIVES = [ComponentWithChildViewContainer,
                         BurritosNotification,
                         DirectiveWithViewContainer];
@NgModule({
  imports: [CommonModule, MdSnackBarModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [ComponentWithChildViewContainer, BurritosNotification],
})
class SnackBarTestModule { }
