"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var TodoEntity_1 = require("../../Entities/TodoEntity");
var Todo_service_1 = require("../../services/Todo.service");
require("rxjs/Rx");
var TodoComponent = (function () {
    function TodoComponent(serv) {
        this.serv = serv;
        this.Todos = new Array();
    }
    TodoComponent.prototype.ngOnInit = function () {
        this.loadTodos();
    };
    TodoComponent.prototype.loadTodos = function () {
        var _this = this;
        this.serv.getTodos().subscribe(function (resp) {
            console.log(resp.status);
            _this.Todos = resp.json();
        });
    };
    TodoComponent.prototype.addTodo = function () {
        debugger;
        this.editedTodo = new TodoEntity_1.TodoItem(0, "Hello", false);
        this.Todos.push(this.editedTodo);
        this.isNewRecord = true;
    };
    TodoComponent.prototype.editTodo = function (todo) {
        this.editedTodo = new TodoEntity_1.TodoItem(todo.id, todo.info, todo.isComplete);
    };
    TodoComponent.prototype.loadTemplate = function (todo) {
        debugger;
        if (this.editedTodo && this.editedTodo.id == todo.id) {
            return this.editTemplate;
        }
        else {
            return this.readOnlyTemplate;
        }
    };
    TodoComponent.prototype.saveTodo = function () {
        var _this = this;
        if (this.isNewRecord) {
            this.serv.createTodo(this.editedTodo).subscribe(function (resp) {
                _this.statusMessage = 'Данные успешно добавлены',
                    _this.loadTodos();
            });
            this.isNewRecord = false;
            this.editedTodo = null;
        }
        else {
            var index = this.Todos.findIndex(function (i) { return i.id === _this.editedTodo.id; });
            this.Todos[index] = this.editedTodo;
            this.serv.updateTodo(this.editedTodo.id, this.editedTodo).subscribe(function (resp) {
                _this.statusMessage = 'Данные успешно обновлены',
                    _this.loadTodos();
            });
            this.editedTodo = null;
        }
    };
    TodoComponent.prototype.cancel = function () {
        if (this.isNewRecord) {
            this.Todos.pop();
            this.isNewRecord = false;
        }
        this.editedTodo = null;
    };
    TodoComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        debugger;
        var index = this.Todos.findIndex(function (i) { return i.id === todo.id; });
        if (index !== -1) {
            this.Todos.splice(index, 1);
        }
        this.serv.deleteTodo(todo.id).subscribe(function (resp) {
            _this.statusMessage = 'Данные успешно удалены',
                _this.loadTodos();
        });
    };
    return TodoComponent;
}());
__decorate([
    core_1.ViewChild('readOnlyTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], TodoComponent.prototype, "readOnlyTemplate", void 0);
__decorate([
    core_1.ViewChild('editTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], TodoComponent.prototype, "editTemplate", void 0);
TodoComponent = __decorate([
    core_2.Component({
        selector: 'my-app',
        moduleId: module.id,
        templateUrl: './Todo.component.html'
    }),
    __metadata("design:paramtypes", [Todo_service_1.TodoService])
], TodoComponent);
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=Todo.component.js.map