import { Component, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarV1Component } from "./components/calendar/calendar.component";
import { ReminderComponent } from './components/reminder/reminder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CalendarV1Component, ReminderComponent]
})
export class AppComponent implements AfterViewInit {
  title = 'calendar';
  selectedDate!: Date;
  heightSet = false;
  calendarHeight: number = 0;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  onCardHeight(height: number) {
    this.calendarHeight = height;
    this.setReminderHeight();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  setReminderHeight() {
    const reminderElement = this.elementRef.nativeElement.querySelector('app-reminder');
    this.renderer.setStyle(reminderElement, 'height', `${this.calendarHeight}px`);
  }
}
