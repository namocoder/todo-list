import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Todo } from '../_models/todo-model';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TodoService } from '../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-todo-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  providers: [TodoService],
})
export class TodoListComponent implements OnInit{
  totalRecords = 0;
  displayedColumns: string[] = [
    'title',
    'description',
    'startDate',
    'endDate',
    'action',
  ];
  dataSource: Todo[] = [];

  constructor(private todoService: TodoService,private toastr: ToastrService,private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.spinner.show();
    this.todoService.getTodos().subscribe(
      (result) => {
        this.spinner.hide();
        if (result) {
          this.dataSource = result;
          this.totalRecords = result.length;
        } else {
          this.dataSource = [];
          this.totalRecords = 0;
        }
      },
      (error) => {
        this.spinner.hide();
        this.dataSource = [];
        this.totalRecords = 0;
        this.toastr.error('Failed to save todo.', 'Failed');
      }
    );
  }

  onMarkAsComplete(todo: Todo) {
    this.spinner.show();
    this.todoService.updateTodo(todo.id).subscribe(
      (result) => {
        this.spinner.hide();
        this.toastr.success('Todo successfully updated.', 'Success');
        this.getTodoList();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Failed to update todo.', 'Failed');
      }
    );
  }
}
