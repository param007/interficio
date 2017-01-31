import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {RegisterService} from "../register.service";

declare const FB:any;
declare const gapi:any;

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.css']

})

export class LoginComponent implements OnInit {

constructor(
      private router : Router,
      private registerService: RegisterService
    ) {}

 ngOnInit() {
   this.fbAsyncInit();
   this.startApp();
  }

 fbAsyncInit = function() {
  FB.init({
    appId: '1615269955467043',
    cookie: false,

    /* Enable cookies to allow the server to access
      the session*/
    status: true,
    xfbml: true,

    // Parse social plugins on this page
    version: 'v2.5'

    // Use graph api version 2.5
  });
}

    private data: Object;

    private check(response) {
      this.registerService.dbCheck(response)
      .then (res => {
        console.log("res--",res);
        if(res.success) {
          this.router.navigate(['/home']);
        }
       })
      .catch(error => console.log("error--",error))
    };

    statusChangeCallback(resp) {
      if (resp.status === 'connected') {
        console.log("loggedinnn---");
        this.getInfo();
       } else {
         this.auth_login();
        }
    };

    getInfo =  function() {
      FB.api('/me?fields= name,email', response => {
      console.log("Login Response----",response);
      this.data = response;
      this.check(response);
     });
    };


    onFacebookLoginClick() {
     FB.getLoginStatus(response => {
       this.fbAsyncInit();
       this.statusChangeCallback(response);
      });
    }

    auth_login = function() {
      FB.login( response=> {
            if (response.status === 'connected') {
              console.log('connected');
              this.getInfo();
            } else if(response.status === 'not authorized') {
              console.log("!!!!! not authorized !!!!!");
            } else {
              console.log("!!!!! not sign in !!!!!");
            }
        });
    }

    private googleUser = {};

    startApp = function() {
    gapi.load('auth2', () => {
      let auth2 =  gapi.auth2.init({
        client_id: '1092839894545-putdmro0m1g294b8786b3s8079e8ojkk.apps.googleusercontent.com'
      });
      let element = document.getElementById('google-signin');
      auth2.attachClickHandler(element, {}, googleUser =>
       {
        let signIn_data = {
          id: googleUser.getBasicProfile().getId(),
          name: googleUser.getBasicProfile().getName(),
          email: googleUser.getBasicProfile().getEmail()
        };
         this.check(signIn_data);
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
   });
  }; 

}
