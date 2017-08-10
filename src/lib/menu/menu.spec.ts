import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  ESCAPE,
  RIGHT_ARROW,
  LEFT_ARROW,
} from '../core/keyboard/keycodes';
import {OverlayContainer} from '../core/overlay/index';
import {
  Directionality,
  Direction
} from '@angular/cdk';
import {
  MdMenuModule,
  MdMenuTrigger,
  MdMenuPanel,
  MenuPositionX,
  MenuPositionY,
  MdMenu,
} from './index';
import {MENU_PANEL_TOP_PADDING} from './menu-trigger';
import {extendObject} from '../core/util/object-extend';
import {dispatchKeyboardEvent, dispatchMouseEvent} from '@angular/cdk/testing';


describe('MdMenu', () => {
  let overlayContainerElement: HTMLElement;
  let dir: Direction;

  beforeEach(async(() => {
    dir = 'ltr';
    TestBed.configureTestingModule({
      imports: [MdMenuModule, NoopAnimationsModule],
      declarations: [
        SimpleMenu,
        PositionedMenu,
        OverlapMenu,
        CustomMenuPanel,
        CustomMenu,
        NestedMenu
      ],
      providers: [
        {provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          overlayContainerElement.classList.add('cdk-overlay-container');
          document.body.appendChild(overlayContainerElement);

          // remove body padding to keep consistent cross-browser
          document.body.style.padding = '0';
          document.body.style.margin = '0';
          return {getContainerElement: () => overlayContainerElement};
        }},
        {provide: Directionality, useFactory: () => ({value: dir})}
      ]
    });

    TestBed.compileComponents();
  }));

  afterEach(() => {
    document.body.removeChild(overlayContainerElement);
  });

  it('should open the menu as an idempotent operation', () => {
    const fixture = TestBed.createComponent(SimpleMenu);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      fixture.componentInstance.trigger.openMenu();
      fixture.componentInstance.trigger.openMenu();

      expect(overlayContainerElement.textContent).toContain('Item');
      expect(overlayContainerElement.textContent).toContain('Disabled');
    }).not.toThrowError();
  });

  it('should close the menu when a click occurs outside the menu', () => {
    const fixture = TestBed.createComponent(SimpleMenu);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();

    const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
    backdrop.click();
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toBe('');
  });

  it('should close the menu when pressing escape', () => {
    const fixture = TestBed.createComponent(SimpleMenu);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();

    const panel = overlayContainerElement.querySelector('.mat-menu-panel')!;
    dispatchKeyboardEvent(panel, 'keydown', ESCAPE);
    fixture.detectChanges();

    expect(overlayContainerElement.textContent).toBe('');
  });

  it('should open a custom menu', () => {
    const fixture = TestBed.createComponent(CustomMenu);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      fixture.componentInstance.trigger.openMenu();
      fixture.componentInstance.trigger.openMenu();

      expect(overlayContainerElement.textContent).toContain('Custom Menu header');
      expect(overlayContainerElement.textContent).toContain('Custom Content');
    }).not.toThrowError();
  });

  it('should set the panel direction based on the trigger direction', () => {
    dir = 'rtl';
    const fixture = TestBed.createComponent(SimpleMenu);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();

    const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane')!;
    expect(overlayPane.getAttribute('dir')).toEqual('rtl');
  });

  it('should transfer any custom classes from the host to the overlay', () => {
    const fixture = TestBed.createComponent(SimpleMenu);

    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();

    const menuEl = fixture.debugElement.query(By.css('md-menu')).nativeElement;
    const panel = overlayContainerElement.querySelector('.mat-menu-panel')!;

    expect(menuEl.classList).not.toContain('custom-one');
    expect(menuEl.classList).not.toContain('custom-two');

    expect(panel.classList).toContain('custom-one');
    expect(panel.classList).toContain('custom-two');
  });

  it('should set the "menu" role on the overlay panel', () => {
    const fixture = TestBed.createComponent(SimpleMenu);
    fixture.detectChanges();
    fixture.componentInstance.trigger.openMenu();
    fixture.detectChanges();

    const menuPanel = overlayContainerElement.querySelector('.mat-menu-panel');

    expect(menuPanel).toBeTruthy('Expected to find a menu panel.');

    const role = menuPanel ? menuPanel.getAttribute('role') : '';
    expect(role).toBe('menu', 'Expected panel to have the "menu" role.');
  });

  it('should not throw an error on destroy', () => {
    const fixture = TestBed.createComponent(SimpleMenu);
    expect(fixture.destroy.bind(fixture)).not.toThrow();
  });

  describe('positions', () => {
    let fixture: ComponentFixture<PositionedMenu>;
    let panel: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(PositionedMenu);
      fixture.detectChanges();

      const trigger = fixture.componentInstance.triggerEl.nativeElement;

      // Push trigger to the bottom edge of viewport,so it has space to open "above"
      trigger.style.position = 'fixed';
      trigger.style.top = '600px';

      // Push trigger to the right, so it has space to open "before"
      trigger.style.left = '100px';

      fixture.componentInstance.trigger.openMenu();
      fixture.detectChanges();
      panel = overlayContainerElement.querySelector('.mat-menu-panel') as HTMLElement;
    });

    it('should append mat-menu-before if the x position is changed', () => {
      expect(panel.classList).toContain('mat-menu-before');
      expect(panel.classList).not.toContain('mat-menu-after');

      fixture.componentInstance.xPosition = 'after';
      fixture.detectChanges();

      expect(panel.classList).toContain('mat-menu-after');
      expect(panel.classList).not.toContain('mat-menu-before');
    });

    it('should append mat-menu-above if the y position is changed', () => {
      expect(panel.classList).toContain('mat-menu-above');
      expect(panel.classList).not.toContain('mat-menu-below');

      fixture.componentInstance.yPosition = 'below';
      fixture.detectChanges();

      expect(panel.classList).toContain('mat-menu-below');
      expect(panel.classList).not.toContain('mat-menu-above');
    });

    it('should default to the "below" and "after" positions', () => {
      fixture.destroy();

      let newFixture = TestBed.createComponent(SimpleMenu);

      newFixture.detectChanges();
      newFixture.componentInstance.trigger.openMenu();
      newFixture.detectChanges();
      panel = overlayContainerElement.querySelector('.mat-menu-panel') as HTMLElement;

      expect(panel.classList).toContain('mat-menu-below');
      expect(panel.classList).toContain('mat-menu-after');
    });

  });

  describe('fallback positions', () => {

    it('should fall back to "before" mode if "after" mode would not fit on screen', () => {
      const fixture = TestBed.createComponent(SimpleMenu);
      fixture.detectChanges();
      const trigger = fixture.componentInstance.triggerEl.nativeElement;

      // Push trigger to the right side of viewport, so it doesn't have space to open
      // in its default "after" position on the right side.
      trigger.style.position = 'fixed';
      trigger.style.right = '-50px';
      trigger.style.top = '200px';

      fixture.componentInstance.trigger.openMenu();
      fixture.detectChanges();
      const overlayPane = getOverlayPane();
      const triggerRect = trigger.getBoundingClientRect();
      const overlayRect = overlayPane.getBoundingClientRect();

      // In "before" position, the right sides of the overlay and the origin are aligned.
      // To find the overlay left, subtract the menu width from the origin's right side.
      const expectedLeft = triggerRect.right - overlayRect.width;
      expect(Math.floor(overlayRect.left))
          .toBe(Math.floor(expectedLeft),
              `Expected menu to open in "before" position if "after" position wouldn't fit.`);

      // The y-position of the overlay should be unaffected, as it can already fit vertically
      expect(Math.floor(overlayRect.top))
          .toBe(Math.floor(triggerRect.top),
              `Expected menu top position to be unchanged if it can fit in the viewport.`);
    });

    it('should fall back to "above" mode if "below" mode would not fit on screen', () => {
      const fixture = TestBed.createComponent(SimpleMenu);
      fixture.detectChanges();
      const trigger = fixture.componentInstance.triggerEl.nativeElement;

      // Push trigger to the bottom part of viewport, so it doesn't have space to open
      // in its default "below" position below the trigger.
      trigger.style.position = 'fixed';
      trigger.style.bottom = '65px';

      fixture.componentInstance.trigger.openMenu();
      fixture.detectChanges();
      const overlayPane = getOverlayPane();
      const triggerRect = trigger.getBoundingClientRect();
      const overlayRect = overlayPane.getBoundingClientRect();

      // In "above" position, the bottom edges of the overlay and the origin are aligned.
      // To find the overlay top, subtract the menu height from the origin's bottom edge.
      const expectedTop = triggerRect.bottom - overlayRect.height;
      expect(Math.floor(overlayRect.top))
          .toBe(Math.floor(expectedTop),
              `Expected menu to open in "above" position if "below" position wouldn't fit.`);

      // The x-position of the overlay should be unaffected, as it can already fit horizontally
      expect(Math.floor(overlayRect.left))
          .toBe(Math.floor(triggerRect.left),
              `Expected menu x position to be unchanged if it can fit in the viewport.`);
    });

    it('should re-position menu on both axes if both defaults would not fit', () => {
      const fixture = TestBed.createComponent(SimpleMenu);
      fixture.detectChanges();
      const trigger = fixture.componentInstance.triggerEl.nativeElement;

      // push trigger to the bottom, right part of viewport, so it doesn't have space to open
      // in its default "after below" position.
      trigger.style.position = 'fixed';
      trigger.style.right = '-50px';
      trigger.style.bottom = '65px';

      fixture.componentInstance.trigger.openMenu();
      fixture.detectChanges();
      const overlayPane = getOverlayPane();
      const triggerRect = trigger.getBoundingClientRect();
      const overlayRect = overlayPane.getBoundingClientRect();

      const expectedLeft = triggerRect.right - overlayRect.width;
      const expectedTop = triggerRect.bottom - overlayRect.height;

      expect(Math.floor(overlayRect.left))
          .toBe(Math.floor(expectedLeft),
              `Expected menu to open in "before" position if "after" position wouldn't fit.`);

      expect(Math.floor(overlayRect.top))
          .toBe(Math.floor(expectedTop),
              `Expected menu to open in "above" position if "below" position wouldn't fit.`);
    });

    it('should re-position a menu with custom position set', () => {
      const fixture = TestBed.createComponent(PositionedMenu);
      fixture.detectChanges();
      const trigger = fixture.componentInstance.triggerEl.nativeElement;

      fixture.componentInstance.trigger.openMenu();
      fixture.detectChanges();
      const overlayPane = getOverlayPane();
      const triggerRect = trigger.getBoundingClientRect();
      const overlayRect = overlayPane.getBoundingClientRect();

      // As designated "before" position won't fit on screen, the menu should fall back
      // to "after" mode, where the left sides of the overlay and trigger are aligned.
      expect(Math.floor(overlayRect.left))
          .toBe(Math.floor(triggerRect.left),
              `Expected menu to open in "after" position if "before" position wouldn't fit.`);

      // As designated "above" position won't fit on screen, the menu should fall back
      // to "below" mode, where the top edges of the overlay and trigger are aligned.
      expect(Math.floor(overlayRect.top))
          .toBe(Math.floor(triggerRect.top),
              `Expected menu to open in "below" position if "above" position wouldn't fit.`);
    });

    function getOverlayPane(): HTMLElement {
      return overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
    }
  });

  describe('overlapping trigger', () => {
    /*
     * This test class is used to create components containing a menu.
     * It provides helpers to reposition the trigger, open the menu,
     * and access the trigger and overlay positions.
     * Additionally it can take any inputs for the menu wrapper component.
     *
     * Basic usage:
     * const subject = new OverlapSubject(MyComponent);
     * subject.openMenu();
     */
    class OverlapSubject<T extends TestableMenu> {
      private readonly fixture: ComponentFixture<T>;
      private readonly trigger: any;

      constructor(ctor: {new(): T; }, inputs: {[key: string]: any} = {}) {
        this.fixture = TestBed.createComponent(ctor);
        extendObject(this.fixture.componentInstance, inputs);
        this.fixture.detectChanges();
        this.trigger = this.fixture.componentInstance.triggerEl.nativeElement;
      }

      openMenu() {
        this.fixture.componentInstance.trigger.openMenu();
        this.fixture.detectChanges();
      }

      updateTriggerStyle(style: any) {
        return extendObject(this.trigger.style, style);
      }

      get overlayRect() {
        return this.overlayPane.getBoundingClientRect();
      }

      get triggerRect() {
        return this.trigger.getBoundingClientRect();
      }

      get menuPanel() {
        return overlayContainerElement.querySelector('.mat-menu-panel');
      }

      private get overlayPane() {
        return overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      }
    }

    let subject: OverlapSubject<OverlapMenu>;
    describe('explicitly overlapping', () => {
      beforeEach(() => {
        subject = new OverlapSubject(OverlapMenu, {overlapTrigger: true});
      });

      it('positions the overlay below the trigger', () => {
        subject.openMenu();

        // Since the menu is overlaying the trigger, the overlay top should be the trigger top.
        expect(Math.floor(subject.overlayRect.top))
            .toBe(Math.floor(subject.triggerRect.top),
                `Expected menu to open in default "below" position.`);
      });
    });

    describe('not overlapping', () => {
      beforeEach(() => {
        subject = new OverlapSubject(OverlapMenu, {overlapTrigger: false});
      });

      it('positions the overlay below the trigger', () => {
        subject.openMenu();

        // Since the menu is below the trigger, the overlay top should be the trigger bottom.
        expect(Math.floor(subject.overlayRect.top))
            .toBe(Math.floor(subject.triggerRect.bottom),
                `Expected menu to open directly below the trigger.`);
      });

      it('supports above position fall back', () => {
        // Push trigger to the bottom part of viewport, so it doesn't have space to open
        // in its default "below" position below the trigger.
        subject.updateTriggerStyle({position: 'fixed', bottom: '0'});
        subject.openMenu();

        // Since the menu is above the trigger, the overlay bottom should be the trigger top.
        expect(Math.floor(subject.overlayRect.bottom))
            .toBe(Math.floor(subject.triggerRect.top),
                `Expected menu to open in "above" position if "below" position wouldn't fit.`);
      });

      it('repositions the origin to be below, so the menu opens from the trigger', () => {
        subject.openMenu();

        expect(subject.menuPanel!.classList).toContain('mat-menu-below');
        expect(subject.menuPanel!.classList).not.toContain('mat-menu-above');
      });

    });
  });

  describe('animations', () => {
    it('should include the ripple on items by default', () => {
      const fixture = TestBed.createComponent(SimpleMenu);
      fixture.detectChanges();

      fixture.componentInstance.trigger.openMenu();
      const item = fixture.debugElement.query(By.css('.mat-menu-item'));
      const ripple = item.query(By.css('.mat-ripple'));

      expect(ripple).not.toBeNull();
    });

    it('should remove the ripple on disabled items', () => {
      const fixture = TestBed.createComponent(SimpleMenu);
      fixture.detectChanges();

      fixture.componentInstance.trigger.openMenu();
      const items = fixture.debugElement.queryAll(By.css('.mat-menu-item'));

      // items[1] is disabled, so the ripple should not be present
      const ripple = items[1].query(By.css('.mat-ripple'));
      expect(ripple).toBeNull();
    });

  });

  describe('close event', () => {
    let fixture: ComponentFixture<SimpleMenu>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleMenu);
      fixture.detectChanges();
      fixture.componentInstance.trigger.openMenu();
    });

    it('should emit an event when a menu item is clicked', () => {
      const menuItem = overlayContainerElement.querySelector('[md-menu-item]') as HTMLElement;

      menuItem.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.closeCallback).toHaveBeenCalled();
    });

    it('should emit a close event when the backdrop is clicked', () => {
      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');

      backdrop.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.closeCallback).toHaveBeenCalled();
    });

    it('should complete the callback when the menu is destroyed', () => {
      let emitCallback = jasmine.createSpy('emit callback');
      let completeCallback = jasmine.createSpy('complete callback');

      fixture.componentInstance.menu.close.subscribe(emitCallback, null, completeCallback);
      fixture.destroy();

      expect(emitCallback).toHaveBeenCalled();
      expect(completeCallback).toHaveBeenCalled();
    });
  });

  describe('nested menu', () => {
    let fixture: ComponentFixture<NestedMenu>;
    let instance: NestedMenu;
    let overlay: HTMLElement;
    let compileTestComponent = () => {
      fixture = TestBed.createComponent(NestedMenu);
      fixture.detectChanges();
      instance = fixture.componentInstance;
      overlay = overlayContainerElement;
    };

    it('should set the `triggersSubmenu` flags on the triggers', () => {
      compileTestComponent();
      expect(instance.rootTrigger.triggersSubmenu()).toBe(false);
      expect(instance.levelOneTrigger.triggersSubmenu()).toBe(true);
      expect(instance.levelTwoTrigger.triggersSubmenu()).toBe(true);
    });

    it('should set the `isSubmenu` flag on the menu instances', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      instance.levelTwoTrigger.openMenu();
      fixture.detectChanges();

      expect(instance.rootMenu.isSubmenu).toBe(false);
      expect(instance.levelOneMenu.isSubmenu).toBe(true);
      expect(instance.levelTwoMenu.isSubmenu).toBe(true);
    });

    it('should pass the layout direction the nested menus', () => {
      dir = 'rtl';
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      instance.levelTwoTrigger.openMenu();
      fixture.detectChanges();

      expect(instance.rootMenu.direction).toBe('rtl');
      expect(instance.levelOneMenu.direction).toBe('rtl');
      expect(instance.levelTwoMenu.direction).toBe('rtl');
    });

    it('should emit an event when the hover state of the menu items changes', () => {
      compileTestComponent();
      instance.rootTrigger.openMenu();
      fixture.detectChanges();

      const spy = jasmine.createSpy('hover spy');
      const subscription = instance.rootMenu.hover().subscribe(spy);
      const menuItems = overlay.querySelectorAll('[md-menu-item]');

      dispatchMouseEvent(menuItems[0], 'mouseenter');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);

      dispatchMouseEvent(menuItems[1], 'mouseenter');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(2);

      subscription.unsubscribe();
    });

    it('should toggle a nested menu when its trigger is hovered', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');

      const items = Array.from(overlay.querySelectorAll('.mat-menu-panel [md-menu-item]'));
      const levelOneTrigger = overlay.querySelector('#level-one-trigger')!;

      dispatchMouseEvent(levelOneTrigger, 'mouseenter');
      fixture.detectChanges();
      expect(levelOneTrigger.classList)
          .toContain('mat-menu-item-highlighted', 'Expected the trigger to be highlighted');
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');

      dispatchMouseEvent(items[items.indexOf(levelOneTrigger) + 1], 'mouseenter');
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
      expect(levelOneTrigger.classList)
          .not.toContain('mat-menu-item-highlighted', 'Expected the trigger to not be highlighted');
    });

    it('should close all the open sub-menus when the hover state is changed at the root', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();

      const items = Array.from(overlay.querySelectorAll('.mat-menu-panel [md-menu-item]'));
      const levelOneTrigger = overlay.querySelector('#level-one-trigger')!;

      dispatchMouseEvent(levelOneTrigger, 'mouseenter');
      fixture.detectChanges();

      const levelTwoTrigger = overlay.querySelector('#level-two-trigger')! as HTMLElement;
      dispatchMouseEvent(levelTwoTrigger, 'mouseenter');
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel').length)
          .toBe(3, 'Expected three open menus');

      dispatchMouseEvent(items[items.indexOf(levelOneTrigger) + 1], 'mouseenter');
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
    });

    it('should open a nested menu when its trigger is clicked', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');

      const levelOneTrigger = overlay.querySelector('#level-one-trigger')! as HTMLElement;

      levelOneTrigger.click();
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');

      levelOneTrigger.click();
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length)
          .toBe(2, 'Expected repeat clicks not to close the menu.');
    });

    it('should open and close a nested menu with arrow keys in ltr', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');

      const levelOneTrigger = overlay.querySelector('#level-one-trigger')! as HTMLElement;

      dispatchKeyboardEvent(levelOneTrigger, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      const panels = overlay.querySelectorAll('.mat-menu-panel');

      expect(panels.length).toBe(2, 'Expected two open menus');
      dispatchKeyboardEvent(panels[1], 'keydown', LEFT_ARROW);
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1);
    });

    it('should open and close a nested menu with the arrow keys in rtl', () => {
      dir = 'rtl';
      fixture.destroy();
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');

      const levelOneTrigger = overlay.querySelector('#level-one-trigger')! as HTMLElement;

      dispatchKeyboardEvent(levelOneTrigger, 'keydown', LEFT_ARROW);
      fixture.detectChanges();

      const panels = overlay.querySelectorAll('.mat-menu-panel');

      expect(panels.length).toBe(2, 'Expected two open menus');
      dispatchKeyboardEvent(panels[1], 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1);
    });

    it('should not do anything with the arrow keys for a top-level menu', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();

      const menu = overlay.querySelector('.mat-menu-panel')!;

      dispatchKeyboardEvent(menu, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length)
          .toBe(1, 'Expected one menu to remain open');

      dispatchKeyboardEvent(menu, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(overlay.querySelectorAll('.mat-menu-panel').length)
          .toBe(1, 'Expected one menu to remain open');
    });

    it('should close all of the menus when the backdrop is clicked', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      instance.levelTwoTrigger.openMenu();
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel').length)
          .toBe(3, 'Expected three open menus');
      expect(overlay.querySelectorAll('.cdk-overlay-backdrop').length)
          .toBe(1, 'Expected one backdrop element');
      expect(overlay.querySelectorAll('.mat-menu-panel, .cdk-overlay-backdrop')[0].classList)
          .toContain('cdk-overlay-backdrop', 'Expected backdrop to be beneath all of the menus');

      (overlay.querySelector('.cdk-overlay-backdrop')! as HTMLElement).click();
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(0, 'Expected no open menus');
    });

    it('should shift focus between the sub-menus', () => {
      compileTestComponent();
      instance.rootTrigger.openMenu();
      fixture.detectChanges();

      expect(overlay.querySelector('.mat-menu-panel')!.contains(document.activeElement))
          .toBe(true, 'Expected focus to be inside the root menu');

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel')[1].contains(document.activeElement))
          .toBe(true, 'Expected focus to be inside the first nested menu');

      instance.levelTwoTrigger.openMenu();
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel')[2].contains(document.activeElement))
          .toBe(true, 'Expected focus to be inside the second nested menu');

      instance.levelTwoTrigger.closeMenu();
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel')[1].contains(document.activeElement))
          .toBe(true, 'Expected focus to be back inside the first nested menu');

      instance.levelOneTrigger.closeMenu();
      fixture.detectChanges();

      expect(overlay.querySelector('.mat-menu-panel')!.contains(document.activeElement))
          .toBe(true, 'Expected focus to be back inside the root menu');
    });

    it('should not shift focus to the sub-menu when it was opened by hover', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();

      const levelOneTrigger = overlay.querySelector('#level-one-trigger')! as HTMLElement;

      dispatchMouseEvent(levelOneTrigger, 'mouseenter');
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel')[1].contains(document.activeElement))
          .toBe(false, 'Expected focus to not be inside the nested menu');
    });

    it('should position the sub-menu to the right edge of the trigger in ltr', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.style.position = 'fixed';
      instance.rootTriggerEl.nativeElement.style.left = '50px';
      instance.rootTriggerEl.nativeElement.style.top = '50px';
      instance.rootTrigger.openMenu();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
      const panelRect = overlay.querySelectorAll('.mat-menu-panel')[1].getBoundingClientRect();

      expect(Math.round(triggerRect.right)).toBe(Math.round(panelRect.left));
      expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
    });

    it('should fall back to aligning to the left edge of the trigger in ltr', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.style.position = 'fixed';
      instance.rootTriggerEl.nativeElement.style.right = '10px';
      instance.rootTriggerEl.nativeElement.style.top = '50%';
      instance.rootTrigger.openMenu();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
      const panelRect = overlay.querySelectorAll('.mat-menu-panel')[1].getBoundingClientRect();

      expect(Math.round(triggerRect.left)).toBe(Math.round(panelRect.right));
      expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
    });

    it('should position the sub-menu to the left edge of the trigger in rtl', () => {
      dir = 'rtl';
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.style.position = 'fixed';
      instance.rootTriggerEl.nativeElement.style.left = '50%';
      instance.rootTriggerEl.nativeElement.style.top = '50%';
      instance.rootTrigger.openMenu();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
      const panelRect = overlay.querySelectorAll('.mat-menu-panel')[1].getBoundingClientRect();

      expect(Math.round(triggerRect.left)).toBe(Math.round(panelRect.right));
      expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
    });

    it('should fall back to aligning to the right edge of the trigger in rtl', () => {
      dir = 'rtl';
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.style.position = 'fixed';
      instance.rootTriggerEl.nativeElement.style.left = '10px';
      instance.rootTriggerEl.nativeElement.style.top = '50%';
      instance.rootTrigger.openMenu();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      const triggerRect = overlay.querySelector('#level-one-trigger')!.getBoundingClientRect();
      const panelRect = overlay.querySelectorAll('.mat-menu-panel')[1].getBoundingClientRect();

      expect(Math.round(triggerRect.right)).toBe(Math.round(panelRect.left));
      expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + MENU_PANEL_TOP_PADDING);
    });

    it('should close all of the menus when an item is clicked', () => {
      compileTestComponent();
      instance.rootTriggerEl.nativeElement.click();
      fixture.detectChanges();

      instance.levelOneTrigger.openMenu();
      fixture.detectChanges();

      instance.levelTwoTrigger.openMenu();
      fixture.detectChanges();

      const menus = overlay.querySelectorAll('.mat-menu-panel');

      expect(menus.length).toBe(3, 'Expected three open menus');

      (menus[2].querySelector('.mat-menu-item')! as HTMLElement).click();
      fixture.detectChanges();

      expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(0, 'Expected no open menus');
    });

  });

});

@Component({
  template: `
    <button [mdMenuTriggerFor]="menu" #triggerEl>Toggle menu</button>
    <md-menu class="custom-one custom-two" #menu="mdMenu" (close)="closeCallback()">
      <button md-menu-item> Item </button>
      <button md-menu-item disabled> Disabled </button>
    </md-menu>
  `
})
class SimpleMenu {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  @ViewChild('triggerEl') triggerEl: ElementRef;
  @ViewChild(MdMenu) menu: MdMenu;
  closeCallback = jasmine.createSpy('menu closed callback');
}

@Component({
  template: `
    <button [mdMenuTriggerFor]="menu" #triggerEl>Toggle menu</button>
    <md-menu [xPosition]="xPosition" [yPosition]="yPosition" #menu="mdMenu">
      <button md-menu-item> Positioned Content </button>
    </md-menu>
  `
})
class PositionedMenu {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  @ViewChild('triggerEl') triggerEl: ElementRef;
  xPosition: MenuPositionX = 'before';
  yPosition: MenuPositionY = 'above';
}

interface TestableMenu {
  trigger: MdMenuTrigger;
  triggerEl: ElementRef;
}
@Component({
  template: `
    <button [mdMenuTriggerFor]="menu" #triggerEl>Toggle menu</button>
    <md-menu [overlapTrigger]="overlapTrigger" #menu="mdMenu">
      <button md-menu-item> Not overlapped Content </button>
    </md-menu>
  `
})
class OverlapMenu implements TestableMenu {
  @Input() overlapTrigger: boolean;
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  @ViewChild('triggerEl') triggerEl: ElementRef;
}

@Component({
  selector: 'custom-menu',
  template: `
    <ng-template>
      Custom Menu header
      <ng-content></ng-content>
    </ng-template>
  `,
  exportAs: 'mdCustomMenu'
})
class CustomMenuPanel implements MdMenuPanel {
  direction: Direction;
  xPosition: MenuPositionX = 'after';
  yPosition: MenuPositionY = 'below';
  overlapTrigger = true;
  isSubmenu = false;

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @Output() close = new EventEmitter<void | 'click' | 'keydown'>();
  focusFirstItem = () => {};
  setPositionClasses = () => {};
}

@Component({
  template: `
    <button [mdMenuTriggerFor]="menu">Toggle menu</button>
    <custom-menu #menu="mdCustomMenu">
      <button md-menu-item> Custom Content </button>
    </custom-menu>
  `
})
class CustomMenu {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
}


@Component({
  template: `
    <button
      [mdMenuTriggerFor]="root"
      #rootTrigger="mdMenuTrigger"
      #rootTriggerEl>Toggle menu</button>

    <md-menu #root="mdMenu">
      <button md-menu-item
        id="level-one-trigger"
        [mdMenuTriggerFor]="levelOne"
        #levelOneTrigger="mdMenuTrigger">One</button>
      <button md-menu-item>Two</button>
      <button md-menu-item>Three</button>
    </md-menu>

    <md-menu #levelOne="mdMenu">
      <button md-menu-item>Four</button>
      <button md-menu-item
        id="level-two-trigger"
        [mdMenuTriggerFor]="levelTwo"
        #levelTwoTrigger="mdMenuTrigger">Five</button>
      <button md-menu-item>Six</button>
    </md-menu>

    <md-menu #levelTwo="mdMenu">
      <button md-menu-item>Seven</button>
      <button md-menu-item>Eight</button>
      <button md-menu-item>Nine</button>
    </md-menu>
  `
})
class NestedMenu {
  @ViewChild('root') rootMenu: MdMenu;
  @ViewChild('rootTrigger') rootTrigger: MdMenuTrigger;
  @ViewChild('rootTriggerEl') rootTriggerEl: ElementRef;

  @ViewChild('levelOne') levelOneMenu: MdMenu;
  @ViewChild('levelOneTrigger') levelOneTrigger: MdMenuTrigger;

  @ViewChild('levelTwo') levelTwoMenu: MdMenu;
  @ViewChild('levelTwoTrigger') levelTwoTrigger: MdMenuTrigger;
}
