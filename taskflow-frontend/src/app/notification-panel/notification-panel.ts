import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification } from '../notification';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './notification-panel.html',
  styleUrls: ['./notification-panel.css']
})
export class NotificationPanelComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAll().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getEventIcon(eventType: string): string {
    switch (eventType) {
      case 'TASK_CREATED':   return 'add_circle';
      case 'TASK_COMPLETED': return 'check_circle';
      default: return 'notifications';
    }
  }

  getEventColor(eventType: string): string {
    switch (eventType) {
      case 'TASK_CREATED':   return '#4f46e5';
      case 'TASK_COMPLETED': return '#059669';
      default: return '#64748b';
    }
  }

  getEventBg(eventType: string): string {
    switch (eventType) {
      case 'TASK_CREATED':   return '#eef2ff';
      case 'TASK_COMPLETED': return '#ecfdf5';
      default: return '#f1f5f9';
    }
  }

  getEventLabel(eventType: string): string {
    switch (eventType) {
      case 'TASK_CREATED':   return 'Creada';
      case 'TASK_COMPLETED': return 'Completada';
      default: return eventType;
    }
  }
}
