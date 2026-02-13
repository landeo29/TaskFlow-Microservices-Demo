
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  completeTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}/complete`, {});
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchTasks(keyword: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/status/${status}`);
  }
  startTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}/start`, {});
  }
}
