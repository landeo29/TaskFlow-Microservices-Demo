import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'status', 'createdAt', 'actions'];
  searchText = '';
  selectedFilter = 'ALL';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  onSearch(): void {
    if (this.searchText.trim()) {
      this.taskService.searchTasks(this.searchText).subscribe({
        next: (tasks) => { this.tasks = tasks; this.cdr.markForCheck(); },
        error: (err) => console.error('Error:', err)
      });
    } else {
      this.loadTasks();
    }
  }

  filterByStatus(status: string): void {
    this.selectedFilter = status;
    if (status === 'ALL') {
      this.loadTasks();
    } else {
      this.taskService.getTasksByStatus(status).subscribe({
        next: (tasks) => { this.tasks = tasks; this.cdr.markForCheck(); },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  createTask(): void  { this.router.navigate(['/tasks/new']); }
  viewTask(id: number): void { this.router.navigate(['/tasks', id]); }

  startTask(id: number): void {
    this.taskService.startTask(id).subscribe({ next: () => this.loadTasks() });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe({ next: () => this.loadTasks() });
  }

  deleteTask(id: number): void {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({ next: () => this.loadTasks() });
    }
  }


  getPendingCount(): number    { return this.tasks.filter(t => t.status === 'PENDING').length; }
  getInProgressCount(): number { return this.tasks.filter(t => t.status === 'IN_PROGRESS').length; }
  getCompletedCount(): number  { return this.tasks.filter(t => t.status === 'COMPLETED').length; }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING':     return 'pending';
      case 'IN_PROGRESS': return 'in-progress';
      case 'COMPLETED':   return 'completed';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING':     return 'Pendiente';
      case 'IN_PROGRESS': return 'En Proceso';
      case 'COMPLETED':   return 'Completada';
      default: return status;
    }
  }
}
