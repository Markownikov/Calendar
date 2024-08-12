import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarV1Component } from './calendar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CalendarV1Component', () => {
  let component: CalendarV1Component;
  let fixture: ComponentFixture<CalendarV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        CalendarV1Component
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentDate and selectedDate on init', () => {
    component.ngOnInit();
    expect(component.currentDate).toEqual(jasmine.any(Date));
    expect(component.selectedDate).toEqual(jasmine.any(Date));
  });

  it('should generate the correct number of blank days and days in month', () => {
    component.currentDate = new Date(2024, 4);
    component.generateCalendar();
    expect(component.blankDays.length).toBe(3);
    expect(component.daysInMonth.length).toBe(31);
  });

  it('should generate the correct range of years', () => {
    component.currentDate = new Date(2024, 4);
    component.generateYears();
    expect(component.years.length).toBe(20);
    expect(component.years[0]).toBe(2014);
    expect(component.years[19]).toBe(2033);
  });

  it('should change month correctly when nextMonth is called', () => {
    component.currentDate = new Date(2024, 4);
    component.nextMonth();
    expect(component.currentDate.getMonth()).toBe(5);
  });

  it('should change month correctly when prevMonth is called', () => {
    component.currentDate = new Date(2024, 4);
    component.prevMonth();
    expect(component.currentDate.getMonth()).toBe(3);
  });

  it('should emit selected date when a day is selected', () => {
    spyOn(component.selected, 'emit');
    component.currentDate = new Date(2024, 4);
    component.generateCalendar();
    component.selectDay(15);
    expect(component.selected.emit).toHaveBeenCalledWith(new Date(2024, 4, 15));
  });

  it('should toggle years view correctly', () => {
    component.showYears = false;
    component.toggleYearsView();
    expect(component.showYears).toBe(true);
    component.toggleYearsView();
    expect(component.showYears).toBe(false);
  });

  it('should select the correct year', () => {
    component.currentDate = new Date(2024, 4);
    component.selectYear(2030);
    expect(component.currentDate.getFullYear()).toBe(2030);
    expect(component.showYears).toBe(false);
  });

  it('should apply correct classes to selected day', () => {
    component.currentDate = new Date(2024, 4);
    component.generateCalendar();
    component.selectDay(15);
    fixture.detectChanges();
    const selectedDay: DebugElement = fixture.debugElement.query(By.css('.selected'));
    expect(selectedDay.nativeElement.textContent.trim()).toBe('15');
  });

  it('should display correct month and year in nav-container', () => {
    component.currentDate = new Date(2024, 4);
    fixture.detectChanges();
    const monthYearElement: HTMLElement = fixture.debugElement.query(By.css('.month-year')).nativeElement;
    expect(monthYearElement.textContent).toContain('MAY 2024');
  });

  it('should render correct number of days and blank days', () => {
    component.currentDate = new Date(2024, 4); // May 2024
    component.generateCalendar();
    fixture.detectChanges();
    const blankDays = fixture.debugElement.queryAll(By.css('.blank'));
    const days = fixture.debugElement.queryAll(By.css('.day.select'));
    expect(blankDays.length).toBe(3);
    expect(days.length).toBe(31);
  });

  it('should render correct number of weekdays', () => {
    const weekdays = fixture.debugElement.queryAll(By.css('.weekday'));
    expect(weekdays.length).toBe(7);
    expect(weekdays[0].nativeElement.textContent.trim()).toBe('S');
    expect(weekdays[6].nativeElement.textContent.trim()).toBe('S');
  });

  it('should render years correctly when showYears is true', () => {
    component.showYears = true;
    component.generateYears();
    fixture.detectChanges();
    const years = fixture.debugElement.queryAll(By.css('.year'));
    expect(years.length).toBe(20);
    expect(years[0].nativeElement.textContent.trim()).toBe('2014');
    expect(years[19].nativeElement.textContent.trim()).toBe('2033');
  });

  it('should call prevMonth() when left arrow button is clicked', () => {
    spyOn(component, 'prevMonth');
    const prevButton: DebugElement = fixture.debugElement.query(By.css('.nav-button:first-child'));
    prevButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.prevMonth).toHaveBeenCalled();
  });

  it('should call nextMonth() when right arrow button is clicked', () => {
    spyOn(component, 'nextMonth');
    const nextButton: DebugElement = fixture.debugElement.query(By.css('.nav-button:last-child'));
    nextButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.nextMonth).toHaveBeenCalled();
  });

  it('should call toggleYearsView() when month-year is clicked', () => {
    spyOn(component, 'toggleYearsView');
    const monthYear: DebugElement = fixture.debugElement.query(By.css('.month-year'));
    monthYear.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.toggleYearsView).toHaveBeenCalled();
  });

  it('should call selectDay() when a day is clicked', () => {
    spyOn(component, 'selectDay');
    component.currentDate = new Date(2024, 4);
    component.generateCalendar();
    fixture.detectChanges();
    const day: DebugElement = fixture.debugElement.query(By.css('.day.select'));
    day.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectDay).toHaveBeenCalled();
  });

  it('should call selectYear() when a year is clicked', () => {
    spyOn(component, 'selectYear');
    component.showYears = true;
    component.generateYears();
    fixture.detectChanges();
    const year: DebugElement = fixture.debugElement.query(By.css('.year'));
    year.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectYear).toHaveBeenCalled();
  });
});
