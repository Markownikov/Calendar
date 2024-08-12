import { Injectable } from '@angular/core';
import { Reminder } from '../models/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminders: Reminder[] = [];
  private numberOfReminders = 4;

  constructor() {
    this.generateSampleReminders();
  }

  generateSampleReminders() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    for (let i = 1; i <= this.numberOfReminders; i++) {
      const reminder = new Reminder(
        i,
        `Reminder ${i}`,
        `Description of Reminder ${i}`,
        new Date(currentYear, currentMonth, currentDay)
      );
      this.addReminder(reminder);
    }
  }

  addReminder(reminder: Reminder) {
    this.reminders.push(reminder);
  }

  getRemindersByDate(date: Date): Reminder[] {
    return this.reminders.filter(r => r.date.toDateString() === date.toDateString());
  }

  deleteReminderById(id: number) {
    this.reminders = this.reminders.filter(r => r.id !== id);
  }

  clearReminders() {
    this.reminders = [];
  }
}
