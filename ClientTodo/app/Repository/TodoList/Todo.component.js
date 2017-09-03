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
    //загрузка пользователей
    TodoComponent.prototype.loadTodos = function () {
        var _this = this;
        this.serv.getTodos().subscribe(function (resp) {
            _this.Todos = resp.json();
        });
    };
    // добавление пользователя
    TodoComponent.prototype.addTodo = function () {
        debugger;
        this.editTodo = new TodoEntity_1.TodoItem(0, "", false);
        this.Todos.push(this.editedTodo);
        this.isNewRecord = true;
    };
    // редактирование пользователя
    TodoComponent.prototype.editTodo = function (todo) {
        this.editTodo = new TodoEntity_1.TodoItem(todo.id, todo.info, todo.isComplete);
    };
    // загружаем один из двух шаблонов
    TodoComponent.prototype.loadTemplate = function (todo) {
        if (this.editedTodo && this.editedTodo.id == todo.id) {
            return this.editTemplate;
        }
        else {
            return this.readOnlyTemplate;
        }
    };
    // сохраняем пользователя
    TodoComponent.prototype.saveTodo = function () {
        var _this = this;
        if (this.isNewRecord) {
            // добавляем пользователя
            this.serv.createTodo(this.editedTodo).subscribe(function (resp) {
                _this.statusMessage = 'Данные успешно добавлены',
                    _this.loadTodos();
            });
            this.isNewRecord = false;
            this.editTodo = null;
        }
        else {
            // изменяем пользователя
            this.serv.updateTodo(this.editedTodo.id, this.editedTodo).subscribe(function (resp) {
                _this.statusMessage = 'Данные успешно обновлены',
                    _this.loadTodos();
            });
            this.editTodo = null;
        }
    };
    // отмена редактирования
    TodoComponent.prototype.cancel = function () {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.Todos.pop();
            this.isNewRecord = false;
        }
        this.editTodo = null;
    };
    // удаление пользователя
    TodoComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        debugger;
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