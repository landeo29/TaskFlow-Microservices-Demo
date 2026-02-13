import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  loading = true;

  constructor(
    private taskService: TaskService,
    public router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.loadTask(id);
    });
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => this.router.navigate(['/'])
    });
  }

  editTask(): void     { this.router.navigate(['/tasks', this.task?.id, 'edit']); }

  startTask(): void {
    if (this.task?.id) {
      this.taskService.startTask(this.task.id).subscribe({
        next: () => this.loadTask(this.task!.id!)
      });
    }
  }

  completeTask(): void {
    if (this.task?.id) {
      this.taskService.completeTask(this.task.id).subscribe({
        next: () => this.loadTask(this.task!.id!)
      });
    }
  }

  deleteTask(): void {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.deleteTask(this.task!.id!).subscribe({
        next: () => this.router.navigate(['/'])
      });
    }
  }

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
