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
var register_service_1 = require("../register.service");
var HomeComponent = (function () {
    function HomeComponent(router, registerService) {
        this.router = router;
        this.registerService = registerService;
        this.header = 'Instruction';
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registerService.getUserDetail()
            .then(function (res) {
            console.log("res--", res);
            if (res.not_verified) {
                _this.router.navigate(['login']);
            }
            else {
                _this.user_id = res.data.user_id;
                console.log(typeof (_this.user_id));
                _this.name = res.data.user_name;
                // localStorage.setItem('user_id',this.user_id);
                console.log(_this.user_id, _this.name);
            }
        })
            .catch(function (error) { return console.log("error--", error); });
    };
    HomeComponent.prototype.logout = function () {
        console.log('asdf');
        localStorage.setItem('token', '');
        this.router.navigate(['/login']);
    };
    HomeComponent.prototype.text = function (num) {
        if (num == 1) {
            this.header = 'Instruction';
        }
        else if (num == 2) {
            this.header = 'Question';
            this.router.navigate(['home/question', this.user_id]);
        }
        else
            this.header = 'Leaderboard';
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home',
        templateUrl: './home.component.html',
        styleUrls: ['home.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        register_service_1.RegisterService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map