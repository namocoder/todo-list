import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo-model';
import moment from 'moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter} from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, MatButtonModule, MatDatepickerModule, RouterLink, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  providers: [TodoService,provideNativeDateAdapter()]
})
export class TodoFormComponent implements OnInit{
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private todoService: TodoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null],
      startDate: [null],
      endDate: [null],
    });
  }

  onSubmit() {
    const startDate = this.formGroup.get('startDate')?.value;
    const endDate = this.formGroup.get('endDate')?.value;

    if (moment(endDate).isBefore(moment(startDate))) {
      this.toastr.warning('End Date must be greater than Start Date.', 'Warning');
      return;
    } 

    let todo = {
      description: this.formGroup.get('description')?.value,
      endDate: this.formGroup.get('endDate')?.value ? moment(this.formGroup.get('endDate')?.value).format('YYYY-MM-DD'): null,
      startDate: this.formGroup.get('startDate')?.value ? moment(this.formGroup.get('startDate')?.value).format('YYYY-MM-DD'): null,
      title: this.formGroup.get('title')?.value
    } as Todo;

    this.spinner.show();
    this.todoService.addTodo(todo).subscribe(
      (result) => {
        this.spinner.hide();
        this.toastr.success('Todo saved successfully.', 'Success');
        this.router.navigate(['/']);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Failed to save todo.', 'Failed');
      }
    );
  }
}
