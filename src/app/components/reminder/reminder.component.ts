import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Reminder } from '../../models/reminder.model';
import { ReminderService } from '../../services/reminder.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  @Input() selectedDate!: Date;
  reminders: Reminder[] = [];

  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
    this.getReminders();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.getReminders();
    }
  }

  getReminders() {
    if (this.selectedDate) {
      this.reminders = this.reminderService.getRemindersByDate(this.selectedDate);
    }
  }

  // Open modal dialog to create reminder
  creatReminder() {
  }
}
