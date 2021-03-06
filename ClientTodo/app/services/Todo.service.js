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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var TodoService = (function () {
    //private url = 'app/services/content.json';
    function TodoService(http) {
        this.http = http;
        this.url = "http://localhost:5000/Todo";
    }
    TodoService.prototype.getTodos = function () {
        return this.http.get(this.url);
    };
    TodoService.prototype.createTodo = function (obj) {
        var body = JSON.stringify(obj);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.url, body, { headers: headers });
    };
    TodoService.prototype.updateTodo = function (id, obj) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        var body = JSON.stringify(obj);
        return this.http.put(this.url + '/' + id, body, { headers: headers });
    };
    TodoService.prototype.deleteTodo = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    return TodoService;
}());
TodoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=Todo.service.js.map