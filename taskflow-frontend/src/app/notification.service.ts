import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081/api/notifications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
  }

  getByTaskId(taskId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/task/${taskId}`);
  }
}
