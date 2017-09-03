import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {TodoItem} from '../../Entities/TodoEntity';
import {TodoService} from '../../services/Todo.service';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({ 
    selector: 'my-app', 
    moduleId: module.id,
    templateUrl: './Todo.component.html'
}) 
export class TodoComponent implements OnInit {
    //типы шаблонов
    @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
     
    public editedTodo: TodoItem;
    public Todos: Array<TodoItem>;
    public isNewRecord: boolean;
    public statusMessage: string;
     
    public constructor(private serv: TodoService) {
        this.Todos = new Array<TodoItem>();
    }
     
    public ngOnInit() {
        this.loadTodos();
    }
     
    //загрузка пользователей
    private loadTodos() {
        this.serv.getTodos().subscribe((resp: Response) => {
            this.Todos = resp.json();  
        });
    }
    // добавление пользователя
    public addTodo() {
        debugger;
        this.editTodo = new TodoItem(0,"",false);
        this.Todos.push(this.editedTodo);
        this.isNewRecord = true;
    }
  
    // редактирование пользователя
    public editTodo(todo: TodoItem) {
        this.editTodo = new TodoItem(todo.id, todo.info, todo.isComplete);
    }
    // загружаем один из двух шаблонов
    public loadTemplate(todo: TodoItem) {
        if (this.editedTodo && this.editedTodo.id == todo.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
    // сохраняем пользователя
    public saveTodo() {
        if (this.isNewRecord) {
            // добавляем пользователя
            this.serv.createTodo(this.editedTodo).subscribe((resp: Response) => {
                this.statusMessage = 'Данные успешно добавлены',
                    this.loadTodos();
            });
            this.isNewRecord = false;
            this.editTodo = null;
        } else {
            // изменяем пользователя
            this.serv.updateTodo(this.editedTodo.id, this.editedTodo).subscribe((resp: Response) => {
                this.statusMessage = 'Данные успешно обновлены',
                    this.loadTodos();
            });
            this.editTodo = null;
        }
    }
    // отмена редактирования
    public cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.Todos.pop();
            this.isNewRecord = false;
        }
        this.editTodo = null;
    }
    // удаление пользователя
    public deleteTodo(todo: TodoItem) {
        debugger;
        this.serv.deleteTodo(todo.id).subscribe((resp: Response) => {
            this.statusMessage = 'Данные успешно удалены',
                this.loadTodos();
        });
    }
}