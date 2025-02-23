import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './../_models/todo-model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'https://localhost:7053/api/todos';
  private headers = new HttpHeaders({
    'APIToken': 'd14ecd26-a300-4c1a-af0f-b484c1ee7ab9'
  });

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl, { headers: this.headers });
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo, { headers: this.headers });
  }

  updateTodo(todoId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${todoId}`, null, { headers: this.headers });
  }
}
