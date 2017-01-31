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
var LoginComponent = (function () {
    function LoginComponent(router, registerService) {
        this.router = router;
        this.registerService = registerService;
        this.fbAsyncInit = function () {
            FB.init({
                appId: '1615269955467043',
                cookie: false,
                /* Enable cookies to allow the server to access
                  the session*/
                status: true,
                xfbml: true,
                // Parse social plugins on this page
                version: 'v2.5'
            });
        };
        this.getInfo = function () {
            var _this = this;
            FB.api('/me?fields= name,email', function (response) {
                console.log("Login Response----", response);
                _this.data = response;
                _this.check(response);
            });
        };
        this.auth_login = function () {
            var _this = this;
            FB.login(function (response) {
                if (response.status === 'connected') {
                    console.log('connected');
                    _this.getInfo();
                }
                else if (response.status === 'not authorized') {
                    console.log("!!!!! not authorized !!!!!");
                }
                else {
                    console.log("!!!!! not sign in !!!!!");
                }
            });
        };
        this.googleUser = {};
        this.startApp = function () {
            var _this = this;
            gapi.load('auth2', function () {
                var auth2 = gapi.auth2.init({
                    client_id: '1092839894545-putdmro0m1g294b8786b3s8079e8ojkk.apps.googleusercontent.com'
                });
                var element = document.getElementById('google-signin');
                auth2.attachClickHandler(element, {}, function (googleUser) {
                    var signIn_data = {
                        id: googleUser.getBasicProfile().getId(),
                        name: googleUser.getBasicProfile().getName(),
                        email: googleUser.getBasicProfile().getEmail()
                    };
                    _this.check(signIn_data);
                }, function (error) {
                    alert(JSON.stringify(error, undefined, 2));
                });
            });
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.fbAsyncInit();
        this.startApp();
    };
    LoginComponent.prototype.check = function (response) {
        var _this = this;
        this.registerService.dbCheck(response)
            .then(function (res) {
            console.log("res--", res);
            if (res.success) {
                _this.router.navigate(['/home']);
            }
        })
            .catch(function (error) { return console.log("error--", error); });
    };
    ;
    LoginComponent.prototype.statusChangeCallback = function (resp) {
        if (resp.status === 'connected') {
            console.log("loggedinnn---");
            this.getInfo();
        }
        else {
            this.auth_login();
        }
    };
    ;
    LoginComponent.prototype.onFacebookLoginClick = function () {
        var _this = this;
        FB.getLoginStatus(function (response) {
            _this.fbAsyncInit();
            _this.statusChangeCallback(response);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: './login.component.html',
        styleUrls: ['login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        register_service_1.RegisterService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map