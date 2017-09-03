import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TodoComponent } from './Repository/TodoList/Todo.component';
import {TodoService} from './services/Todo.service';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [TodoComponent],
    bootstrap: [TodoComponent],
    providers: [TodoService]
})
export class AppModule { }