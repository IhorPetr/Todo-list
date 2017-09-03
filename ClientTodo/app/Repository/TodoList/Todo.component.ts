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
     
  
    private loadTodos() {
        this.serv.getTodos().subscribe((resp: Response) => {
            console.log(resp.status);
            this.Todos = resp.json();  
        });
    }
    
    public addTodo() {
        debugger;
        this.editedTodo = new TodoItem(0,"Hello",false);
        this.Todos.push(this.editedTodo);
        this.isNewRecord = true;
    }
  
   
    public editTodo(todo: TodoItem) {
        this.editedTodo = new TodoItem(todo.id, todo.info, todo.isComplete);
    }
    
    public loadTemplate(todo: TodoItem) {
        debugger;
        if (this.editedTodo && this.editedTodo.id == todo.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
   
    public saveTodo() {
        if (this.isNewRecord) {
            
            this.serv.createTodo(this.editedTodo).subscribe((resp: Response) => {
                this.statusMessage = 'Данные успешно добавлены',
                    this.loadTodos();
            });
            this.isNewRecord = false;
            this.editedTodo = null;
        } else {
            
            this.serv.updateTodo(this.editedTodo.id, this.editedTodo).subscribe((resp: Response) => {
                this.statusMessage = 'Данные успешно обновлены',
                    this.loadTodos();
            });
            this.editedTodo = null;
        }
    }

    public cancel() {

        if (this.isNewRecord) {
            this.Todos.pop();
            this.isNewRecord = false;
        }
        this.editedTodo = null;
    }
    public deleteTodo(todo: TodoItem) {
        debugger;

        this.serv.deleteTodo(todo.id).subscribe((resp: Response) => {
            this.statusMessage = 'Данные успешно удалены',
                this.loadTodos();
        });
    }
}