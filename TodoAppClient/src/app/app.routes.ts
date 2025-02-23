import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    data: { title: 'Todo List'}
  },
  {
    path: 'new-todo',
    component: TodoFormComponent,
    data: { title: 'Todo List'}
  }
];
