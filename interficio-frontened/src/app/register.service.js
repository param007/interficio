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
var config_1 = require("./config");
require("rxjs/add/operator/toPromise");
var RegisterService = (function () {
    function RegisterService(http) {
        this.http = http;
        this.authenticateUrl = config_1.config.url + 'api/v1/register/login';
        this.getUserDetailUrl = config_1.config.url + 'api/v1/register/getUserDetail';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    RegisterService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    RegisterService.prototype.dbCheck = function (object) {
        object.date = Date.now();
        console.log('dncheck', object);
        return this.http
            .post(this.authenticateUrl, JSON.stringify(object), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            localStorage.setItem("token", res.json().token);
            return res.json();
        })
            .catch(this.handleError);
    };
    RegisterService.prototype.getUserDetail = function () {
        var token = localStorage.getItem('token');
        return this.http
            .get(this.getUserDetailUrl + '?token=' + token, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            console.log(res.json());
            return res.json();
        })
            .catch(this.handleError);
    };
    return RegisterService;
}());
RegisterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RegisterService);
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map