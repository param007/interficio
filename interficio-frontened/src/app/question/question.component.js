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
var router_1 = require("@angular/router");
var question_service_1 = require("../question.service");
var router_2 = require("@angular/router");
var QuestionComponent = (function () {
    function QuestionComponent(router, questionService, route) {
        this.router = router;
        this.questionService = questionService;
        this.route = route;
        this.setObj = { id: 1 };
        this.questionObj = [];
        this.verify = true;
        this.storyVerify = true;
    }
    QuestionComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    QuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.token = localStorage.getItem('token');
        if (!this.token) {
            this.router.navigate(['login']);
        }
        this.route.params.subscribe(function (params) {
            _this.user_id = params['id']; // (+) converts string 'id' to a number
            console.log('user-idddd', _this.user_id);
        });
        // we will send user_id to find the current set no nd then fetch set and respective ques.
        this.questionService.fetchSet(this.user_id)
            .then(function (data) {
            _this.setObj = data;
            console.log(_this.setObj);
            _this.questionService.fetchQuestion(_this.setObj.id)
                .then(function (data) {
                _this.questionObj = data;
                console.log(_this.questionObj);
            });
        })
            .catch(this.handleError);
        // this._flashMessagesService.show('We are in about component!', { timeout: 1000 });
    };
    QuestionComponent.prototype.onAnswerSubmit = function (form_data, id) {
        var _this = this;
        this.question_id = id;
        form_data.id = id;
        console.log(this);
        this.questionService.onAnswerSubmit(form_data)
            .then(function (data) {
            if (data.verified) {
                _this.verify = true;
                window.open(data.url);
            }
            else {
                _this.verify = false;
                //wait 3 Seconds and hide
                setTimeout(function () {
                    this.verify = true;
                    console.log(this.verify);
                }.bind(_this), 2000);
            }
        })
            .catch(this.handleError);
    };
    QuestionComponent.prototype.onStorySubmit = function (form_data, id) {
        var _this = this;
        form_data.id = id;
        form_data.user_id = this.user_id;
        form_data.date = Date.now();
        console.log('story submit', form_data);
        this.questionService.onStorySubmit(form_data)
            .then(function (data) {
            if (data.verified) {
                window.location.reload();
                _this.router.navigate(['/home/question']);
            }
            else {
                setTimeout(function () {
                    this.storyVerify = true;
                }.bind(_this), 3000);
                _this.storyVerify = false;
            }
        })
            .catch(this.handleError);
    };
    return QuestionComponent;
}());
QuestionComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'question',
        templateUrl: './question.component.html',
        styleUrls: ['question.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        question_service_1.QuestionService,
        router_2.ActivatedRoute])
], QuestionComponent);
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map