import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CalendarV1Component } from './components/calendar/calendar.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CalendarV1Component],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'calendar' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('calendar');
  });

  it('should call onDateSelected and set selectedDate when a date is selected in the calendar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onDateSelected').and.callThrough();
    const testDate = new Date(2024, 4, 15);

    const calendarComponent = fixture.debugElement.query(By.directive(CalendarV1Component)).componentInstance as CalendarV1Component;
    calendarComponent.selected.emit(testDate);
    fixture.detectChanges();

    expect(component.onDateSelected).toHaveBeenCalledWith(testDate);
    expect(component.selectedDate).toBe(testDate);
  });

  it('should style the container correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const containerElement: HTMLElement = fixture.debugElement.query(By.css('.container')).nativeElement;
    const styles = getComputedStyle(containerElement);

    // for larger screens
    expect(styles.display).toBe('flex');
    expect(styles.flexDirection).toBe('row');
    expect(styles.justifyContent).toBe('center');
    expect(styles.alignItems).toBe('flex-start');
    expect(parseInt(styles.marginTop)).toBe(100);
  });

  it('should style the container correctly for mobile devices', () => {
    // less then 576px
    spyOnProperty(window, 'innerWidth').and.returnValue(500);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const containerElement: HTMLElement = fixture.debugElement.query(By.css('.container')).nativeElement;
    const styles = getComputedStyle(containerElement);

    expect(styles.display).toBe('flex');
  });
});
