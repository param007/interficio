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
var QuestionService = (function () {
    function QuestionService(http) {
        this.http = http;
        this.getSetUrl = config_1.config.url + 'api/v1/question/fetchSet';
        this.getQuestionUrl = config_1.config.url + 'api/v1/question/fetchQuestion';
        this.answerSubmitUrl = config_1.config.url + 'api/v1/question/answerSubmit';
        this.storySubmitUrl = config_1.config.url + 'api/v1/question/storySubmit';
        this.getScoreUrl = config_1.config.url + 'api/v1/question/fetchScore';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //   private token = localStorage.getItem("token");
    QuestionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    QuestionService.prototype.fetchSet = function (user_id) {
        return this.http
            .get(this.getSetUrl + '?user_id=' + user_id, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuestionService.prototype.fetchQuestion = function (set_id) {
        return this.http
            .get(this.getQuestionUrl + '?set_id_=' + set_id, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuestionService.prototype.onAnswerSubmit = function (form_data) {
        //  console.log(form_data);
        return this.http
            .post(this.answerSubmitUrl, JSON.stringify(form_data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuestionService.prototype.onStorySubmit = function (form_data) {
        console.log(form_data);
        return this.http
            .post(this.storySubmitUrl, JSON.stringify(form_data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuestionService.prototype.fetchScore = function () {
        return this.http
            .get(this.getScoreUrl, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    return QuestionService;
}());
QuestionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map