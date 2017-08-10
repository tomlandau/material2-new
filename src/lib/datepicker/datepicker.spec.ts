import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {MdDatepickerModule} from './index';
import {MdDatepicker} from './datepicker';
import {MdDatepickerInput} from './datepicker-input';
import {MdInputModule} from '../input/index';
import {MdNativeDateModule} from '../core/datetime/index';
import {ESCAPE} from '../core/keyboard/keycodes';
import {OverlayContainer} from '../core/overlay/index';
import {dispatchFakeEvent, dispatchMouseEvent, dispatchKeyboardEvent} from '@angular/cdk/testing';
import {DEC, JAN} from '../core/testing/month-constants';

describe('MdDatepicker', () => {
  afterEach(inject([OverlayContainer], (container: OverlayContainer) => {
    container.getContainerElement().parentNode!.removeChild(container.getContainerElement());
  }));

  describe('with MdNativeDateModule', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          MdDatepickerModule,
          MdInputModule,
          MdNativeDateModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
        ],
        declarations: [
          DatepickerWithChangeAndInputEvents,
          DatepickerWithFilterAndValidation,
          DatepickerWithFormControl,
          DatepickerWithMinAndMaxValidation,
          DatepickerWithNgModel,
          DatepickerWithStartAt,
          DatepickerWithStartView,
          DatepickerWithToggle,
          InputContainerDatepicker,
          MultiInputDatepicker,
          NoInputDatepicker,
          StandardDatepicker,
        ],
      });

      TestBed.compileComponents();
    }));

    describe('standard datepicker', () => {
      let fixture: ComponentFixture<StandardDatepicker>;
      let testComponent: StandardDatepicker;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(StandardDatepicker);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('open non-touch should open popup', () => {
        expect(document.querySelector('.cdk-overlay-pane')).toBeNull();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('.cdk-overlay-pane')).not.toBeNull();
      });

      it('open touch should open dialog', () => {
        testComponent.touch = true;
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).toBeNull();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).not.toBeNull();
      });

      it('open in disabled mode should not open the calendar', () => {
        testComponent.disabled = true;
        fixture.detectChanges();

        expect(document.querySelector('.cdk-overlay-pane')).toBeNull();
        expect(document.querySelector('md-dialog-container')).toBeNull();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('.cdk-overlay-pane')).toBeNull();
        expect(document.querySelector('md-dialog-container')).toBeNull();
      });

      it('disabled datepicker input should open the calendar if datepicker is enabled', () => {
        testComponent.datepicker.disabled = false;
        testComponent.datepickerInput.disabled = true;
        fixture.detectChanges();

        expect(document.querySelector('.cdk-overlay-pane')).toBeNull();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('.cdk-overlay-pane')).not.toBeNull();
      });

      it('close should close popup', () => {
        testComponent.datepicker.open();
        fixture.detectChanges();

        let popup = document.querySelector('.cdk-overlay-pane')!;
        expect(popup).not.toBeNull();
        expect(parseInt(getComputedStyle(popup).height as string)).not.toBe(0);

        testComponent.datepicker.close();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(parseInt(getComputedStyle(popup).height as string)).toBe(0);
        });
      });

      it('should close the popup when pressing ESCAPE', () => {
        testComponent.datepicker.open();
        fixture.detectChanges();

        let content = document.querySelector('.cdk-overlay-pane md-datepicker-content')!;
        expect(content).toBeTruthy('Expected datepicker to be open.');

        let keyboadEvent = dispatchKeyboardEvent(content, 'keydown', ESCAPE);
        fixture.detectChanges();

        content = document.querySelector('.cdk-overlay-pane md-datepicker-content')!;

        expect(content).toBeFalsy('Expected datepicker to be closed.');
        expect(keyboadEvent.defaultPrevented)
            .toBe(true, 'Expected default ESCAPE action to be prevented.');
      });

      it('close should close dialog', () => {
        testComponent.touch = true;
        fixture.detectChanges();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).not.toBeNull();

        testComponent.datepicker.close();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(document.querySelector('md-dialog-container')).toBeNull();
        });
      });

      it('setting selected should update input and close calendar', () => {
        testComponent.touch = true;
        fixture.detectChanges();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).not.toBeNull();
        expect(testComponent.datepickerInput.value).toEqual(new Date(2020, JAN, 1));

        let cells = document.querySelectorAll('.mat-calendar-body-cell');
        dispatchMouseEvent(cells[1], 'click');
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(document.querySelector('md-dialog-container')).toBeNull();
          expect(testComponent.datepickerInput.value).toEqual(new Date(2020, JAN, 2));
        });
      });

      it('startAt should fallback to input value', () => {
        expect(testComponent.datepicker.startAt).toEqual(new Date(2020, JAN, 1));
      });

      it('should attach popup to native input', () => {
        let attachToRef = testComponent.datepickerInput.getPopupConnectionElementRef();
        expect(attachToRef.nativeElement.tagName.toLowerCase())
            .toBe('input', 'popup should be attached to native input');
      });

      it('input should aria-owns calendar after opened in non-touch mode', () => {
        let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputEl.getAttribute('aria-owns')).toBeNull();

        testComponent.datepicker.open();
        fixture.detectChanges();

        let ownedElementId = inputEl.getAttribute('aria-owns');
        expect(ownedElementId).not.toBeNull();

        let ownedElement = document.getElementById(ownedElementId);
        expect(ownedElement).not.toBeNull();
        expect((ownedElement as Element).tagName.toLowerCase()).toBe('md-calendar');
      });

      it('input should aria-owns calendar after opened in touch mode', () => {
        testComponent.touch = true;
        fixture.detectChanges();

        let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(inputEl.getAttribute('aria-owns')).toBeNull();

        testComponent.datepicker.open();
        fixture.detectChanges();

        let ownedElementId = inputEl.getAttribute('aria-owns');
        expect(ownedElementId).not.toBeNull();

        let ownedElement = document.getElementById(ownedElementId);
        expect(ownedElement).not.toBeNull();
        expect((ownedElement as Element).tagName.toLowerCase()).toBe('md-calendar');
      });
    });

    describe('datepicker with too many inputs', () => {
      it('should throw when multiple inputs registered', async(() => {
        let fixture = TestBed.createComponent(MultiInputDatepicker);
        expect(() => fixture.detectChanges()).toThrow();
      }));
    });

    describe('datepicker with no inputs', () => {
      let fixture: ComponentFixture<NoInputDatepicker>;
      let testComponent: NoInputDatepicker;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(NoInputDatepicker);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should throw when opened with no registered inputs', async(() => {
        expect(() => testComponent.datepicker.open()).toThrow();
      }));
    });

    describe('datepicker with startAt', () => {
      let fixture: ComponentFixture<DatepickerWithStartAt>;
      let testComponent: DatepickerWithStartAt;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithStartAt);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('explicit startAt should override input value', () => {
        expect(testComponent.datepicker.startAt).toEqual(new Date(2010, JAN, 1));
      });
    });

    describe('datepicker with startView', () => {
      let fixture: ComponentFixture<DatepickerWithStartView>;
      let testComponent: DatepickerWithStartView;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithStartView);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should start at the specified view', () => {
        testComponent.datepicker.open();
        fixture.detectChanges();

        const firstCalendarCell = document.querySelector('.mat-calendar-body-cell')!;

        // When the calendar is in year view, the first cell should be for a month rather than
        // for a date.
        expect(firstCalendarCell.textContent)
            .toBe('JAN', 'Expected the calendar to be in year-view');
      });
    });

    describe('datepicker with ngModel', () => {
      let fixture: ComponentFixture<DatepickerWithNgModel>;
      let testComponent: DatepickerWithNgModel;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithNgModel);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          testComponent = fixture.componentInstance;
        });
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should update datepicker when model changes', async(() => {
        expect(testComponent.datepickerInput.value).toBeNull();
        expect(testComponent.datepicker._selected).toBeNull();

        let selected = new Date(2017, JAN, 1);
        testComponent.selected = selected;
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(testComponent.datepickerInput.value).toEqual(selected);
          expect(testComponent.datepicker._selected).toEqual(selected);
        });
      }));

      it('should update model when date is selected', async(() => {
        expect(testComponent.selected).toBeNull();
        expect(testComponent.datepickerInput.value).toBeNull();

        let selected = new Date(2017, JAN, 1);
        testComponent.datepicker._selectAndClose(selected);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(testComponent.selected).toEqual(selected);
          expect(testComponent.datepickerInput.value).toEqual(selected);
        });
      }));

      it('should mark input dirty after input event', () => {
        let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputEl.classList).toContain('ng-pristine');

        dispatchFakeEvent(inputEl, 'input');
        fixture.detectChanges();

        expect(inputEl.classList).toContain('ng-dirty');
      });

      it('should mark input dirty after date selected', async(() => {
        let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputEl.classList).toContain('ng-pristine');

        testComponent.datepicker._selectAndClose(new Date(2017, JAN, 1));
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(inputEl.classList).toContain('ng-dirty');
        });
      }));

      it('should not mark dirty after model change', async(() => {
        let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputEl.classList).toContain('ng-pristine');

        testComponent.selected = new Date(2017, JAN, 1);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(inputEl.classList).toContain('ng-pristine');
        });
      }));

      it('should mark input touched on blur', () => {
        let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputEl.classList).toContain('ng-untouched');

        dispatchFakeEvent(inputEl, 'focus');
        fixture.detectChanges();

        expect(inputEl.classList).toContain('ng-untouched');

        dispatchFakeEvent(inputEl, 'blur');
        fixture.detectChanges();

        expect(inputEl.classList).toContain('ng-touched');
      });
    });

    describe('datepicker with formControl', () => {
      let fixture: ComponentFixture<DatepickerWithFormControl>;
      let testComponent: DatepickerWithFormControl;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithFormControl);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should update datepicker when formControl changes', () => {
        expect(testComponent.datepickerInput.value).toBeNull();
        expect(testComponent.datepicker._selected).toBeNull();

        let selected = new Date(2017, JAN, 1);
        testComponent.formControl.setValue(selected);
        fixture.detectChanges();

        expect(testComponent.datepickerInput.value).toEqual(selected);
        expect(testComponent.datepicker._selected).toEqual(selected);
      });

      it('should update formControl when date is selected', () => {
        expect(testComponent.formControl.value).toBeNull();
        expect(testComponent.datepickerInput.value).toBeNull();

        let selected = new Date(2017, JAN, 1);
        testComponent.datepicker._selectAndClose(selected);
        fixture.detectChanges();

        expect(testComponent.formControl.value).toEqual(selected);
        expect(testComponent.datepickerInput.value).toEqual(selected);
      });

      it('should disable input when form control disabled', () => {
        let inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputEl.disabled).toBe(false);

        testComponent.formControl.disable();
        fixture.detectChanges();

        expect(inputEl.disabled).toBe(true);
      });
    });

    describe('datepicker with mdDatepickerToggle', () => {
      let fixture: ComponentFixture<DatepickerWithToggle>;
      let testComponent: DatepickerWithToggle;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithToggle);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should open calendar when toggle clicked', () => {
        expect(document.querySelector('md-dialog-container')).toBeNull();

        let toggle = fixture.debugElement.query(By.css('button'));
        dispatchMouseEvent(toggle.nativeElement, 'click');
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).not.toBeNull();
      });

      it('should not open calendar when toggle clicked if datepicker is disabled', () => {
        testComponent.datepicker.disabled = true;
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).toBeNull();

        let toggle = fixture.debugElement.query(By.css('button'));
        dispatchMouseEvent(toggle.nativeElement, 'click');
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).toBeNull();
      });

      it('should set the `button` type on the trigger to prevent form submissions', () => {
        let toggle = fixture.debugElement.query(By.css('button')).nativeElement;
        expect(toggle.getAttribute('type')).toBe('button');
      });

      it('should restore focus to the toggle after the calendar is closed', () => {
        let toggle = fixture.debugElement.query(By.css('button')).nativeElement;

        fixture.componentInstance.touchUI = false;
        fixture.detectChanges();

        toggle.focus();
        expect(document.activeElement).toBe(toggle, 'Expected toggle to be focused.');

        fixture.componentInstance.datepicker.open();
        fixture.detectChanges();

        let pane = document.querySelector('.cdk-overlay-pane')!;

        expect(pane).toBeTruthy('Expected calendar to be open.');
        expect(pane.contains(document.activeElement))
            .toBe(true, 'Expected focus to be inside the calendar.');

        fixture.componentInstance.datepicker.close();
        fixture.detectChanges();

        expect(document.activeElement).toBe(toggle, 'Expected focus to be restored to toggle.');
      });
    });

    describe('datepicker inside input-container', () => {
      let fixture: ComponentFixture<InputContainerDatepicker>;
      let testComponent: InputContainerDatepicker;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(InputContainerDatepicker);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should attach popup to input-container underline', () => {
        let attachToRef = testComponent.datepickerInput.getPopupConnectionElementRef();
        expect(attachToRef.nativeElement.classList.contains('mat-input-underline'))
            .toBe(true, 'popup should be attached to input-container underline');
      });
    });

    describe('datepicker with min and max dates and validation', () => {
      let fixture: ComponentFixture<DatepickerWithMinAndMaxValidation>;
      let testComponent: DatepickerWithMinAndMaxValidation;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithMinAndMaxValidation);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should use min and max dates specified by the input', () => {
        expect(testComponent.datepicker._minDate).toEqual(new Date(2010, JAN, 1));
        expect(testComponent.datepicker._maxDate).toEqual(new Date(2020, JAN, 1));
      });

      it('should mark invalid when value is before min', () => {
        testComponent.date = new Date(2009, DEC, 31);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('input')).nativeElement.classList)
              .toContain('ng-invalid');
        });
      });

      it('should mark invalid when value is after max', () => {
        testComponent.date = new Date(2020, JAN, 2);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('input')).nativeElement.classList)
              .toContain('ng-invalid');
        });
      });

      it('should not mark invalid when value equals min', () => {
        testComponent.date = testComponent.datepicker._minDate;
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('input')).nativeElement.classList)
              .not.toContain('ng-invalid');
        });
      });

      it('should not mark invalid when value equals max', () => {
        testComponent.date = testComponent.datepicker._maxDate;
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('input')).nativeElement.classList)
              .not.toContain('ng-invalid');
        });
      });

      it('should not mark invalid when value is between min and max', () => {
        testComponent.date = new Date(2010, JAN, 2);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('input')).nativeElement.classList)
              .not.toContain('ng-invalid');
        });
      });
    });

    describe('datepicker with filter and validation', () => {
      let fixture: ComponentFixture<DatepickerWithFilterAndValidation>;
      let testComponent: DatepickerWithFilterAndValidation;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithFilterAndValidation);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should mark input invalid', async(() => {
        testComponent.date = new Date(2017, JAN, 1);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(fixture.debugElement.query(By.css('input')).nativeElement.classList)
              .toContain('ng-invalid');

          testComponent.date = new Date(2017, JAN, 2);
          fixture.detectChanges();

          fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('input')).nativeElement.classList)
                .not.toContain('ng-invalid');
          });
        });
      }));

      it('should disable filtered calendar cells', () => {
        fixture.detectChanges();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).not.toBeNull();

        let cells = document.querySelectorAll('.mat-calendar-body-cell');
        expect(cells[0].classList).toContain('mat-calendar-body-disabled');
        expect(cells[1].classList).not.toContain('mat-calendar-body-disabled');
      });
    });

    describe('datepicker with change and input events', () => {
      let fixture: ComponentFixture<DatepickerWithChangeAndInputEvents>;
      let testComponent: DatepickerWithChangeAndInputEvents;
      let inputEl: HTMLInputElement;

      beforeEach(async(() => {
        fixture = TestBed.createComponent(DatepickerWithChangeAndInputEvents);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        spyOn(testComponent, 'onChange');
        spyOn(testComponent, 'onInput');
        spyOn(testComponent, 'onDateChange');
        spyOn(testComponent, 'onDateInput');
      }));

      afterEach(async(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
      }));

      it('should fire input and dateInput events when user types input', () => {
        expect(testComponent.onChange).not.toHaveBeenCalled();
        expect(testComponent.onDateChange).not.toHaveBeenCalled();
        expect(testComponent.onInput).not.toHaveBeenCalled();
        expect(testComponent.onDateInput).not.toHaveBeenCalled();

        dispatchFakeEvent(inputEl, 'input');
        fixture.detectChanges();

        expect(testComponent.onChange).not.toHaveBeenCalled();
        expect(testComponent.onDateChange).not.toHaveBeenCalled();
        expect(testComponent.onInput).toHaveBeenCalled();
        expect(testComponent.onDateInput).toHaveBeenCalled();
      });

      it('should fire change and dateChange events when user commits typed input', () => {
        expect(testComponent.onChange).not.toHaveBeenCalled();
        expect(testComponent.onDateChange).not.toHaveBeenCalled();
        expect(testComponent.onInput).not.toHaveBeenCalled();
        expect(testComponent.onDateInput).not.toHaveBeenCalled();

        dispatchFakeEvent(inputEl, 'change');
        fixture.detectChanges();

        expect(testComponent.onChange).toHaveBeenCalled();
        expect(testComponent.onDateChange).toHaveBeenCalled();
        expect(testComponent.onInput).not.toHaveBeenCalled();
        expect(testComponent.onDateInput).not.toHaveBeenCalled();
      });

      it('should fire dateChange and dateInput events when user selects calendar date', () => {
        expect(testComponent.onChange).not.toHaveBeenCalled();
        expect(testComponent.onDateChange).not.toHaveBeenCalled();
        expect(testComponent.onInput).not.toHaveBeenCalled();
        expect(testComponent.onDateInput).not.toHaveBeenCalled();

        testComponent.datepicker.open();
        fixture.detectChanges();

        expect(document.querySelector('md-dialog-container')).not.toBeNull();

        let cells = document.querySelectorAll('.mat-calendar-body-cell');
        dispatchMouseEvent(cells[0], 'click');
        fixture.detectChanges();

        expect(testComponent.onChange).not.toHaveBeenCalled();
        expect(testComponent.onDateChange).toHaveBeenCalled();
        expect(testComponent.onInput).not.toHaveBeenCalled();
        expect(testComponent.onDateInput).toHaveBeenCalled();
      });
    });
  });

  describe('with missing DateAdapter and MD_DATE_FORMATS', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          MdDatepickerModule,
          MdInputModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
        ],
        declarations: [StandardDatepicker],
      });

      TestBed.compileComponents();
    }));

    it('should throw when created', () => {
      expect(() => TestBed.createComponent(StandardDatepicker))
          .toThrowError(/MdDatepicker: No provider found for .*/);
    });
  });

  describe('popup positioning', () => {
    let fixture: ComponentFixture<StandardDatepicker>;
    let testComponent: StandardDatepicker;
    let input: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MdDatepickerModule, MdInputModule, MdNativeDateModule, NoopAnimationsModule],
        declarations: [StandardDatepicker],
      }).compileComponents();

      fixture = TestBed.createComponent(StandardDatepicker);
      fixture.detectChanges();
      testComponent = fixture.componentInstance;
      input = fixture.debugElement.query(By.css('input')).nativeElement;
      input.style.position = 'fixed';
    }));

    it('should be below and to the right when there is plenty of space', () => {
      input.style.top = input.style.left = '20px';
      testComponent.datepicker.open();
      fixture.detectChanges();

      const overlayRect = document.querySelector('.cdk-overlay-pane')!.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();

      expect(Math.floor(overlayRect.top))
          .toBe(Math.floor(inputRect.bottom), 'Expected popup to align to input bottom.');
      expect(Math.floor(overlayRect.left))
          .toBe(Math.floor(inputRect.left), 'Expected popup to align to input left.');
    });

    it('should be above and to the right when there is no space below', () => {
      input.style.bottom = input.style.left = '20px';
      testComponent.datepicker.open();
      fixture.detectChanges();

      const overlayRect = document.querySelector('.cdk-overlay-pane')!.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();

      expect(Math.floor(overlayRect.bottom))
          .toBe(Math.floor(inputRect.top), 'Expected popup to align to input top.');
      expect(Math.floor(overlayRect.left))
          .toBe(Math.floor(inputRect.left), 'Expected popup to align to input left.');
    });

    it('should be below and to the left when there is no space on the right', () => {
      input.style.top = input.style.right = '20px';
      testComponent.datepicker.open();
      fixture.detectChanges();

      const overlayRect = document.querySelector('.cdk-overlay-pane')!.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();

      expect(Math.floor(overlayRect.top))
          .toBe(Math.floor(inputRect.bottom), 'Expected popup to align to input bottom.');
      expect(Math.floor(overlayRect.right))
          .toBe(Math.floor(inputRect.right), 'Expected popup to align to input right.');
    });

    it('should be above and to the left when there is no space on the bottom', () => {
      input.style.bottom = input.style.right = '20px';
      testComponent.datepicker.open();
      fixture.detectChanges();

      const overlayRect = document.querySelector('.cdk-overlay-pane')!.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();

      expect(Math.floor(overlayRect.bottom))
          .toBe(Math.floor(inputRect.top), 'Expected popup to align to input top.');
      expect(Math.floor(overlayRect.right))
          .toBe(Math.floor(inputRect.right), 'Expected popup to align to input right.');
    });

  });
});


@Component({
  template: `
    <input [mdDatepicker]="d" [value]="date">
    <md-datepicker #d [touchUi]="touch" [disabled]="disabled"></md-datepicker>
  `,
})
class StandardDatepicker {
  touch = false;
  disabled = false;
  date = new Date(2020, JAN, 1);
  @ViewChild('d') datepicker: MdDatepicker<Date>;
  @ViewChild(MdDatepickerInput) datepickerInput: MdDatepickerInput<Date>;
}


@Component({
  template: `
    <input [mdDatepicker]="d"><input [mdDatepicker]="d"><md-datepicker #d></md-datepicker>
  `,
})
class MultiInputDatepicker {}


@Component({
  template: `<md-datepicker #d></md-datepicker>`,
})
class NoInputDatepicker {
  @ViewChild('d') datepicker: MdDatepicker<Date>;
}


@Component({
  template: `
    <input [mdDatepicker]="d" [value]="date">
    <md-datepicker #d [startAt]="startDate"></md-datepicker>
  `,
})
class DatepickerWithStartAt {
  date = new Date(2020, JAN, 1);
  startDate = new Date(2010, JAN, 1);
  @ViewChild('d') datepicker: MdDatepicker<Date>;
}


@Component({
  template: `
    <input [mdDatepicker]="d" [value]="date">
    <md-datepicker #d startView="year"></md-datepicker>
  `,
})
class DatepickerWithStartView {
  date = new Date(2020, JAN, 1);
  @ViewChild('d') datepicker: MdDatepicker<Date>;
}


@Component({
  template: `<input [(ngModel)]="selected" [mdDatepicker]="d"><md-datepicker #d></md-datepicker>`,
})
class DatepickerWithNgModel {
  selected: Date | null = null;
  @ViewChild('d') datepicker: MdDatepicker<Date>;
  @ViewChild(MdDatepickerInput) datepickerInput: MdDatepickerInput<Date>;
}


@Component({
  template: `
    <input [formControl]="formControl" [mdDatepicker]="d">
    <md-datepicker #d></md-datepicker>
  `,
})
class DatepickerWithFormControl {
  formControl = new FormControl();
  @ViewChild('d') datepicker: MdDatepicker<Date>;
  @ViewChild(MdDatepickerInput) datepickerInput: MdDatepickerInput<Date>;
}


@Component({
  template: `
    <input [mdDatepicker]="d">
    <button [mdDatepickerToggle]="d"></button>
    <md-datepicker #d [touchUi]="touchUI"></md-datepicker>
  `,
})
class DatepickerWithToggle {
  @ViewChild('d') datepicker: MdDatepicker<Date>;
  touchUI = true;
}


@Component({
  template: `
      <md-input-container>
        <input mdInput [mdDatepicker]="d">
        <md-datepicker #d></md-datepicker>
      </md-input-container>
  `,
})
class InputContainerDatepicker {
  @ViewChild('d') datepicker: MdDatepicker<Date>;
  @ViewChild(MdDatepickerInput) datepickerInput: MdDatepickerInput<Date>;
}


@Component({
  template: `
    <input [mdDatepicker]="d" [(ngModel)]="date" [min]="minDate" [max]="maxDate">
    <button [mdDatepickerToggle]="d"></button>
    <md-datepicker #d></md-datepicker>
  `,
})
class DatepickerWithMinAndMaxValidation {
  @ViewChild('d') datepicker: MdDatepicker<Date>;
  date: Date;
  minDate = new Date(2010, JAN, 1);
  maxDate = new Date(2020, JAN, 1);
}


@Component({
  template: `
    <input [mdDatepicker]="d" [(ngModel)]="date" [mdDatepickerFilter]="filter">
    <button [mdDatepickerToggle]="d"></button>
    <md-datepicker #d [touchUi]="true"></md-datepicker>
  `,
})
class DatepickerWithFilterAndValidation {
  @ViewChild('d') datepicker: MdDatepicker<Date>;
  date: Date;
  filter = (date: Date) => date.getDate() != 1;
}


@Component({
  template: `
    <input [mdDatepicker]="d" (change)="onChange()" (input)="onInput()"
           (dateChange)="onDateChange()" (dateInput)="onDateInput()">
    <md-datepicker #d [touchUi]="true"></md-datepicker>
  `
})
class DatepickerWithChangeAndInputEvents {
  @ViewChild('d') datepicker: MdDatepicker<Date>;

  onChange() {}

  onInput() {}

  onDateChange() {}

  onDateInput() {}
}
