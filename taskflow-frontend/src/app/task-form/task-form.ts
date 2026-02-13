import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', status: 'PENDING' };

  isEditing = false;
  taskId: number | null = null;

  formTitle = 'Nueva Tarea';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.taskId = +id;
        this.formTitle = 'Editar Tarea';
        this.loadTask(this.taskId);
      }
    });
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => this.task = task,
      error: (err) => {
        console.error('Error loading task:', err);
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing && this.taskId) {
      this.taskService.updateTask(this.taskId, this.task).subscribe({
        next: () => {
          alert('Tarea actualizada correctamente');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error updating:', err)
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => {
          alert('Tarea creada correctamente');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error creating:', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
