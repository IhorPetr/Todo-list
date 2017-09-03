import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { TodoItem } from '../Entities/TodoEntity';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

    //private url = "http://localhost:5000/Todo";
    private url = 'app/services/content.json';
    public  constructor(private http: Http) { }

    public  getTodos() {
        return this.http.get(this.url);
    }

    public createTodo(obj: TodoItem) {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.url, body, { headers: headers });
    }
    public updateTodo(id: number, obj: TodoItem) {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        const body = JSON.stringify(obj);
        return this.http.put(this.url + '/' + id, body, { headers: headers });
    }
   public  deleteTodo(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}