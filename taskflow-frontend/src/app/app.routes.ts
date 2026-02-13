import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list';
import { TaskFormComponent } from './task-form/task-form';
import { TaskDetailComponent } from './task-detail/task-detail';
import {NotificationPanelComponent} from './notification-panel/notification-panel';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'tasks/:id/edit', component: TaskFormComponent },
  { path: 'notifications', component: NotificationPanelComponent },
  { path: '*', redirectTo: '' }
];
